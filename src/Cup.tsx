import React from "react";
import "./Cup.css";

interface CupProps {
  setDisplayedRule: (rule: string) => void;
  setHit: () => void;
  rule: string;
  cupId: string;
}

const Cups: React.FC<CupProps> = ({
  setDisplayedRule,
  cupId,
  rule,
  setHit,
}) => {
  const onCupClick = (rule: string, cupId: string) => {
    setHit();
    setDisplayedRule(rule);
    const clickedCup = document.getElementById(cupId);
    if (clickedCup) {
      clickedCup.classList.add("clickedCup");
    }
  };

  return (
    <div
      className="cup"
      key={cupId}
      id={cupId}
      onClick={() => onCupClick(rule, cupId)}
    ></div>
  );
};

export default Cups;
