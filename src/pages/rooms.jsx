import { Container, Label, Button, Table } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { io } from "socket.io-client"

const socketConnection = io("http://localhost:2000")

const RoomsPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUSers] = useState([]);

  const [rooms, setRooms] = useState([]);

  const fetchUsers = async () => {
    try {
      const resUsers = await axios.get("http://localhost:2000/users");

      setUsers(resUsers.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const usersReactSelectOptions = () => {
    return users.map((val) => {
      return {
        label: val.username,
        value: val.id,
      };
    });
  };

  const fetchRooms = async () => {
    try {
      const roomsRes = await axios.get("http://localhost:2000/chat/rooms");

      setRooms(roomsRes.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const createRoomHandler = async () => {
    try {
      await axios.post("http://localhost:2000/chat/rooms", {
        userIds: selectedUsers.map((val) => val.value),
      });

      fetchRooms();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRooms();

    socketConnection.on("NEW_ROOM_CREATED", (data) => {
        setRooms(data)
    })

    return () => {
        socketConnection.disconnect()
    }
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-6">
          <h2>Create Chat Room</h2>
          <Label>Users</Label>
          <ReactSelect
            onChange={(values) => setSelectedUSers(values)}
            isMulti
            options={usersReactSelectOptions()}
          />

          <Button className="mt-3" onClick={createRoomHandler}>
            Create Room
          </Button>

          <h2 className="mt-3">Avaiable Rooms</h2>
          <Table>
            <thead>
              <tr>
                <td>Room Name</td>
                <td>Participants</td>
              </tr>
            </thead>
            <tbody>
              {rooms.map((val) => {
                return (
                  <tr>
                    <td>{val.room_name}</td>
                    <td>
                      {val?.Users?.map((user) => user.username).join(", ")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="col-6"></div>
      </div>
    </Container>
  );
};

export default RoomsPage;
