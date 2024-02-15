import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { } from 'react'
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChatRoomId } from '../../store/features/chatroom/chatRoomSlice';
import maleAvatar from "../../assets/img/user.png";

function ChatMember({ member, setLoading }) {



    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

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
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }

    return (
        <li className="p-2 border-bottom" onClick={setMemberInCurrentRoom}>
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