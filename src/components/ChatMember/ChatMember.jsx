import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChatRoomId, setFrontUser } from '../../store/features/chatroom/chatRoomSlice';
import maleAvatar from "../../assets/img/user.png";
import "./ChatMember.css"

function ChatMember({ member, setLoading }) {



    const user = useSelector(state => state.user.currentUser);
    const frontUser = useSelector(state => state.chatroom.frontUser);
    const currentChatroom = useSelector(state => state.chatroom.currentChatRoomId);
    const dispatch = useDispatch();
    console.log(frontUser === member.username);

    const setMemberInCurrentRoom = async () => {

        setLoading(true);
        const q = query(collection(db, "chatrooms"), where(`${member.id}`, "==", true), where(`${user.id}`, "==", true));
        let roomId
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            roomId = doc.id;
        });
        dispatch(setCurrentChatRoomId(roomId));
        dispatch(setFrontUser(member.username));
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }


    // setting currentChatroom Id on load of components 

    const setCurrentChatonmount = useCallback(async () => {
        const q = query(collection(db, "chatrooms"), where(`${member.id}`, "==", true), where(`${user.id}`, "==", true));
        let roomId
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            roomId = doc.id;
        });
        if (!frontUser && !currentChatroom) {
            dispatch(setCurrentChatRoomId(roomId));
            dispatch(setFrontUser(member.username));
        }
    }, [member.id, user.id, member.username, dispatch, frontUser, currentChatroom])
    useEffect(() => {
        if (!frontUser) {
            dispatch(setFrontUser(member.username));
        }
    }, [dispatch, member, frontUser])

    useEffect(() => {
        setCurrentChatonmount();
    }, [setCurrentChatonmount])

    return (
        <li className={`p-2 border-bottom ${member.username === frontUser ? "active-chat-tab" : ""}`} onClick={setMemberInCurrentRoom}>
            <a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row">
                    <img
                        src={maleAvatar}
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                    />
                    <div className="pt-1">
                        <p className="fw-bold mb-0">{member.username}</p>
                        <p className="small text-muted">
                            Lorem ipsum dolor sit.
                        </p>
                    </div>
                </div>
                <div className="pt-1">
                    <p className="small text-muted mb-1">5 mins ago</p>
                </div>
            </a>
        </li>
    )
}

export default ChatMember