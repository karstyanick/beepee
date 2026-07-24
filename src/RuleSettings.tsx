import React, { useState } from "react";
import { Rule, TOTAL_CUPS, createCustomRule } from "./rules";
import "./RuleSettings.css";

interface RuleSettingsProps {
  rules: Rule[];
  setRules: (rules: Rule[]) => void;
  singleRuleCount: number;
  setSingleRuleCount: (count: number) => void;
}

const RuleSettings: React.FC<RuleSettingsProps> = ({
  rules,
  setRules,
  singleRuleCount,
  setSingleRuleCount,
}) => {
  const [newRuleText, setNewRuleText] = useState("");
  const [newRuleType, setNewRuleType] = useState<Rule["type"]>("multiple");

  const enabledSingleCount = rules.filter(
    (rule) => rule.type === "single" && rule.enabled
  ).length;
  const enabledMultipleCount = rules.filter(
    (rule) => rule.type === "multiple" && rule.enabled
  ).length;

  const maxSingleRuleCount = Math.min(TOTAL_CUPS, enabledSingleCount);

  // All 10 cups need a rule: either at least one repeatable rule is enabled,
  // or there are 10+ single-use rules. A rule is locked when disabling it
  // would leave the enabled rules unable to fill all cups.
  const isLockedRule = (rule: Rule) => {
    if (!rule.enabled) {
      return false;
    }
    const singlesAfter =
      enabledSingleCount - (rule.type === "single" ? 1 : 0);
    const multiplesAfter =
      enabledMultipleCount - (rule.type === "multiple" ? 1 : 0);
    return multiplesAfter === 0 && singlesAfter < TOTAL_CUPS;
  };

  const toggleRule = (id: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const addRule = (event: React.FormEvent) => {
    event.preventDefault();
    const text = newRuleText.trim();
    if (!text) {
      return;
    }
    setRules([...rules, createCustomRule(text, newRuleType)]);
    setNewRuleText("");
  };

  const renderGroup = (type: Rule["type"], title: string) => {
    const groupRules = rules.filter((rule) => rule.type === type);
    return (
      <div className="ruleGroup">
        <h3 className="ruleGroupTitle">{title}</h3>
        {groupRules.map((rule) => {
          const locked = isLockedRule(rule);
          return (
            <div key={rule.id} className={locked ? "ruleRow ruleRowLocked" : "ruleRow"}>
              <label className="ruleLabel">
                <input
                  type="checkbox"
                  className="ruleCheckbox"
                  checked={rule.enabled}
                  disabled={locked}
                  onChange={() => toggleRule(rule.id)}
                />
                <span className={rule.enabled ? "ruleText" : "ruleText ruleTextDisabled"}>
                  {rule.text}
                </span>
              </label>
              {rule.custom && !locked && (
                <button
                  type="button"
                  className="deleteRuleButton"
                  aria-label={`Delete rule ${rule.text}`}
                  onClick={() => deleteRule(rule.id)}
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="ruleSettings">
      <div className="splitSetting">
        <div className="splitLabels">
          <span>1x pro Spill: {singleRuleCount}</span>
          <span>Widderhuelbar: {TOTAL_CUPS - singleRuleCount}</span>
        </div>
        <input
          type="range"
          className="splitSlider"
          min={0}
          max={maxSingleRuleCount}
          step={1}
          value={singleRuleCount}
          onChange={(event) => setSingleRuleCount(Number(event.target.value))}
        />
      </div>

      {renderGroup("single", "1x pro Spill")}
      {renderGroup("multiple", "Widderhuelbar")}

      <form className="addRuleForm" onSubmit={addRule}>
        <input
          className="addRuleInput"
          value={newRuleText}
          onChange={(event) => setNewRuleText(event.target.value)}
          placeholder="Nei Regel..."
        />
        <div className="addRuleTypeToggle">
          <button
            type="button"
            className={
              newRuleType === "single"
                ? "addRuleTypeButton addRuleTypeButtonActive"
                : "addRuleTypeButton"
            }
            onClick={() => setNewRuleType("single")}
          >
            1x pro Spill
          </button>
          <button
            type="button"
            className={
              newRuleType === "multiple"
                ? "addRuleTypeButton addRuleTypeButtonActive"
                : "addRuleTypeButton"
            }
            onClick={() => setNewRuleType("multiple")}
          >
            Widderhuelbar
          </button>
        </div>
        <button type="submit" className="addRuleButton" disabled={!newRuleText.trim()}>
          Regel dobäisetzen
        </button>
      </form>
    </div>
  );
};

export default RuleSettings;
