import React from 'react'

function ChatMember({member}) {
    return (
        <li className="p-2 border-bottom">
            <a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
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