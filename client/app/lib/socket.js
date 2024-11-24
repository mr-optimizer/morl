import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";
const socket = io.connect(URL);

export default socket;