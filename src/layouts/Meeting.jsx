import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { MeetingContext } from "../Context";
import MeetingRoom from "./MeetingRoom";
import Lobby from "./Lobby";

function Meeting() {
  const { updateDeviceList, updatePeers, updatePeersCount } =
    useContext(MeetingContext);
  let params = useParams();
  const roomID = params.roomID;
  const [join, setJoin] = useState(false);
  const [socket, setSocket] = useState(null);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL);
    setSocket(newSocket);

    if (socket) return socket.disconnect();
  }, []);
 
  return (
    <MeetingContext.Provider value={socket}>
      {join ? (
        <MeetingRoom socket={socket} userDetails={userDetails} />
      ) : (
        <Lobby setJoin={setJoin} roomID={roomID} setUserDetails={setUserDetails} />
      )}
    </MeetingContext.Provider>
  );
}

export default Meeting;
