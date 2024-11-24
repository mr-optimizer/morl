"use client";
import { useState, useEffect } from "react";
import { useSocket } from "./context/SocketContext";
// import Peer from "peerjs"; // Import PeerJS
// import styles from "./Chat.module.css";
// import { v4 as uuidv4 } from 'uuid';

interface PlayerJoinedData {
  playerName: string;
  playersInRoom: string[];
}

interface Message {
  playerName: string;
  message: string;
}

// interface SpeakingData {
//   playerName: string;
//   isSpeaking: boolean;
// }

export default function Chat() {
  const socket = useSocket();
  const [roomId, setRoomId] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [view, setView] = useState<"create" | "join" | "roomie" | null>(null);

  // WebRTC States
  // const [peer, setPeer] = useState<Peer | null>(null);
  // const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  // const remoteAudioRefs = useRef<HTMLAudioElement[]>([]); // Refs to handle multiple audio elements for remote peers
  // const [isMuted, setIsMuted] = useState<boolean>(false); // Mute/Unmute state
  // const [speakingPlayers, setSpeakingPlayers] = useState<string[]>([]); // List of players who are speaking

  /*
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  */

  const handleCreateRoom = async () => {
    const generatedRoomId: number = 1;
    try {
      setRoomId(generatedRoomId);
      setView("join");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = () => {
    if (roomId && playerName) {
      socket.emit("joinRoom", { roomId, playerName });
      setView("roomie");
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", { roomId, playerName, message: newMessage });
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket.on(
      "playerJoined",
      ({ playerName, playersInRoom }: PlayerJoinedData) => {
        console.log(`Player joined: ${playerName}`);
        console.log(`All player: ${playersInRoom}`);
        setPlayers(playersInRoom);
      }
    );

    socket.on("newMessage", (message: Message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]); // Add the new message to the list
    });

    return () => {
      socket.off("playerJoined");
      socket.off("newMessage");
    };
  });

  if (!view) {
    return (
      <div>
        <h1>Choose an Option</h1>
        <button onClick={() => setView("create")}>Create a Room</button>
        <button onClick={() => setView("join")}>Join a Room</button>
      </div>
    );
  }

  return (
    <div>
      {view === "create" && (
        <div>
          <h1>Create a Room</h1>
          <button onClick={handleCreateRoom}>Generate Room ID</button>
          {roomId && <p>Your Room ID: {roomId}</p>}
        </div>
      )}

      {view === "join" && (
        <div>
          <h1>Join a Room</h1>
          <input
            type="text"
            placeholder="Room ID"
            value={roomId || ""}
            onChange={(e) => setRoomId(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      )}

      {view === "roomie" && (
        <>
          <h2>Players in Room</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player}{" "}
                {/* {speakingPlayers.includes(player) ? "(Speaking...)" : ""} */}
              </li>
            ))}
          </ul>

          <h2>Chat</h2>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.playerName}:</strong> {msg.message}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>

          <h2>Voice Chat</h2>
        </>
      )}
    </div>
  );
}
