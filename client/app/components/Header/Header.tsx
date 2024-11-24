"use client";
// app/components/Header/Header.tsx
import { useState, useRef } from "react";
import styles from "./Header.module.css";
import Button from "../Button";
// import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { ContentCopy } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

interface HeaderProps {
  room_id?: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  const room_id = props?.room_id ? props.room_id : 45;
  const [isCopied, setIsCopied] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  const handleLeaveRoom = () => {
    console.log(`Log from Header.tsx`);
  };

  const handleCopy = () => {
    if (textRef.current && textRef.current.onselect) {
      // Check if current is not null and has select method
      textRef.current.onselect;
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } else {
      // Handle the case where ref is not set or doesn't have select method (optional)
      console.error("Unable to select text for copying.");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Descriptionary</div>
      <div className={styles.right_content}>
        <div className={styles.Room_Id_Container}>
          <p className={styles.Room_Id_Label}>Room Number:</p>
          <pre ref={textRef} className={styles.Room_Id_Value}>
            {room_id}
          </pre>
          <Tooltip title={isCopied ? "Copied!" : "Copy"}>
            <div className={styles.icon_container}>
              <ContentCopy className={styles.iconCopy} onClick={handleCopy} />
            </div>
          </Tooltip>
          {/* <ContentCopyRoundedIcon onClick={handleCopy} className={styles.iconCopy} /> */}
        </div>
        <Button
          width="60px"
          padding="6px 1px"
          bgColor="#ff4757"
          btnText="Leave"
          onClick={handleLeaveRoom}
        />
      </div>
    </header>
  );
};

export default Header;
