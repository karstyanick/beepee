export interface Rule {
  id: string;
  text: string;
  type: "single" | "multiple";
  custom: boolean;
  enabled: boolean;
}

const CUSTOM_RULES_KEY = "beepee-custom-rules";
const DISABLED_RULES_KEY = "beepee-disabled-rules";
const SINGLE_RULE_COUNT_KEY = "beepee-single-rule-count";

export const TOTAL_CUPS = 10;
export const DEFAULT_SINGLE_RULE_COUNT = 5;

const BUILTIN_SINGLE_OCCURENCE_RULES = [
  "GEDRENKS/BEIER EXEN",
  "TRICHTER",
  "SHOT FIR TEAM",
  "0.3 BEIER VERDEELEN",
];

const BUILTIN_MULTIPLE_OCCURENCE_RULES = [
  "SHOT",
  "NEXT RONN AANER HAND",
  "NEXT RONN 1 SCHOSS MANNER",
  "NEXTEN SCHOSS TRICKSCHOT",
  "JIDEREEN GLAICHZAITEG SCHEISSEN",
  "BECHER ENGEM AANEREN GIN",
  "NEXT RONN AAN ZOU",
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadRules(): Rule[] {
  const disabledIds = new Set(readJson<string[]>(DISABLED_RULES_KEY, []));
  const customRules = readJson<Rule[]>(CUSTOM_RULES_KEY, []);

  const builtins: Rule[] = [
    ...BUILTIN_SINGLE_OCCURENCE_RULES.map((text) => ({
      id: `builtin-single-${text}`,
      text,
      type: "single" as const,
      custom: false,
      enabled: true,
    })),
    ...BUILTIN_MULTIPLE_OCCURENCE_RULES.map((text) => ({
      id: `builtin-multiple-${text}`,
      text,
      type: "multiple" as const,
      custom: false,
      enabled: true,
    })),
  ].map((rule) => ({ ...rule, enabled: !disabledIds.has(rule.id) }));

  return [...builtins, ...customRules];
}

export function saveRules(rules: Rule[]) {
  const disabledIds = rules
    .filter((rule) => !rule.custom && !rule.enabled)
    .map((rule) => rule.id);
  const customRules = rules.filter((rule) => rule.custom);

  localStorage.setItem(DISABLED_RULES_KEY, JSON.stringify(disabledIds));
  localStorage.setItem(CUSTOM_RULES_KEY, JSON.stringify(customRules));
}

export function loadSingleRuleCount(): number {
  const count = readJson<number>(SINGLE_RULE_COUNT_KEY, DEFAULT_SINGLE_RULE_COUNT);
  if (typeof count !== "number" || isNaN(count)) {
    return DEFAULT_SINGLE_RULE_COUNT;
  }
  return Math.min(TOTAL_CUPS, Math.max(0, Math.round(count)));
}

export function saveSingleRuleCount(count: number) {
  localStorage.setItem(SINGLE_RULE_COUNT_KEY, JSON.stringify(count));
}

export function createCustomRule(text: string, type: Rule["type"]): Rule {
  return {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: text.trim(),
    type,
    custom: true,
    enabled: true,
  };
}
