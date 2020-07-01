export interface StepperConfig<T> {
  steps: T[];
  activeStepDefault?: T;
  type?: StepperType;
  direction?: StepperDirection;
}

export type StepperType = "checked" | "numbered";

export type StepperDirection = "vertical" | "horizontal";
