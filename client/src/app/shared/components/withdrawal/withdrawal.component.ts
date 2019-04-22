import { Component, Input, OnInit } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd";
import { copy } from "@delon/util";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "component-withdrawal",
  templateUrl: "./withdrawal.component.html",
  styleUrls: ["./withdrawal.component.less"]
})
export class WithdrawalComponent implements OnInit {
  @Input()
  record: any;

  i: any = {};

  openCopyTooltip = false;

  withdrawalForm: FormGroup;
  constructor(private fb: FormBuilder, private modal: NzModalRef) {}
  ngOnInit() {
    this.withdrawalForm = this.fb.group({
      fieldA    : [ null, [ Validators.required ] ],
      filedB    : [ null, [ Validators.required ] ]
    });
  }

  submitForm(): void {
    for (const i in this.withdrawalForm.controls) {
      if (this.withdrawalForm.controls.hasOwnProperty(i)) {
        this.withdrawalForm.controls[i].markAsDirty();
        this.withdrawalForm.controls[i].updateValueAndValidity();
      }
    }
  }

  withdrawal() {
    this.modal.close(`new time: ${+new Date()}`);
    this.cancel();
  }

  cancel() {
    this.modal.destroy();
  }

  copy() {
    this.openCopyTooltip = true;

    copy(this.record.address).then(() => {
      setTimeout(() => {
        this.openCopyTooltip = false;
      }, 800);
    });
  }
}
