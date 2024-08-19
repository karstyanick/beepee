import { useEffect, useRef, useState } from "react";
import "./App.css";
import Cups from "./Cups";

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
  const [team1Cups, setTeam1Cups] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });

  const [team2Cups, setTeam2Cups] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });

  const customRulesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {}, []);

  function chooseRules(teamCupsToSet: any) {
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
        teamCupsToSet[populateSequence[i]] = chosenCustomRules[0];
        chosenCustomRules.splice(0, 1);
        continue;
      }

      if (chosenSingleOccurenceRules.length > 0) {
        teamCupsToSet[populateSequence[i]] = chosenSingleOccurenceRules[0];
        chosenSingleOccurenceRules.splice(0, 1);
        continue;
      }

      if (chosenMultipleOccurenceRules.length > 0) {
        teamCupsToSet[populateSequence[i]] = chosenMultipleOccurenceRules[0];
        chosenMultipleOccurenceRules.splice(0, 1);
        continue;
      }
    }

    console.log(`teamCupsToSet`, teamCupsToSet);

    return teamCupsToSet;
  }

  function initilizeCups() {
    const team1CupsToSet = chooseRules({});
    const team2CupsToSet = chooseRules({});

    setTeam1Cups(team1CupsToSet);
    setTeam2Cups(team2CupsToSet);
  }

  return (
    <div>
      <input
        ref={customRulesRef}
        className="customRuleInput"
        placeholder="Add custom rules if needed (rule1, rule2, ...)"
      ></input>

      <button className="startButton" onClick={initilizeCups}>
        Start
      </button>

      <div>
        <Cups teamCups={team1Cups} orientation="secondary"></Cups>
      </div>
      <br />
      <br />
      <div>
        <Cups teamCups={team2Cups} orientation="primary"></Cups>
      </div>
    </div>
  );
}

export default App;
