import { Component} from "@angular/core";
@Component({
  selector: "ex-coin-market-group",
  templateUrl: "./coin-market-group.component.html",
  styleUrls: ["./coin-market-group.component.less"]
})
export class CoinMarketGroupComponent {
  marketList = ["BTC", "ETH", "USD", "PAC"];

  constructor() {}
}
