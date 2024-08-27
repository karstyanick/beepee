import React from "react";
import "./Cup.css";

interface CupProps {
  setDisplayedRule: (rule: string) => void;
  setHit: () => void;
  rule: string;
  cupId: string;
}

const Cup: React.FC<CupProps> = ({
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
      id={cupId}
      onClick={() => onCupClick(rule, cupId)}
    ></div>
  );
};

export default Cup;
