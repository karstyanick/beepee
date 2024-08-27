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

  const [cupArrays, setCupArrays] = useState<CupStatus[][]>([]);
  const [cupArrayOrientation, setCupArrayOrientation] = useState<"horizontal" | "vertical">("horizontal");

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
    const remainingCups = Object.values(teamCups).filter((cup) => !cup.hit);
    
    if (pattern === "Pfeil"){
      setCupArrayOrientation("horizontal");
      if (orientation === "secondary") {
        populateCupArray(remainingCups, [1, 3, 2, 1])
      }else{
        populateCupArray(remainingCups, [1, 2, 3, 1])
      }
    }
  
    if (pattern === "Kleng pyramide"){
      setCupArrayOrientation("horizontal");
      if (orientation === "primary") {
        populateCupArray(remainingCups, [1, 2, 3])
      }else{
        populateCupArray(remainingCups, [3, 2, 1])
      }
    }

    if (pattern === "Tirette"){
      setCupArrayOrientation("vertical");
      if (orientation === "secondary") {
        populateCupArray(remainingCups, [3, 2])
      }else {
        populateCupArray(remainingCups, [2, 3])
      }
    }

    if (pattern === "Raute"){
      setCupArrayOrientation("horizontal");
      populateCupArray(remainingCups, [1, 2, 1])
    }

    if (pattern === "Mini pyramide"){
      setCupArrayOrientation("horizontal");
      if (orientation === "secondary") {
        populateCupArray(remainingCups, [2, 1])
      }else {
        populateCupArray(remainingCups, [1, 2])
      }
    }

    if (pattern === "Ligne"){
      setCupArrayOrientation("horizontal");
      populateCupArray(remainingCups, [1, 1])
    }
  }, [pattern]);

  const populateCupArray = (cupsArray: any[], pattern: number[]) => {
    const resultArray = []
    
    for (let i=0; i<4; i++) {
      if(pattern[i] !== 0){
        resultArray[i] = cupsArray.splice(0, pattern[i])
      }
    }

    setCupArrays(resultArray)
  }

  useEffect(() => {
    if ( orientation === "primary") {
      populateCupArray(Object.values(teamCups), [1, 2, 3, 4])
    }
    if ( orientation === "secondary") {
      populateCupArray(Object.values(teamCups), [4, 3, 2, 1])
    }
  }, []);

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
      <div className={cupArrayOrientation === "horizontal" ? "cupWrapper" : "verticalCupWrapper"}>
        {orientation === "secondary" && availablePatterns.map((pattern) => (
          <button
            key={`secondary-${pattern}`}
            className="changePatternButtonTop"
            onClick={() => changePattern(pattern)}
          >
            {pattern}
          </button>
        ))}
        {cupArrays.map((row, index) => {
          return (
            <div key={`row-${index}-${orientation}`} className={cupArrayOrientation === "horizontal" ? "cupRow" : "verticalCupRow"}>
              {row.map((cup) => (
                <Cup
                  setHit={() => setHit(cup.index as any)}
                  rule={cup.rule}
                  cupId={`${cup.index}-${orientation}`}
                  setDisplayedRule={setDisplayedRule}
                  key={`cups-${cup.index}-${orientation}`}
                ></Cup>
              ))}
            </div>
          );
        })}
        {orientation === "primary" && availablePatterns.map((pattern) => (
          <button
            key={`primary-${pattern}`}
            className="changePatternButtonBottom"
            onClick={() => changePattern(pattern)}
          >
            {pattern}
          </button>
        ))}
      </div>
    </>
  );
};

export default Cups;
