import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Step } from "src/app/interfaces/step.interface";
import {
  StepperConfig,
  StepperDirection,
  StepperType,
} from "src/app/interfaces/stepper-config.interface";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements OnInit {
  _activeStep: any;
  _steps: Step[] = [];
  _direction: StepperDirection;
  _type: StepperType;

  _lineStyles = {
    vertical: {
      height: "1.85rem",
      width: "4px",
    },
    horizontal: {
      height: "4px",
      width: "1.85rem",
    },
  };

  get activeStep() {
    return this._activeStep;
  }

  get activeIndex() {
    return this._steps.findIndex((item) => item.id === this._activeStep.id);
  }

  @Input() set configuration(config: StepperConfig<any>) {
    const { steps, activeStepDefault, direction, type } = config;
    this._activeStep = activeStepDefault ? activeStepDefault : steps[0];
    this._direction = direction ? direction : "horizontal";
    this._type = type ? type : "numbered";
    this._steps = steps.map((item) => ({
      id: item.id,
      isActive: item === this._activeStep,
      isValid: false,
    }));
  }

  setActiveStep(value: any) {
    this._activeStep = value;
    this._steps = this._steps.map((item, index) => ({
      id: item.id,
      isActive: item.id === value,
      isValid: false,
    }));
    this.detectChanges();
  }

  setActiveStepByObject(value: any) {
    this._activeStep = value;
    this._steps = this._steps.map((item, index) => ({
      id: item.id,
      isActive: item.id === value.id,
      isValid: false,
    }));
  }

  setToNextStep() {
    if (this.activeIndex < this._steps.length - 1) {
      const nextStepIndex = this.activeIndex + 1;
      this.setActiveStepByObject(this._steps[nextStepIndex]);
      this.detectChanges();
    }
  }

  setToPreviousStep() {
    if (this.activeIndex > 0) {
      const previousStepIndex = this.activeIndex - 1;
      this.setActiveStepByObject(this._steps[previousStepIndex]);
      this.detectChanges();
    }
  }

  detectChanges = () => this._cdr.detectChanges();

  // tslint:disable-next-line:variable-name
  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}
}
