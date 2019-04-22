import {Component, OnInit} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {Router} from "@angular/router";
import { DatePipe, formatDate } from "@angular/common"

import { STColumn, STChange, STPage, STReq, STRes } from "@delon/abc";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {format} from "date-fns";
import { ExchangeService, OrderService } from "@services";

@Component({
    selector: "page-transaction",
    templateUrl: "./transaction.component.html",
    styleUrls: ["./transaction.component.less"]
})

export class TransactionComponent implements OnInit {

    constructor(private orderService: OrderService,
                private exchangeService: ExchangeService,
                private datePile: DatePipe) {
        if (localStorage.getItem("exchangeList")) {
            let exchangeList = JSON.parse(localStorage.getItem("exchangeList"));
            this.selectedValue = `${exchangeList[0].crypto}-${exchangeList[0].base_currency}`;
            this.market = exchangeList[0].label;

            exchangeList.forEach(item => {
                this.marketList.push({
                    value: `${item.crypto}-${item.base_currency}`,
                    label: item.label,
                });
            });
        }
    }

    transactions;
    columns: STColumn[] = [
        {
            index: "trans_date",
            title: "Date",
            render: "date",
            width: "200px"
        },
        {
            index: "label",
            title: "Type",
            type: "link",
            render: "type"
            // click: (e: any) => this.router.navigate([`exchange/coin-market/${e.crypto}/${e.base_currency}`]),
            // buttons: [
            //   {
            //     text: "coin",
            //     type: "link",
            //     click: (e: any) => this.router.navigate(["coin-market/acb"])
            //   }
            // ],
            // sort: {
            //     compare: (a, b) => a.name.length - b.name.length
            // }
        },
        {
            index: "current_price",
            title: "Quantity",
            render: "quantity",
            // sort: {
            //     compare: (a, b) => a.price - b.price
            // }
        },
        {
            index: "changes",
            title: "Status",
            render: "status",
            // sort: {
            //     compare: (a, b) => a.change - b.change
            // },
        },
        {
            title: "Action",
            render: "action",
            index: "volume",
            // sort: {
            //     compare: (a, b) => a.volume - b.volume
            // }
        }
    ];

    page: STPage = {
        show: true
    };
    marketList: any[] = [];
    selectedValue = "ACM-BTC";
    market = '';
    fromDate;
    toDate;
    date_from;
    date_to;

    total;
    url = `api/order/history`;

    ngOnInit() {
        if (!localStorage.getItem("exchangeList")) {
            this.exchangeService.getMarket(null, null).then(response => {
                let cryptos = response['data'];
                this.marketList = [];

                cryptos.forEach(item => {
                    this.marketList.push({
                        value: `${item.crypto}-${item.base_currency}`,
                        label: item.label,
                    });
                });
                this.selectedValue = this.marketList[0].value;
                this.market = this.marketList[0].label;
            });
        }
    }

    req: STReq = {
        reName: {pi: "page", ps: "limit"},
        params: {market: this.selectedValue}
    };

    res: STRes = {
        reName: {total: "total_records", list: "data"}
    };

    loadOne() {
        this.marketList.forEach(item => {
            if (this.selectedValue == item.value) {
                this.market = item.label;
                return;
            }
        });
        this.date_from = this.datePile.transform(this.fromDate, 'yyyy-MM-dd HH:mm:ss');
        this.date_to = this.datePile.transform(this.toDate, 'yyyy-MM-dd HH:mm:ss');
    }

    change(e: STChange) {
        // console.log(e);
    }
}
