import { Component, OnInit, Input } from "@angular/core";
import { _HttpClient } from "@delon/theme";
import {ActivatedRoute, Router} from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import {OrderService} from "@services";

@Component({
  selector: "ex-last-order",
  templateUrl: "./last-order.component.html",
  styleUrls: ["./last-order.component.less"]
})
export class LastOrderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {}
  @Input() coin;
  @Input() market;

  coinMarket = "BTC";
  url = `/market`;

  lastOrderList: any[] = [];

  ngOnInit() {
    // of(
    //   Array(10)
    //     .fill({})
    //     .map((item: any, idx: number) => {
    //       return {
    //         coinLogo: "/assets/tmp/img/btc.png",
    //         name: `${this.coinMarket}/COIN ${idx + 1}`,
    //         isBuy: Math.ceil(Math.random() * 2) === 1 ? true : false,
    //         amount: 12.01234567,
    //         percent: Math.ceil(Math.random() * 100)
    //       };
    //     })
    // )
    //   .pipe(delay(500))
    //   .subscribe(res => {
    //     this.lastOrderList = res;
    //   });

    this.orderService.getOrderHistoryBuy(this.coin, this.market).then(response => {
      this.lastOrderList = response['data'];
      // console.log(response);
    });

    // this.http.get(`/market/${this.coinMarket}`).subscribe((res: any) => {
    //   this.coinList = res.data;
    // });
  }

  cancel() {

  }
}
