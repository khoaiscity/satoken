import { Component, OnInit } from "@angular/core";
import { _HttpClient } from "@delon/theme";

import { STColumn, STChange } from "@delon/abc";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { format } from "date-fns";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit {
  constructor(private http: _HttpClient) {}

  users: any[] = [];
  columns: STColumn[] = [
    {
      title: "Sort",
      type: "img",
      width: "50px",
      index: "coinLogo"
    },
    {
      title: "Name",
      index: "name",
      sort: {
        compare: (a, b) => a.name.length - b.name.length
      }
    },
    {
      title: "Price (USD)",
      index: "price",
      sort: {
        compare: (a, b) => a.price - b.price
      }
    },
    {
      title: "% Change",
      index: "change",
      sort: {
        compare: (a, b) => a.change - b.change
      }
    },
    {
      title: "Volume (USD)",
      index: "volume",
      sort: {
        compare: (a, b) => a.volume - b.volume
      }
    },
    {
      title: "Market Cap (USD)",
      index: "marketCap",
      sort: {
        compare: (a, b) => a.marketCap - b.marketCap
      }
    },
    {
      title: "Chart",
      index: "chartData",
      width: "180px",
      render: "custom"
    }
  ];

  ngOnInit() {
    const createChartData = () => {
      const chartData: any[] = [];
      for (let i = 0; i < 20; i += 1) {
        const beginDay = new Date().getTime();
        chartData.push({
          x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), "YYYY-MM-DD"),
          y: Math.floor(Math.random() * 100) + 10
        });
      }

      console.log(chartData);
      return chartData;
    };

    of(
      Array(100)
        .fill({})
        .map((item: any, idx: number) => {
          return {
            id: idx + 1,
            coinLogo: "/assets/tmp/img/btc.png",
            name: `COIN ${idx + 1}`,
            price: Math.ceil(Math.random() * 10) + 20,
            change: Math.floor(Math.random() * 100),
            volume: Math.ceil(Math.random() * 1000) + 20,
            marketCap: Math.ceil(Math.random() * 1000000) + 10000,
            chartData: createChartData()
          };
        })
    )
      .pipe(delay(500))
      .subscribe(res => (this.users = res));
  }

  change(e: STChange) {
    console.log(e);
  }
}
