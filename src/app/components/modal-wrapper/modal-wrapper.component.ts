import { Component, OnInit, ViewChild } from "@angular/core";
import { StepperConfig } from "src/app/interfaces/stepper-config.interface";
import { StepperComponent } from "../stepper/stepper.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { CartStoreService } from "src/app/services/cart-store.service";
import { ShippingService } from "src/app/services/shipping.service";
import { PaymentService } from "src/app/services/payment.service";

@Component({
  selector: "app-modal-wrapper",
  templateUrl: "./modal-wrapper.component.html",
  styleUrls: ["./modal-wrapper.component.scss"],
})
export class ModalWrapperComponent implements OnInit {
  totalPrice$: Observable<number>;
  stepsConfig: StepperConfig<{}> = {
    steps: [
      { id: "Cart", isActive: true, isValid: false },
      { id: "Shipping", isActive: true, isValid: false },
      { id: "Payment", isActive: true, isValid: false },
      { id: "Overview", isActive: true, isValid: true },
      { id: "Success", isActive: true, isValid: true },
    ],
    direction: "horizontal",
    type: "checked",
  };

  @ViewChild(StepperComponent, { static: false })
  stepperComponent: StepperComponent;

  get currentStep() {
    return this.stepperComponent && this.stepperComponent.activeStep
      ? this.stepperComponent.activeStep
      : this.stepsConfig.steps[0];
  }

  constructor(
    public activeModal: NgbActiveModal,
    private cartStore: CartStoreService,
    private shippingSrv: ShippingService,
    private paymentSrv: PaymentService
  ) {}

  ngOnInit(): void {
    this.totalPrice$ = this.cartStore.totalPrice$;
  }

  nextStep = () => this.stepperComponent.setToNextStep();

  previousStep = () => this.stepperComponent.setToPreviousStep();

  finish() {
    this.shippingSrv.clearForm();
    this.paymentSrv.clearForm();
    this.nextStep();
  }

  closeDialog() {
    this.activeModal.close();
    this.cartStore.clearCart();
  }
}
