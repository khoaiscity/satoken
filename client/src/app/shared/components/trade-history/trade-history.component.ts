import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TradingService } from '@services';
import { STChange, STColumn, STPage } from '@delon/abc';

@Component({
  selector: 'ex-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.less']
})
export class TradeHistoryComponent implements OnInit {

  isLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tradingService: TradingService
  ) {}

  @Input() coin;
  @Input() market;
  coinMarket = 'BTC';
  url = `/market`;

  columns: STColumn[] = [
    {
      title: "Date/Time",
      index: "label",
      width: "180px",
      // click: (e: any) => this.router.navigate(["exchange/coin-market/acb"]),
      render: "datetime"
    },
    {
      title: "Price",
      // index: "current_price",
      // sort: {
      //   compare: (a, b) => a.price - b.price
      // }
      render: "price",
      renderTitle: 'customTitlePrice',
    },
    {
      title: "Quantity",
      index: "quantity",
      render: "quantity",
      renderTitle: 'customTitleQuantity',
      // render: "changed"
    }
  ];
  page: STPage = {
    show: false
  };
  tradeHistoryList: any[] = [];

  ngOnInit() {
    this.tradingService.getTrading(this.coin, this.market).then(response => {
      this.tradeHistoryList = response['data'];
      this.isLoaded = true;
    });
  }

  change(e: STChange) {
    // console.log(e);
  }
}
