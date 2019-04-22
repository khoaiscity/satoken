import {Component, OnInit, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "@services";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import { STChange, STColumn, STPage } from '@delon/abc';

@Component({
    selector: "ex-order-list-chart",
    templateUrl: "./order-list-chart.component.html",
    styleUrls: ["./order-list-chart.component.less"]
})

export class OrderListChartComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
                private orderService: OrderService) {
    }

    @Input() coin;
    @Input() market;
    @Input() price;

    coinMarket = "BTC";
    url = `/market`;

    buyOrderList: any[] = [];
    sellOrderList: any[] = [];
    buyMax = 0;
    sellMax = 0;

    ngOnInit() {
        // of(
        //     Array(10)
        //         .fill({})
        //         .map((item: any, idx: number) => {
        //             return {
        //                 price: 0.1234567,
        //                 amount: 12,
        //                 total: Math.ceil(Math.random() * 100) + 20
        //             };
        //         })
        // )
        //     .pipe(delay(500))
        //     .subscribe(res => {
        //         this.buyOrderList = res;
        //         this.buyMax = Math.max(...this.buyOrderList.map(o => o.total), 0);
        //
        //         console.log(this.buyMax);
        //     });
        //
        // of(
        //     Array(10)
        //         .fill({})
        //         .map((item: any, idx: number) => {
        //             return {
        //                 price: 0.1234567,
        //                 amount: 12,
        //                 total: Math.ceil(Math.random() * 100) + 20
        //             };
        //         })
        // )
        //     .pipe(delay(500))
        //     .subscribe(res => {
        //         this.sellOrderList = res;
        //
        //         this.sellMax = Math.max(...this.sellOrderList.map(o => o.total), 0);
        //         console.log(this.sellMax);
        //     });

        // Test
        // coin='BTC';
        // market='USD';

        this.orderService.getTradingOrder(this.coin, this.market).then(response => {
            this.buyOrderList = response['buy_order_data'];
            this.buyMax = Math.max(...this.buyOrderList.map(o => o.total), 0);

            this.sellOrderList = response['sell_order_data'];
            this.sellMax = Math.max(...this.sellOrderList.map(o => o.total), 0);
        });
    }

    getWithSell(value) {
        return (value / this.sellMax) * 100;
    }

    getWithBuy(value) {
        return (value / this.buyMax) * 100;
    }
}
