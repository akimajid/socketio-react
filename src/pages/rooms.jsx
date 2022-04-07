import { Container, Label } from "reactstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import ReactSelect from "react-select"

const RoomsPage = () => {
    const [users, setUsers] = useState([])
    

    const fetchUsers  = async () => {
      try {
        const resUsers = await axios.get("http://localhost:2000/users")
  
        setUsers(resUsers.data.result)
      } catch (err) {
        console.log(err)
      }
    }

    const usersReactSelectOptions = () => {
        return users.map((val) => {
            return {
                label: val.username,
                value: val.id
            }
        })
    }
  
    useEffect(() => {
        fetchUsers()
    }, [])


    return (
        <Container>
            <div className="row">
                <div className="col-6">
                    <h2>Create Chat Room</h2>
                    <Label>Users</Label>
                    <ReactSelect isMulti options={usersReactSelectOptions()} />
                </div>
                <div className="col-6"></div>
            </div>
        </Container>
    )
}

export default RoomsPage