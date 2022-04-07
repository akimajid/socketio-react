import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState } from "react"
import { Button } from "reactstrap"
import { io } from "socket.io-client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import RoomsPage from "./pages/rooms"
import axios from "axios"

const socketConnection = io("http://localhost:2000")

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rooms" element={<RoomsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App