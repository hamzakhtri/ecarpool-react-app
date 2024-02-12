import React, { useCallback, useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
} from "mdb-react-ui-kit";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import ChatMember from "../../components/ChatMember/ChatMember";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";


function Chatroom() {

    const [mychatMembers, setMyChatMembers] = useState([]);
    const user = useSelector(state => state.user.currentUser);

    // getting all my avaiblae chatroom 

    const getMyChatMember = useCallback(async () => {
        const querySnapshot = await getDocs(collection(db, "chatrooms"));
        let chatMembers = [];
        querySnapshot.forEach((doc) => {
            let chatroom = doc.data();
            for (let key in chatroom) {
                if (key !== user.id && chatroom.hasOwnProperty(key)) {
                    chatMembers.push(key);
                }
            }

        });

        const snapShot = await getDocs(query(collection(db, "users"), where('id', 'in', chatMembers)));
        const documents = [];

        snapShot.forEach((doc) => {
            documents.push(doc.data());
        });

        setMyChatMembers(documents);

    }, [user.id])

    useEffect(() => {
        getMyChatMember();
    }, [getMyChatMember])

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
                                <MDBTextArea label="Message" id="textAreaExample" rows={4} />
                            </li>
                            <MDBBtn color="info" rounded className="float-end">
                                Send
                            </MDBBtn>
                        </MDBTypography>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default Chatroom