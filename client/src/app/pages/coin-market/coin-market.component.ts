import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { _HttpClient } from '@delon/theme';
import { Location } from '@angular/common';

import { STColumn, STChange } from '@delon/abc';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { format } from 'date-fns';
import { ExchangeService, OrderService, WalletService } from '@services';

@Component({
  selector: 'page-coin-market',
  templateUrl: './coin-market.component.html',
  styleUrls: ['./coin-market.component.less']
})
export class CoinMarketComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private exchangeService: ExchangeService,
    private walletService: WalletService,
    private orderService: OrderService
  ) {
    this.coin = this.activatedRoute.snapshot.paramMap.get('coin');
    this.market = this.activatedRoute.snapshot.paramMap.get('market');
    this.orderService.getPrice(this.coin, this.market).then(response => {
      this.price = response['data'].current_price;
    });
  }

  coin;
  market;
  amount;
  price = 0;

  cryptoName = '';
  cryptoImage = '';

  users: any[] = [];
  columns: STColumn[] = [
    {
      title: 'Sort',
      type: 'img',
      width: '50px',
      index: 'cryptoImage'
    },
    {
      title: 'Name',
      index: 'name',
      sort: {
        compare: (a, b) => a.name.length - b.name.length
      }
    },
    {
      title: 'Price (USD)',
      index: 'price',
      sort: {
        compare: (a, b) => a.price - b.price
      }
    },
    {
      title: '% Change',
      index: 'change',
      sort: {
        compare: (a, b) => a.change - b.change
      }
    },
    {
      title: 'Volume (USD)',
      index: 'volume',
      sort: {
        compare: (a, b) => a.volume - b.volume
      }
    },
    {
      title: 'Market Cap (USD)',
      index: 'marketCap',
      sort: {
        compare: (a, b) => a.marketCap - b.marketCap
      }
    },
    {
      title: 'Chart',
      index: 'chartData',
      width: '180px',
      render: 'custom'
    }
  ];

  ngOnInit() {
    if (localStorage.getItem('exchangeList')) {
      const exchangeList = JSON.parse(localStorage.getItem('exchangeList'));
      exchangeList.forEach(item => {
        if (item.base_currency === this.market && item.crypto === this.coin) {
          this.cryptoName = item.crypto + '/' + item.base_currency;
          this.cryptoImage = item.crypto_image;
          return;
        }
      });
    }

    if (this.cryptoName === '' && this.cryptoImage === '') {
      this.exchangeService.getMarket(this.coin, this.market).then((response: any) => {
        this.cryptoName = response.data[0].crypto;
        this.cryptoImage = response.data[0].crypto_image;
      });
    }

    this.walletService.getAmount(this.coin).then(response => {
      this.amount = response['data'].available_balance;
    });
  }

  backClicked() {
    this.location.back();
  }

  change(e: STChange) {
    console.log(e);
  }
}
