import React from "react";
import "./Cups.css";

interface TeamCups {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
}

interface CupsProps {
  teamCups: TeamCups;
  orientation: "primary" | "secondary";
}

const Cups: React.FC<CupsProps> = ({ teamCups, orientation }) => {
  const row1 = [teamCups[0]];
  const row2 = [teamCups[1], teamCups[2]];
  const row3 = [teamCups[3], teamCups[4], teamCups[5]];
  const row4 = [teamCups[6], teamCups[7], teamCups[8], teamCups[9]];

  const onCupClick = (rule: string, cupId: string) => {
    // Change the class of the clicked button to "clickedCup"
    const clickedCup = document.getElementById(cupId);
    if (clickedCup) {
      clickedCup.classList.add("clickedCup");
    }
    alert(`Rule ${rule} clicked!`);
  };

  return (
    <>
      {orientation === "primary" && (
        <div>
          <div className="cupRow">
            {row1.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row1-primary`}
                id={`${index}-row1-primary`}
                onClick={() => onCupClick(rule, `${index}-row1-primary`)}
              ></div>
            ))}
          </div>
          <div className="cupRow">
            {row2.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row2-primary`}
                id={`${index}-row2-primary`}
                onClick={() => onCupClick(rule, `${index}-row2-primary`)}
              ></div>
            ))}
          </div>
          <div className="cupRow">
            {row3.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row3-primary`}
                id={`${index}-row3-primary`}
                onClick={() => onCupClick(rule, `${index}-row3-primary`)}
              ></div>
            ))}
          </div>
          <div className="cupRow">
            {row4.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row4-primary`}
                id={`${index}-row4-primary`}
                onClick={() => onCupClick(rule, `${index}-row4-primary`)}
              ></div>
            ))}
          </div>
        </div>
      )}
      {orientation === "secondary" && (
        <div>
          <div className="cupRow">
            {row4.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row4-secondary`}
                id={`${index}-row4-secondary`}
                onClick={() => onCupClick(rule, `${index}-row4-secondary`)}
              ></div>
            ))}
          </div>
          <div className="cupRow">
            {row3.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row3-secondary`}
                id={`${index}-row3-secondary`}
                onClick={() => onCupClick(rule, `${index}-row3-secondary`)}
              ></div>
            ))}
          </div>
          <div className="cupRow">
            {row2.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row2-secondary`}
                id={`${index}-row2-secondary`}
                onClick={() => onCupClick(rule, `${index}-row2-secondary`)}
              ></div>
            ))}
          </div>
          <div className="cupRow">
            {row1.map((rule, index) => (
              <div
                className="cup"
                key={`${index}-row1-secondary`}
                id={`${index}-row1-secondary`}
                onClick={() => onCupClick(rule, `${index}-row1-secondary`)}
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Cups;
