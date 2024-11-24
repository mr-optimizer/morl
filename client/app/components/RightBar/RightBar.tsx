import ChatBox from "./ChatBox/ChatBox";
import styles from "./RightBar.module.css";

const RightBar = () => {
  return (
    <div className={styles.RightBar_Container}>
      <h2 className={styles.rightbar_heading}>Chats</h2>
      <ChatBox/>
    </div>
  );
};

export default RightBar;
