import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressBarProps {
  value: number;
  color: string;
  difficulty: string;
}
const ProgressBar = ({ value, color, difficulty }: ProgressBarProps) => (
  <div className={difficulty.toLowerCase()}>
    <CircularProgressbar
      className="progressBar"
      value={value}
      text={value + "%"}
      strokeWidth={2}
      styles={{
        path: {
          stroke: color,
          strokeWidth: 4,
        },
        text: {
          fontFamily: "Jetbrains Mono",
        },
        trail: {
          stroke: "#87aef099",
        },
      }}
    />
    <small>
      <strong>{difficulty}</strong>
    </small>
  </div>
);

export default ProgressBar;
