import styles from "./PlayerListItem.module.css";
// import MicIcon from "@mui/icons-material/Mic";
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import MicOffIcon from "@mui/icons-material/MicOff";
import { useState } from "react";

interface PlayerListItemProps {
  playerName?: string;
  playerScore?: number;
  playerWarningCount?: number;
  playerIsTalking?: boolean;
}

const PlayerListItem: React.FC<PlayerListItemProps> = (props) => {
  const [isSpeaking, setIsSpeaking] = useState(props.playerIsTalking);
  const handleMicClick = () => {
    setIsSpeaking((p) => !p);
  };
  return (
    <div className={styles.PlayerListItem_Container}>
      <div className={styles.PlayerListItem_Avatar}>*_*</div>
      <div className={styles.PlayerListItem_Middle}>
        <p title={props.playerName} className={styles.PlayerListItem_Name}>
          {props?.playerName && props?.playerName?.length > 15
            ? props.playerName?.slice(0, 15) + "..."
            : props.playerName}
        </p>
        <div className={styles.PlayerListItem_ScoreWarning_Container}>
          <p className={styles.PlayerListItem_Score}>
            Score: {props.playerScore}
          </p>
          <p className={styles.PlayerListItem_WarningCount}>
            Warning: {props.playerWarningCount}
          </p>
        </div>
      </div>
      <div className={styles.PlayerListItem_Talking} onClick={handleMicClick}>
        {isSpeaking ? <GraphicEqRoundedIcon /> : <MicOffIcon />}
      </div>
    </div>
  );
};

export default PlayerListItem;
