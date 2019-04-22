import {Component, OnInit} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {Router} from "@angular/router";

import {STColumn, STChange} from "@delon/abc";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {format} from "date-fns";
import {ExchangeService} from "@services";

@Component({
    selector: "page-exchange",
    templateUrl: "./exchange.component.html",
    styleUrls: ["./exchange.component.less"]
})
export class ExchangeComponent implements OnInit {

    constructor(
        private router: Router,
        private exchangeService: ExchangeService) {
    }

    cryptos: any[] = [];
    columns: STColumn[] = [
        {
            index: "crypto_image",
            title: "Sort",
            type: "img",
            width: "50px"
        },
        {
            index: "label",
            title: "Name",
            type: "link",
            click: (e: any) => this.router.navigate([`exchange/coin-market/${e.crypto}/${e.base_currency}`]),
            // buttons: [
            //   {
            //     text: "coin",
            //     type: "link",
            //     click: (e: any) => this.router.navigate(["coin-market/acb"])
            //   }
            // ],
            sort: {
                compare: (a, b) => a.name.length - b.name.length
            }
        },
        {
            index: "current_price",
            title: "Price (USD)",
            sort: {
                compare: (a, b) => a.price - b.price
            }
        },
        {
            index: "changes",
            title: "% Change",
            sort: {
                compare: (a, b) => a.change - b.change
            },
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
            index: "market_cap",
            type: 'number',
            sort: {
                compare: (a, b) => a.marketCap - b.marketCap
            }
        },
        {
            index: "crypto_image_sparkline",
            title: "Chart",
            render: 'customCryptoImage',
            width: "180px"
        }
    ];

    ngOnInit() {
        if (localStorage.getItem("exchangeList")) {
            let exchangeList = JSON.parse(localStorage.getItem("exchangeList"));
            exchangeList.forEach(item => {
                item.crypto_image_sparkline = '/assets/tmp/img/chart_loading.png';
                item.market_cap = 0;
                item.volume = "---";
                item.changes = "---";
                item.current_price = "---";
            });
            this.cryptos = exchangeList;
        }

        this.exchangeService.getMarket(null, null).then(response => {
            this.cryptos = response['data'];

            let exchangeList: any[] = [];
            this.cryptos.forEach(item => {
                exchangeList.push({
                    crypto: item.crypto,
                    base_currency: item.base_currency,
                    crypto_image: item.crypto_image,
                    label: item.label,
                });
            });
            localStorage.setItem("exchangeList",  JSON.stringify(exchangeList));
        });
    }

    change(e: STChange) {
        // console.log(e);
    }
}
