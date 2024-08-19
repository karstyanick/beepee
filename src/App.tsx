import { useEffect, useState } from "react";
import "./App.css";

const SINGLE_OCCURENCE_RULES = [
  "EX",
  "SPRETZ",
  "GEDRENKS/BEIER EXEN",
  "TRICHTER",
  "SHOT FIR TEAM",
  "0.3 BEIER VERDEELEN",
  "SPRET AM TEAM DEELEN",
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
    9: ""
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
    9: ""
  });

  useEffect(() => {}, []);

  function initilizeCups() {

    const cloneMultOccurenceRules = MULTIPLE_OCCURENCE_RULES
    const chosenMultOccurenceRules = 

    // for (let i = 0; i < 10; i++) {
      
    // }
  }

  return (
    <div>
      <input
        className="customRuleInput"
        placeholder="Input Custom Rule if needed"
      ></input>

      <button onClick={initilizeCups}>Start</button>
    </div>
  );
}

export default App;
