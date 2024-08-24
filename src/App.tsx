import { useEffect, useRef, useState } from "react";
import "./App.css";
import Cups, { TeamCups } from "./Cups";

const INITIAL_CUP_STATE = {
  0: {
    rule: "",
    hit: false,
    index: 0,
  },
  1: {
    rule: "",
    hit: false,
    index: 1,
  },
  2: {
    rule: "",
    hit: false,
    index: 2,
  },
  3: {
    rule: "",
    hit: false,
    index: 3,
  },
  4: {
    rule: "",
    hit: false,
    index: 4,
  },
  5: {
    rule: "",
    hit: false,
    index: 5,
  },
  6: {
    rule: "",
    hit: false,
    index: 6,
  },
  7: {
    rule: "",
    hit: false,
    index: 7,
  },
  8: {
    rule: "",
    hit: false,
    index: 8,
  },
  9: {
    rule: "",
    hit: false,
    index: 9,
  },
};

const SINGLE_OCCURENCE_RULES = [
  "EX",
  "SPRETZ",
  "GEDRENKS/BEIER EXEN",
  "TRICHTER",
  "SHOT FIR TEAM",
  "0.3 BEIER VERDEELEN",
  "SPRETZ AM TEAM DEELEN",
];
const MULTIPLE_OCCURENCE_RULES = [
  "SHOT",
  "NEXT RONN AANER HAND",
  "NEXT RONN 1 SCHOSS MEI",
  "NEXT RONN 1 SCHOSS MANNER",
  "NEXTEN SCHOSS TRICKSCHOT",
  "JIDEREEN GLAICHZAITEG SCHEISSEN",
  "NEXT RONN AANER HAND",
  "BECHER ENGEM AANEREN GIN",
  "NEXT RONN AAN ZOU",
];

function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function App() {
  const [team1Cups, setTeam1Cups] = useState(INITIAL_CUP_STATE);
  const [team2Cups, setTeam2Cups] = useState(INITIAL_CUP_STATE);

  const [displayedRule, setDisplayedRule] = useState("");

  const customRulesRef = useRef<HTMLInputElement>(null);
  const [showInit, setShowInit] = useState(true);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {}, []);

  const onResetClick = () => {
    setDisplayedRule("");
    const cups = document.getElementsByClassName("cup");
    Array.from(cups).forEach((cup) => {
      cup.classList.remove("clickedCup");
    });
    setTeam1Cups(INITIAL_CUP_STATE);
    setTeam2Cups(INITIAL_CUP_STATE);
    setShowInit(true);
    setShowReset(false);
  };

  function chooseRules(teamCupsToSet: TeamCups) {
    const cloneSingleOccurenceRules = [...SINGLE_OCCURENCE_RULES];

    const chosenSingleOccurenceRules = [];
    const chosenMultipleOccurenceRules = [];
    const chosenCustomRules = customRulesRef.current?.value
      ? customRulesRef.current?.value.split(",")
      : [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(
        Math.random() * cloneSingleOccurenceRules.length
      );
      const randomRule = cloneSingleOccurenceRules[randomIndex];
      chosenSingleOccurenceRules.push(randomRule);
      cloneSingleOccurenceRules.splice(randomIndex, 1);
    }

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(
        Math.random() * MULTIPLE_OCCURENCE_RULES.length
      );
      const randomRule = MULTIPLE_OCCURENCE_RULES[randomIndex];
      chosenMultipleOccurenceRules.push(randomRule);
    }

    const numbers = Array.from({ length: 10 }, (_, index) => index);
    const populateSequence = shuffleArray(numbers) as Array<
      0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    >;

    for (let i = 0; i < 10; i++) {
      if (chosenCustomRules.length > 0) {
        teamCupsToSet[populateSequence[i]].rule = chosenCustomRules[0];
        chosenCustomRules.splice(0, 1);
        continue;
      }

      if (chosenSingleOccurenceRules.length > 0) {
        teamCupsToSet[populateSequence[i]].rule = chosenSingleOccurenceRules[0];
        chosenSingleOccurenceRules.splice(0, 1);
        continue;
      }

      if (chosenMultipleOccurenceRules.length > 0) {
        teamCupsToSet[populateSequence[i]].rule =
          chosenMultipleOccurenceRules[0];
        chosenMultipleOccurenceRules.splice(0, 1);
        continue;
      }
    }

    console.log(`teamCupsToSet`, teamCupsToSet);

    return teamCupsToSet;
  }

  function initilizeCups() {
    const team1CupsToSet = chooseRules(INITIAL_CUP_STATE);
    const team2CupsToSet = chooseRules(INITIAL_CUP_STATE);

    setTeam1Cups(team1CupsToSet);
    setTeam2Cups(team2CupsToSet);
    setShowInit(false);
    setShowReset(true);
  }

  return (
    <div>
      {showInit && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            gap: "20px",
          }}
        >
          {/* <h1 className="title">Bee Pee nespa</h1> */}
          <input
            ref={customRulesRef}
            className="customRuleInput"
            placeholder="Add custom rules if needed (rule1, rule2, ...)"
          ></input>
          <button className="startButton" onClick={initilizeCups}>
            Start
          </button>
        </div>
      )}
      {!showInit && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <Cups
            setDisplayedRule={setDisplayedRule}
            teamCups={team1Cups}
            orientation="secondary"
            setTeamCups={setTeam1Cups}
          ></Cups>
          <br />
          <br />
          <Cups
            setDisplayedRule={setDisplayedRule}
            teamCups={team2Cups}
            orientation="primary"
            setTeamCups={setTeam2Cups}
          ></Cups>
          <span className="displayedRule">{displayedRule}</span>
          {showReset && (
            <button className="resetButton" onClick={onResetClick}>
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
