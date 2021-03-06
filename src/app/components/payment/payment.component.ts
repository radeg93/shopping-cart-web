import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { letters } from "src/app/utils/validators";
import { ValidatorService } from "angular-iban";
import { Step } from "src/app/interfaces/step.interface";
import { PaymentService } from "src/app/services/payment.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit, OnDestroy {
  @Input() step: Step;
  form = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private paymentSrv: PaymentService) {}

  ngOnInit() {
    this.prepareForm();
    this.populateForm();
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.form.valid
        ? (this.step.isValid = true)
        : (this.step.isValid = false);
    });
  }

  prepareForm() {
    this.form.addControl(
      "owner",
      new FormControl(null, [Validators.required, Validators.pattern(letters)])
    );
    this.form.addControl(
      "iban",
      new FormControl(null, [
        Validators.required,
        ValidatorService.validateIban,
      ])
    );
  }

  populateForm() {
    const form = this.paymentSrv.getForm();
    this.form.patchValue(form);
    this.form.valid ? (this.step.isValid = true) : (this.step.isValid = false);
  }

  ngOnDestroy() {
    this.paymentSrv.saveForm(this.form.value);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
