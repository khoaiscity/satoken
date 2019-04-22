import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { MockService } from '../providers/mock.service';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TradingService } from '@services';
import io from 'socket.io-client';

@Component({
  selector: 'ex-trading-view',
  templateUrl: './trading-view.component.html',
  styleUrls: ['./trading-view.component.less']
})
export class TradingViewComponent implements OnInit, OnDestroy {
  constructor(private tradingService: TradingService) {}
  @Input() coin;
  @Input() market;

  symbol;

  tradingview;

  ws;
  wsMessage = 'get data';

  historyGranularityMap = {
    1: 60,
    3: 180,
    5: 300,
    30: 30 * 60,
    60: 60 * 60,
    120: 60 * 60 * 2,
    240: 60 * 60 * 4,
    360: 60 * 60 * 6,
    D: 86400
  };

  fakeWebSocket() {
    const ws: any = {
      send() {},
      close() {}
    };

    setTimeout(() => {
      ws.onopen();
    }, 1e3);

    return ws;
  }

  ngOnInit() {
    this.symbol = `${this.coin}/${this.market}`;
    this.ws = this.fakeWebSocket();

    const socket = io.connect('https://socket.smartblock.pro', {
      secure: true
    });

    socket.on('connect', () => {
      // console.log('socket id', socket.id);
    });

    socket.on(
      'tradingview@' +
        `${this.coin.toLowerCase()}-${this.market.toLowerCase()}` +
        '-channel',
      message => {
        console.log(message);
      }
    );

    this.ws.onopen = () => {
      // console.log('connect success');
      this.drawTv();
    };
  }

  ngOnDestroy() {
    this.ws.close();
  }

  drawTv() {
    const that = this;

    this.tradingview = new (window as any).TradingView.widget({
      // debug: true, // uncomment this line to see Library errors and warnings in the console
      autosize: true,
      maxHeight: 400,
      fullscreen: true,
      symbol: that.symbol,
      interval: '30',
      container_id: 'ex-trading-chart',
      library_path: 'assets/scripts/charting_library/',
      locale: 'en',
      disabled_features: [
        // 'timeframes_toolbar',
        // 'go_to_date',
        // 'use_localstorage_for_settings',
        // 'volume_force_overlay',
        // 'show_interval_dialog_on_key_press',
        'symbol_search_hot_key',
        'study_dialog_search_control',
        'display_market_status',
        /*'header_compare',
        'header_symbol_search',
        'header_fullscreen_button',
        'header_settings',
        'header_chart_type',
        'header_resolutions',*/
        'control_bar',
        'edit_buttons_in_legend',
        'border_around_the_chart',
        'main_series_scale_menu',
        'star_some_intervals_by_default',
        'datasource_copypaste',
        'header_indicators',
        // 'context_menus',
        // 'compare_symbol',
        'header_undo_redo',
        'border_around_the_chart',
        'timezone_menu',
        'remove_library_container_border'
      ],
      allow_symbol_change: true,
      enabled_features: ['study_templates'],
      charts_storage_url: 'http://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      timezone: 'America/New_York',
      volumePaneSize: 'tiny',
      datafeed: {
        onReady(x) {
          timer(0)
            .pipe(
              tap(() => {
                x({
                  supported_resolutions: [
                    '1',
                    '3',
                    '5',
                    '30',
                    '60',
                    '120',
                    '240',
                    '360',
                    'D'
                  ]
                });
              })
            )
            .subscribe();
        },
        getBars(
          symbol,
          granularity,
          startTime,
          endTime,
          onResult,
          onError,
          isFirst
        ) {
          // console.log('getBars:', arguments);
          that.tradingService
            .getTradingView(that.coin, that.market)
            .then((data: any) => {
              // push the history data to callback
              // console.log(data);
              const tradingData = [];
              const tradingDataRes = JSON.parse(data.trading_view_data) || null;
              if (tradingDataRes) {
                for (let i = 0; i < tradingDataRes.t.length; i++) {
                  tradingData.push({
                    time: tradingDataRes.t[i],
                    open: tradingDataRes.o[i],
                    high: tradingDataRes.h[i],
                    low: tradingDataRes.l[i],
                    close: tradingDataRes.c[i],
                    volume: Math.floor(Math.random() * 10) + 3 //tradingDataRes.v[i]
                  });
                }
              }

              // console.log('tradingData', tradingData);

              onResult(tradingData);
            });
        },
        resolveSymbol(symbol, onResolve) {
          // console.log('resolveSymbol:', arguments);
          timer(1e3)
            .pipe(
              tap(() => {
                onResolve({
                  name: that.symbol,
                  full_name: that.symbol, // display on the chart
                  base_name: that.symbol,
                  // enable minute and others
                  has_intraday: true
                });
              })
            )
            .subscribe();
        },
        getServerTime() {
          // console.log('serverTime:', arguments);
        },
        subscribeBars(symbol, granularity, onTick) {
          // console.log('subscribe');
          // that.ws.onmessage = e => {
          //   try {
          //     const data = e;
          //     if (data) {
          //       // realtime data
          //       // data's timestamp === recent one ? Update the recent one : A new timestamp data
          //       // in this example mock service always returns a new timestamp(current time)
          //       console.log(data);
          //       onTick(data);
          //     }
          //   } catch (e) {
          //     console.error(e);
          //   }
          // };

          // // subscribe the realtime data
          // that.ws.send(that.wsMessage);

          const socket = io.connect('https://socket.smartblock.pro', {
            secure: true
          });

          socket.on('connect', () => {
            // console.log('socket id', socket.id);
          });

          socket.on(
            'tradingview@' +
              `${that.coin.toLowerCase()}-${that.market.toLowerCase()}` +
              '-channel',
            message => {
              console.log(message);
            }
          );
        },
        unsubscribeBars() {
          //that.ws.send('stop receiving data or just close websocket');
        }
      }
    });
  }
  // ngAfterViewInit() {
  //   let widget = new TradingView.widget({
  //     fullscreen: true,
  //     symbol: "AAPL",
  //     interval: "30",
  //     container_id: "ex-trading-chart",
  //     //	BEWARE: no trailing slash is expected in feed URL
  //     datafeed: new Datafeeds.UDFCompatibleDatafeed(
  //       "https://demo_feed.tradingview.com"
  //     ),
  //     library_path: "assets/scripts/charting_library/",
  //     locale: "en",
  //     theme: "Ligth", //"Dark",

  //     width: 980,
  //     height: 410,
  //     timezone: "Etc/UTC",
  //     style: "1",
  //     toolbar_bg: "rgba(204, 0, 0, 1)",
  //     enable_publishing: false,
  //     allow_symbol_change: true,
  //   });

  //   // var widget = new TradingView.widget({
  //   //   fullscreen: true,
  //   //   symbol: 'AAPL',
  //   //   interval: 'D',
  //   //   container_id: "ex-trading-chart",
  //   //   //	BEWARE: no trailing slash is expected in feed URL
  //   //   datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
  //   //   library_path: "assets/scripts/charting_library/",
  //   //   locale: "en",

  //   //   disabled_features: ["use_localstorage_for_settings"],
  //   //   preset: "mobile"
  //   // });
  //   // tslint:disable-next-line: no-unused-expression
  //   // new TradingView.widget({
  //   //   container_id: "ex-trading-chart",
  //   //   //autosize: true,
  //   //   fullscreen: true,
  //   //   //symbol: "AAPL",
  //   //   interval: "120",
  //   //   //timezone: "exchange",
  //   //   theme: "Ligth", //"Dark",
  //   //   //style: "1",
  //   //   //toolbar_bg: "#f1f3f6",
  //   //   withdateranges: true,
  //   //   hide_side_toolbar: true,
  //   //   allow_symbol_change: true,
  //   //   save_image: false,
  //   //   hideideas: true,
  //   //   studies: ["MASimple@tv-basicstudies"],
  //   //   charts_storage_api_version: "1.1",
  //   //   width: "100%",
  //   //   height: "400px",
  //   //   library_path: "/assets/scripts/charting_library/",
  //   //   datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
  //   //   // show_popup_button: true,
  //   //   // popup_width: "1000",
  //   //   // popup_height: "650"
  //   // });
  // }
}
