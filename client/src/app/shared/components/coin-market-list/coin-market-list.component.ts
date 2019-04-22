import {Component, OnInit, Input} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {Router} from "@angular/router";

import {STColumn, STChange, STPage} from "@delon/abc";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {ExchangeService} from "@services";

@Component({
    selector: "ex-coin-market-list",
    templateUrl: "./coin-market-list.component.html",
    styleUrls: ["./coin-market-list.component.less"]
})
export class CoinMarketListComponent implements OnInit {

    constructor(private http: _HttpClient,
                private router: Router,
                private exchangeService: ExchangeService) {
    }

    @Input()
    coinMarket = "";
    url = `/market`;

    coinList: any[] = [];

    page: STPage = {
        show: false
    };
    columns: STColumn[] = [
        {
            title: "Name",
            index: "label",
            width: "200px",
            click: (e: any) => this.router.navigate(["exchange/coin-market/acb"]),
            render: "name"
        },
        {
            title: "Price",
            index: "current_price",
            sort: {
                compare: (a, b) => a.price - b.price
            }
        },
        {
            title: "Changed 24h",
            index: "changed",
            render: "changed"
        }
    ];

    ngOnInit() {
        this.http.get(`api/market?to=${this.coinMarket}`).subscribe((res: any) => {
            this.coinList = res.data;
        });
    }

    change(e: STChange) {
        console.log(e);
    }
}
