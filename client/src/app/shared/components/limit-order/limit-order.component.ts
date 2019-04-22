import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { _HttpClient } from "@delon/theme";
import { SFSchema } from "@delon/form";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TradingService } from "@services";

@Component({
  selector: "ex-limit-order",
  templateUrl: "./limit-order.component.html",
  styleUrls: ["./limit-order.component.less"]
})

export class LimitOrderComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private tradingService: TradingService
  ) {
  }

  @Input() coin;
  @Input() market;
  @Input() amount;
  @Input() price;

  coinName = "";
  marketName = "";
  url = `/market`;

  schema: SFSchema = {
    properties: {
      email: {
        type: "string",
        title: "Email",
        format: "email",
        maxLength: 20
      },
      name: {
        type: "string",
        title: "Name",
        minLength: 3
      }
    }
  };

  limitOrderList: any[] = [];
  limitBuy: FormGroup;
  limitSell: FormGroup;

  buyTotal;
  sellTotal;
  get limitBuyForm() {
    return this.limitBuy.controls;
  }

  get limitSellForm() {
    return this.limitSell.controls;
  }

  submit(value: any) {
  }

  submitLimitBuy(): void {
    for (const i in this.limitBuyForm) {
      if (this.limitBuyForm.hasOwnProperty(i)) {
        this.limitBuyForm[i].markAsDirty();
        this.limitBuyForm[i].updateValueAndValidity();
        if (this.limitBuyForm[i].hasOwnProperty("errors")) {
          return;
        }
      }
    }

    this.tradingService.buy(this.coin, this.market, true, this.limitBuyForm.lbqty.value, this.limitBuyForm.lbprice.value).then(response => {

    });
  }

  submitLimitSell(): void {
    for (const i in this.limitSellForm) {
      if (this.limitSellForm.hasOwnProperty(i)) {
        this.limitSellForm[i].markAsDirty();
        this.limitSellForm[i].updateValueAndValidity();
        if (this.limitSellForm[i].hasOwnProperty("errors")) {
          return;
        }
      }
    }

    this.tradingService.sell(this.coin, this.market, true, this.limitSellForm.lsqty.value, this.limitSellForm.lsprice.value).then(response => {

    });
  }

  ngOnInit() {
    this.coinName = this.coin;
    this.marketName = this.market;

    this.limitBuy = this.fb.group({
      lbqty: ['', [Validators.required]],
      lbprice: ['', [Validators.required]]
    });
    this.limitSell = this.fb.group({
      lsqty: ['', [Validators.required]],
      lsprice: ['', [Validators.required]]
    });

    of(
      Array(10)
        .fill({})
        .map((item: any, idx: number) => {
          return {
            coinLogo: "/assets/tmp/img/btc.png",
            name: `${this.coinName}/COIN ${idx + 1}`,
            isBuy: Math.ceil(Math.random() * 2) === 1 ? true : false,
            amount: 12.01234567,
            percent: Math.ceil(Math.random() * 100)
          };
        })
    )
      .pipe(delay(500))
      .subscribe(res => {
        this.limitOrderList = res;
      });

    // this.http.get(`/market/${this.coinMarket}`).subscribe((res: any) => {
    //   this.coinList = res.data;
    // });
  }

  applyBuyAmount(percent) {
    this.limitBuyForm.lbqty.setValue((this.amount / 100) * percent);
    this.buyChange();
  }

  applSellAmount(percent) {
    this.limitSellForm.lsqty.setValue((this.amount / 100) * percent);
    this.sellChange();
  }

  buyChange() {
    if (this.limitBuyForm.lbqty.value !== '' && this.limitBuyForm.lbprice.value !== '') {
      this.buyTotal = this.limitBuyForm.lbqty.value * this.limitBuyForm.lbprice.value;
    }
  }

  sellChange() {
    if (this.limitSellForm.lsqty.value !== '' && this.limitSellForm.lsprice.value !== '') {
      this.sellTotal = this.limitSellForm.lsqty.value * this.limitSellForm.lsprice.value;
    }
  }
}
