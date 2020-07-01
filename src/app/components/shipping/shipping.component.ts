import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { letters, phoneNumber } from "src/app/utils/validators";
import { Step } from "src/app/interfaces/step.interface";
import { ShippingService } from "src/app/services/shipping.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-shipping",
  templateUrl: "./shipping.component.html",
  styleUrls: ["./shipping.component.scss"],
})
export class ShippingComponent implements OnInit, OnDestroy {
  @Input() step: Step;
  form = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private shippingSrv: ShippingService) {}

  ngOnInit() {
    this.prepareForm();
    this.populateForm();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.form.valid
          ? (this.step.isValid = true)
          : (this.step.isValid = false)
      );
  }

  prepareForm() {
    this.form.addControl(
      "firstName",
      new FormControl(null, [Validators.required, Validators.pattern(letters)])
    );
    this.form.addControl(
      "secondName",
      new FormControl(null, [Validators.required, Validators.pattern(letters)])
    );
    this.form.addControl(
      "address",
      new FormControl(null, [Validators.required])
    );
    this.form.addControl(
      "phoneNumber",
      new FormControl(null, [
        Validators.required,
        Validators.pattern(phoneNumber),
      ])
    );
  }

  populateForm() {
    const form = this.shippingSrv.getForm();
    this.form.patchValue(form);
    this.form.valid ? (this.step.isValid = true) : (this.step.isValid = false);
  }

  ngOnDestroy() {
    this.shippingSrv.saveForm(this.form.value);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
