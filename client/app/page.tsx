// import Chat from "./Chat";
import Header from "./components/Header";
import LeftBar from "./components/LeftBar";
import MiddleBar from "./components/MiddleBar";
import RightBar from "./components/RightBar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Header room_id={123} />
      <section className={styles.page_three_bars}>
        <LeftBar />
        <MiddleBar />
        <RightBar />
      </section>
      {/* <Chat /> */}
    </div>
  );
}
