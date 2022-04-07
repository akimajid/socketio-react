import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState } from "react"
import { Button } from "reactstrap"
import { io } from "socket.io-client"

const socketConnection = io("http://localhost:2000")

const App = () => {
  const [messages, setMessages] = useState([])

  const triggerEvent = () => {
    socketConnection.emit("my-event", {
      message: "Hello world!"
    })
  }

  useEffect(() => {
    socketConnection.on("INIT_MESSAGES", (data) => {
      setMessages(data)
    })

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  return (
    <div>
      <h1>App</h1>
      {messages.map((val) => {
        return <p>{val.message}</p>
      })}
      <Button onClick={triggerEvent}>Connect to socket</Button>
    </div>
  )
}

export default App