import { Component, Input } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd";
import { copy } from "@delon/util";

@Component({
  selector: "component-deposit",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.less"]
})
export class DepositComponent {
  @Input()
  record: any;

  openCopyTooltip = false;

  constructor(private modal: NzModalRef) {}

  ok() {
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
