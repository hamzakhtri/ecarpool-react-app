import React, { useCallback, useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
} from "mdb-react-ui-kit";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import ChatMember from "../../components/ChatMember/ChatMember";
import { db } from "../../config/firebase";
import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatRoomId } from "../../store/features/chatroom/chatRoomSlice";
import avatar from "../../assets/img/user.png"

import "./Chatroom.css"



function Chatroom() {

    const [mychatMembers, setMyChatMembers] = useState([]);
    const user = useSelector(state => state.user.currentUser);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const frontUser = useSelector(state => state.chatroom.frontUser)

    // getting current active chatroom id for chating from redux 

    const currentChatRoom = useSelector(state => state.chatroom.currentChatRoomId)

    // getting all my available chatroom 

    const getMyChatMember = useCallback(async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "chatrooms"));
        let chatMembers = [];
        querySnapshot.forEach((doc) => {
            let chatroom = doc.data();
            for (let key in chatroom) {
                if (key !== user.id && Object.keys(chatroom).includes(user.id)) {
                    chatMembers.push(key);
                }
            }
        });

        if (chatMembers.length === 0) {
            dispatch(setCurrentChatRoomId(null));
            // Handle the case when there are no chat members
            return;
        }

        const snapShot = await getDocs(query(collection(db, "users"), where('id', 'in', chatMembers)));
        const documents = [];

        snapShot.forEach((doc) => {
            documents.unshift(doc.data());
        });

        setMyChatMembers(documents);

        setLoading(false);

    }, [user, setMyChatMembers, dispatch]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "chatrooms"), () => {
            getMyChatMember();
        });

        // Cleanup function
        return () => unsubscribe();
    }, [getMyChatMember]);



    const sendMessage = async (e) => {
        e.preventDefault();
        setMessage("");
        await addDoc(collection(db, "chatrooms", currentChatRoom, "messages"), {
            messageTime: Date.now(),
            msg: message,
            senderName: user.username,
            senderId: user.id,
        });

    }

    const getMessages = useCallback(() => {
        if (!currentChatRoom) {
            // If currentChatRoom is null or undefined, return early
            return;
        }
        const messagesRef = collection(db, "chatrooms", currentChatRoom, "messages");
        const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
            const allMessages = [];
            querySnapshot.forEach((doc) => {
                allMessages.push(doc.data());
            });
            allMessages.sort((a, b) => a.messageTime - b.messageTime);
            setMessages(allMessages);
        });

        // Return the unsubscribe function in case you want to stop listening to changes
        return unsubscribe;
    }, [currentChatRoom]);


    useEffect(() => {
        const unsubscribe = getMessages();
        return unsubscribe;
    }, [currentChatRoom, getMessages]);


    if (messages.length === 0 && currentChatRoom === null) {
        return <div className="no-chat-heading"><h1 className="my-5 py-5">No Chats Available</h1></div>
    }


    return (
        <div className="container py-5 my-5">
            <MDBContainer fluid className="py-5" >
                <MDBRow>
                    <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                        <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                            Member
                        </h5>

                        <MDBCard>
                            <MDBCardBody>
                                <MDBTypography listUnStyled className="mb-0">
                                    {loading && mychatMembers.length === 0 && "Loading..."}
                                    {mychatMembers.map((member) => {
                                        return (
                                            <div key={member.id}>
                                                <ChatMember member={member} setLoading={setLoading} />
                                            </div>
                                        )
                                    })}
                                </MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="6" lg="7" xl="8">
                        <div className="chat-header d-flex justify-content-between align-items-center">
                            <img src={avatar} alt="user" width={55} />
                            <h3 className="m-0">{loading ? "Loading..." : frontUser}</h3>
                        </div>
                        <div className="messages-section">

                            <MDBTypography className="messages-sec" listUnStyled ref={(element) => element && (element.scrollTop = element.scrollHeight)}>
                                {messages.length > 0 && messages.map((message) => {
                                    return (
                                        <li key={message.messageTime} className="mb-2">
                                            <ChatMessage message={message} />
                                        </li>
                                    )
                                })}


                                {loading && <h1 className="d-flex justify-content-center align-items-center h-100 text-secondary">Loading</h1>}

                            </MDBTypography>
                            <form onSubmit={sendMessage}>

                                <div className="row reply-sec d-flex justify-content-center">
                                    <div className="col-sm-9 col-xs-9 reply-main">
                                        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className="form-control" rows="1" id="comment" placeholder="Type Your Message..." />
                                    </div>

                                    <div className="col-sm-1 col-xs-1 reply-send">
                                        <button type="submit" className="border-0 bg-transparent"> <i className="fa-solid fa-paper-plane fa-2x" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Chatroom;
