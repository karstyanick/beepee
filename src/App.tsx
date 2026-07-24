import { useEffect, useState } from "react";
import "./App.css";
import Cups, { TeamCups } from "./Cups";
import RuleSettings from "./RuleSettings";
import {
  Rule,
  TOTAL_CUPS,
  loadRules,
  loadSingleRuleCount,
  saveRules,
  saveSingleRuleCount,
} from "./rules";

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

function cloneInitialCupState(): TeamCups {
  return JSON.parse(JSON.stringify(INITIAL_CUP_STATE));
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function App() {
  const [team1Cups, setTeam1Cups] = useState<TeamCups>(cloneInitialCupState);
  const [team2Cups, setTeam2Cups] = useState<TeamCups>(cloneInitialCupState);

  const [displayedRule, setDisplayedRule] = useState("");

  const [rules, setRules] = useState<Rule[]>(loadRules);
  const [singleRuleCount, setSingleRuleCount] = useState<number>(loadSingleRuleCount);
  const [showInit, setShowInit] = useState(true);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    saveRules(rules);
  }, [rules]);

  useEffect(() => {
    saveSingleRuleCount(singleRuleCount);
  }, [singleRuleCount]);

  const enabledRules = rules.filter((rule) => rule.enabled);
  const enabledSingleRuleCount = enabledRules.filter(
    (rule) => rule.type === "single"
  ).length;
  const enabledMultipleRuleCount = enabledRules.length - enabledSingleRuleCount;
  const canFillAllCups =
    enabledMultipleRuleCount > 0 || enabledSingleRuleCount >= TOTAL_CUPS;

  useEffect(() => {
    const max = Math.min(TOTAL_CUPS, enabledSingleRuleCount);
    if (singleRuleCount > max) {
      setSingleRuleCount(max);
    }
  }, [enabledSingleRuleCount, singleRuleCount]);

  const onResetClick = () => {
    setDisplayedRule("");
    const cups = document.getElementsByClassName("cup");
    Array.from(cups).forEach((cup) => {
      cup.classList.remove("clickedCup");
    });
    setTeam1Cups(cloneInitialCupState());
    setTeam2Cups(cloneInitialCupState());
    setShowInit(true);
    setShowReset(false);
  };

  function chooseRules(teamCupsToSet: TeamCups) {
    const singlePool = shuffleArray(
      enabledRules.filter((rule) => rule.type === "single").map((rule) => rule.text)
    );
    const multiplePool = enabledRules
      .filter((rule) => rule.type === "multiple")
      .map((rule) => rule.text);

    const chosenRules: string[] = singlePool.slice(0, singleRuleCount);
    let singleIndex = chosenRules.length;

    while (chosenRules.length < TOTAL_CUPS) {
      if (multiplePool.length > 0) {
        chosenRules.push(
          multiplePool[Math.floor(Math.random() * multiplePool.length)]
        );
      } else if (singleIndex < singlePool.length) {
        chosenRules.push(singlePool[singleIndex]);
        singleIndex++;
      } else {
        chosenRules.push("");
      }
    }

    const numbers = Array.from({ length: 10 }, (_, index) => index);
    const populateSequence = shuffleArray(numbers) as Array<
      0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    >;

    for (let i = 0; i < 10; i++) {
      teamCupsToSet[populateSequence[i]].rule = chosenRules[i];
    }

    return teamCupsToSet;
  }

  function initilizeCups() {
    const team1CupsToSet = chooseRules(cloneInitialCupState());
    const team2CupsToSet = chooseRules(cloneInitialCupState());

    setTeam1Cups(team1CupsToSet);
    setTeam2Cups(team2CupsToSet);
    setShowInit(false);
    setShowReset(true);
  }

  return (
    <div>
      {showInit && (
        <div className="initWrapper">
          <RuleSettings
            rules={rules}
            setRules={setRules}
            singleRuleCount={singleRuleCount}
            setSingleRuleCount={setSingleRuleCount}
          />
          <button
            className="startButton"
            onClick={initilizeCups}
            disabled={!canFillAllCups}
          >
            Start
          </button>
        </div>
      )}
      {!showInit && (
        <div
          className="globalWrapper"
        >
          <Cups
            setDisplayedRule={setDisplayedRule}
            teamCups={team1Cups}
            orientation="secondary"
            setTeamCups={setTeam1Cups}
          ></Cups>
          <Cups
            setDisplayedRule={setDisplayedRule}
            teamCups={team2Cups}
            orientation="primary"
            setTeamCups={setTeam2Cups}
          ></Cups>
          <div className="gameState">
            <span className="displayedRule">{displayedRule}</span>
            {showReset && (
              <button className="resetButton" onClick={onResetClick}>
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
