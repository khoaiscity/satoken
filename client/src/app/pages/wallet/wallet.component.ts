import { Component, OnInit } from "@angular/core";
import { _HttpClient } from "@delon/theme";
import { Router } from "@angular/router";

import { STColumn, STChange } from "@delon/abc";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { format } from "date-fns";

import { DepositComponent, WithdrawalComponent } from "@shared";
import { WalletService } from '@services';

@Component({
  selector: "page-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.less"]
})

export class WalletComponent implements OnInit {

  constructor(private http: _HttpClient,
              private router: Router,
              private walletService: WalletService) {}

  users: any[] = [];
  columns: STColumn[] = [
    {
      title: "",
      type: "img",
      width: "50px",
      index: "image"
    },
    {
      title: "Name",
      index: "wallet_name",
      type: "link",
      click: (e: any) => this.router.navigate(["exchange/coin-market/acb"])
    },
    {
      title: "Available Balance",
      index: "available_balance"
    },
    {
      title: "Reserved",
      index: "reserved"
    },
    {
      title: "Deposit",
      width: "150px",
      buttons: [
        {
          text: "Deposit",
          type: "modal",
          modal: {
            component: DepositComponent,
            size: "md"
          },
          click: (record: any, modal: any) => alert("aaa")
        }
      ]
    },
    {
      title: "Withdrawal",
      width: "150px",
      buttons: [
        {
          text: "Withdrawal",
          type: "modal",
          modal: {
            component: WithdrawalComponent,
            size: "md"
          },
          click: (record: any, modal: any) => alert("aaa")
        }
      ]
    }
  ];

  ngOnInit() {
    // const createChartData = () => {
    //   const chartData: any[] = [];
    //   for (let i = 0; i < 20; i += 1) {
    //     const beginDay = new Date().getTime();
    //     chartData.push({
    //       x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), "YYYY-MM-DD"),
    //       y: Math.floor(Math.random() * 100) + 10
    //     });
    //   }
    //
    //   console.log(chartData);
    //   return chartData;
    // };
    //
    // of(
    //   Array(8)
    //     .fill({})
    //     .map((item: any, idx: number) => {
    //       return {
    //         id: idx + 1,
    //         image: "/assets/tmp/img/btc.png",
    //         wallet_name: `COIN ${idx + 1}`,
    //         available_balance: "EL6FLZ46QRQW7V4NBTXMAUXXM1NBTXMAUXX",
    //         balance: Math.ceil(Math.random() * 100000) + 9999,
    //         reserved: 0
    //       };
    //     })
    // )
    //   .pipe(delay(500))
    //   .subscribe(res => (this.users = res));

      this.walletService.getWallets().then(response => {
        this.users = response['data']
      });
  }

  change(e: STChange) {
    // console.log(e);
  }
}
