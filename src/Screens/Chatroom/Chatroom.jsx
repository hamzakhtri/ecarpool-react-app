import React, { useCallback, useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBTextArea,
} from "mdb-react-ui-kit";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import ChatMember from "../../components/ChatMember/ChatMember";
import { db } from "../../config/firebase";
import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";


function Chatroom() {

    const [mychatMembers, setMyChatMembers] = useState([]);
    const user = useSelector(state => state.user.currentUser);
    const [message, setMessage] = useState("");
    const [sendLoading, setSendLoading] = useState(false);

    // getting current active chatroom id for chating from redux 

    const currentChatRoom = useSelector(state => state.chatroom.currentChatRoomId)

    // getting all my available chatroom 

    const getMyChatMember = useCallback(async () => {
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
            // Handle the case when there are no chat members
            return;
        }

        const snapShot = await getDocs(query(collection(db, "users"), where('id', 'in', chatMembers)));
        const documents = [];

        snapShot.forEach((doc) => {
            documents.push(doc.data());
        });

        setMyChatMembers(documents);

    }, [user, setMyChatMembers]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "chatrooms"), () => {
            getMyChatMember();
        });

        // Cleanup function
        return () => unsubscribe();
    }, [getMyChatMember]);



    const sendMessage = async () => {
        setSendLoading(true);
        await addDoc(collection(db, "chatrooms", currentChatRoom, "messages"), {
            messageTime: Date.now(),
            msg: message,
            senderId : user.id
        });
        setMessage("");
        setSendLoading(false);
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
                                    {mychatMembers.map((member) => {
                                        return (
                                            <div key={member.id}>
                                                <ChatMember member={member} />
                                            </div>
                                        )
                                    })}
                                </MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="6" lg="7" xl="8">
                        <MDBTypography listUnStyled>
                            <ChatMessage />
                            <li className="bg-white mb-3">
                                <MDBTextArea value={message} onChange={(e) => setMessage(e.target.value)} label="Message" id="textAreaExample" rows={4} />
                            </li>
                            <button disabled={message ? false : true} onClick={sendMessage} color="info" className="float-end btn btn-dark">
                                {sendLoading ? "Send...." : "Send"}
                            </button>
                        </MDBTypography>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Chatroom;
