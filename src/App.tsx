import "./styles.css";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <div
      className="app"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
        width: "100%"
      }}
    >
      <div style={{ padding: 15 }}>
        <Calendar />
      </div>
    </div>
  );
}
