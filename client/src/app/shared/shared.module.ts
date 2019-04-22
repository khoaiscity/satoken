import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
// delon
import { AlainThemeModule } from "@delon/theme";
import { DelonABCModule } from "@delon/abc";
import { DelonACLModule } from "@delon/acl";
import { DelonFormModule } from "@delon/form";
import { DelonChartModule } from "@delon/chart";
// i18n
import { TranslateModule } from "@ngx-translate/core";

// #region third libs
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CountdownModule } from "ngx-countdown";
const THIRDMODULES = [NgZorroAntdModule, CountdownModule];
// #endregion

// #region components
import {
  DepositComponent,
  WithdrawalComponent,
  CoinMarketGroupComponent,
  CoinMarketListComponent,
  OrderListChartComponent,
  TradeHistoryComponent,
  LastOrderComponent,
  LimitOrderComponent,
  MarketOrderComponent,
  TradingViewComponent
} from './components';
import { NumberDirective
} from './directives';
// #endregion

// #region your componets & directives
const COMPONENTS = [
  DepositComponent,
  WithdrawalComponent,
  CoinMarketGroupComponent,
  CoinMarketListComponent,
  OrderListChartComponent,
  TradeHistoryComponent,
  LastOrderComponent,
  LimitOrderComponent,
  MarketOrderComponent,
  TradingViewComponent
];

const ENTRY_COMPONENTS = [DepositComponent, WithdrawalComponent];
const DIRECTIVES = [
  NumberDirective
];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    DelonChartModule,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    DelonChartModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  entryComponents: [ENTRY_COMPONENTS]
})
export class SharedModule {}
