import axios from "axios"
import { Container } from "reactstrap"
import { Navigate, useParams } from "react-router-dom"
import { io } from "socket.io-client"

const ChatRoom = () => {
    const joinRoom  = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id

            await axios.get(`http://localhost:2000/chat/join/${userId}/room/${roomId}`)

        } catch (err) {
            console.log(err)
        }
    }

    if (!localStorage.getItem("user")) {
        return <Navigate to="/rooms" />
    }


    return(
        <Container>
            <h2>Chat Room</h2>
        </Container>
    )
}