import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressBarProps {
  solved: number;
  total: number;
  color: string;
  difficulty: string;
}
const ProgressBar = ({
  solved,
  total,
  color,
  difficulty,
}: ProgressBarProps) => {
  const value = Math.floor((solved * 100) / total);
  return (
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
          trail: {
            fontFamily:"Teko",
            stroke: "#87aef099",
          },
        }}
      />
      <small>
        <strong>
          {difficulty} ({solved}/{total})
        </strong>
      </small>
    </div>
  );
};

export default ProgressBar;
