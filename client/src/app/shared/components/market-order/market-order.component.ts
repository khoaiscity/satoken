import { Component, OnInit, Input, Inject } from "@angular/core";
import { _HttpClient } from "@delon/theme";
import { SFSchema } from "@delon/form";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WalletService, TradingService } from "@services";

@Component({
  selector: "ex-market-order",
  templateUrl: "./market-order.component.html",
  styleUrls: ["./market-order.component.less"]
})

export class MarketOrderComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private walletService: WalletService,
    private tradingService: TradingService) {
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
  withdrawalForm: FormGroup;
  marketBuy: FormGroup;
  marketSell: FormGroup;

  get marketBuyForm() {
    return this.marketBuy.controls;
  }

  get marketSellForm() {
    return this.marketSell.controls;
  }

  submit(value: any) {}

  submitMarketBuy(): void {
    for (const i in this.marketBuyForm) {
      if (this.marketBuyForm.hasOwnProperty(i)) {
        this.marketBuyForm[i].markAsDirty();
        this.marketBuyForm[i].updateValueAndValidity();
        if (this.marketBuyForm[i].hasOwnProperty("errors")) {
          return;
        }
      }
    }

    this.tradingService.buy(this.coin, this.market, false, this.marketBuyForm.mbqty.value, null).then(response => {
      // console.log(response);
    });
  }

  submitMarketSell(): void {
    for (const i in this.marketSellForm) {
      if (this.marketSellForm.hasOwnProperty(i)) {
        this.marketSellForm[i].markAsDirty();
        this.marketSellForm[i].updateValueAndValidity();
        if (this.marketSellForm[i].hasOwnProperty("errors")) {
          return;
        }
      }
    }

    this.tradingService.sell(this.coin, this.market, false, this.marketSellForm.msqty.value, null).then(response => {
      // console.log(response);
    });
  }

  ngOnInit() {
    this.coinName = this.coin;
    this.marketName = this.market;

    this.marketBuy = this.fb.group({
      mbqty: ['', [Validators.required]],
      mbprice: ['']
    });
    this.marketSell = this.fb.group({
      msqty: ['', [Validators.required]],
      msprice: ['']
    });

    this.marketBuyForm.mbprice.disable();
    this.marketSellForm.msprice.disable();

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
    this.marketBuyForm.mbqty.setValue((this.amount / 100) * percent);
  }
  applySellAmount(percent) {
    this.marketSellForm.msqty.setValue((this.amount / 100) * percent);
  }
}
