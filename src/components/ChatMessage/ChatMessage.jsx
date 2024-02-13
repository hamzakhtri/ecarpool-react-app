import { MDBCard, MDBCardBody, MDBCardHeader, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'

function ChatMessage({message, key}) {
    return (
        <li key={key} className="d-flex justify-content-between mb-4">
            <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
            />
            <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">{message.senderName}</p>
                    <p className="text-muted small mb-0">
                        <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                </MDBCardHeader>
                <MDBCardBody>
                    <p className="mb-0">
                        {message.msg}
                    </p>
                </MDBCardBody>
            </MDBCard>
        </li>
    )
}

export default ChatMessage