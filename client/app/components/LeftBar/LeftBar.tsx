"use client";
import { useEffect, useState } from "react";
import styles from "./LeftBar.module.css";
import { useSocket } from "@/app/context/SocketContext";
import PlayerListItem from "./PlayerListItem";

interface PlayerJoinedData {
  playerName: string;
  playersInRoom: string[];
}

// interface PlayerDetails {
//   playerName: string;
//   playerScore: number;
//   playerWarningCount: number;
//   playerIsTalking: boolean;
// }

const LeftBar = () => {
  const ps = [
    {
      playerName: "Swastik Kumar",
      playerScore: 21,
      playerWarningCount: 0,
      playerIsTalking: false,
    },
    {
      playerName: "Shubham Shandilya",
      playerScore: 20,
      playerWarningCount: 10,
      playerIsTalking: false,
    },
    {
      playerName: "Mohak Harish Gidwani",
      playerScore: 21,
      playerWarningCount: 0,
      playerIsTalking: false,
    },
    {
      playerName: "Waridhhiman Saha",
      playerScore: 140,
      playerWarningCount: 10,
      playerIsTalking: false,
    },
  ];
  const socket = useSocket();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.on(
      "playerJoined",
      ({ playerName, playersInRoom }: PlayerJoinedData) => {
        console.log(`Player joined: ${playerName}`);
        console.log(`All player: ${playersInRoom}`);
        setPlayers(playersInRoom);
      }
    );

    return () => {
      socket.off("playerJoined");
    };
  });

  return (
    <div className={styles.LeftBar_Container}>
      <h2 className={styles.leftbar_heading}>Players</h2>
      <div className={styles.players_container}>
        <ul className={styles.item_list}>
          {/* {ps.map((p,i) => {
              <li key={i}><PlayerListItem/></li>
            })
          } */}
          {/* <PlayerListItem playerName={}/>
          <PlayerListItem/>
          <PlayerListItem/>
          <PlayerListItem/> */}
          {ps.map((player, index) => (
            <li key={index}>
              {
                <PlayerListItem
                  playerName={player.playerName}
                  playerScore={player.playerScore}
                  playerWarningCount={player.playerWarningCount}
                  playerIsTalking={player.playerIsTalking}
                />
              }{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;
/*
    Optimizations
    1. Players array is modified after every player joins instead it should be appended 
*/
