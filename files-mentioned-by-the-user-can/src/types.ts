export type ScoreKey = "clarity" | "trust" | "audience" | "message";

export type Scores = Record<ScoreKey, number>;

export type RepairAction = {
  id: string;
  label: string;
  correct: boolean;
  message: string;
  scoreDelta?: Partial<Scores>;
};

export type ChoiceOption = {
  id: string;
  label: string;
  correct: boolean;
  message?: string;
  scoreDelta?: Partial<Scores>;
};

export type Level = {
  id: string;
  title: string;
  category: string;
  theme: string;
  goal: string;
  prompt: string;
  context: string;
  presenterNote: string;
  baseScores: Scores;
  spot?: ChoiceOption[];
  choices?: {
    id: string;
    title: string;
    options: ChoiceOption[];
  }[];
  actions?: RepairAction[];
  completionFeedback: string;
};
