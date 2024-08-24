import React, { useEffect, useState } from "react";
import Cup from "./Cup";
import "./Cups.css";

export interface CupStatus {
  rule: string;
  hit: boolean;
  index: number;
}

export interface TeamCups {
  0: CupStatus;
  1: CupStatus;
  2: CupStatus;
  3: CupStatus;
  4: CupStatus;
  5: CupStatus;
  6: CupStatus;
  7: CupStatus;
  8: CupStatus;
  9: CupStatus;
}

interface CupsProps {
  teamCups: TeamCups;
  orientation: "primary" | "secondary";
  setDisplayedRule: (rule: string) => void;
  setTeamCups: (teamCups: TeamCups) => void;
}

const Cups: React.FC<CupsProps> = ({
  teamCups,
  orientation,
  setDisplayedRule,
  setTeamCups,
}) => {
  const [pattern, setPattern] = useState("default");
  const [availablePatterns, setAvailablePatterns] = useState<string[]>([]);
  const [usedEmstellen, setUsedEmstellen] = useState(0);

  const row1 = [teamCups[0]];
  const row2 = [teamCups[1], teamCups[2]];
  const row3 = [teamCups[3], teamCups[4], teamCups[5]];
  const row4 = [teamCups[6], teamCups[7], teamCups[8], teamCups[9]];

  const rows = [row1, row2, row3, row4];
  const rowsSecondary = [row4, row3, row2, row1];

  const changePattern = (pattern: string) => {
    setPattern(pattern);
    setUsedEmstellen(usedEmstellen + 1);
    setAvailablePatterns([]);
  };

  const setHit = (cupId: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => {
    setTeamCups({
      ...teamCups,
      [cupId]: {
        ...teamCups[cupId],
        hit: true,
      },
    });
  };

  useEffect(() => {
    setAvailablePatterns(computeAvailablePatterns());
  }, [teamCups]);

  const computeAvailablePatterns = () => {
    if (usedEmstellen >= 2) {
      return [];
    }

    const numOfCupsLeft = Object.values(teamCups).filter(
      (cup) => !cup.hit
    ).length;

    switch (numOfCupsLeft) {
      case 7:
        return ["Pfeil"];
      case 6:
        return ["Kleng pyramide"];
      case 5:
        return ["Tirette"];
      case 4:
        return ["Raute"];
      case 3:
        return ["Mini pyramide"];
      case 2:
        return ["Ligne"];
      default:
        return [];
    }
  };

  return (
    <>
      {orientation === "primary" && (
        <div className="cupWrapper">
          {rows.map((row) => {
            return (
              <div className="cupRow">
                {row.map((cup) => (
                  <Cup
                    setHit={() => setHit(cup.index as any)}
                    rule={cup.rule}
                    cupId={`${cup.index}-primary`}
                    setDisplayedRule={setDisplayedRule}
                  ></Cup>
                ))}
              </div>
            );
          })}
          {availablePatterns.map((pattern) => (
            <button
              className="changePatternButtonBottom"
              onClick={() => changePattern(pattern)}
            >
              {pattern}
            </button>
          ))}
        </div>
      )}
      {orientation === "secondary" && (
        <div className="cupWrapper">
          {availablePatterns.map((pattern) => (
            <button
              className="changePatternButtonTop"
              onClick={() => changePattern(pattern)}
            >
              {pattern}
            </button>
          ))}
          {rowsSecondary.map((row) => {
            return (
              <div className="cupRow">
                {row.map((cup) => (
                  <Cup
                    setHit={() => setHit(cup.index as any)}
                    rule={cup.rule}
                    cupId={`${cup.index}-secondary`}
                    setDisplayedRule={setDisplayedRule}
                  ></Cup>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Cups;
