import { NgModule } from "@angular/core";

import { SharedModule } from "@shared";
import { RouteRoutingModule } from "./pages-routing.module";
// dashboard pages
import { DashboardComponent } from "./dashboard/dashboard.component";
// exchange pages
import { ExchangeComponent } from "./exchange/exchange.component";
import { CoinMarketComponent } from "./coin-market/coin-market.component";
// wallet pages
import { WalletComponent } from "./wallet/wallet.component";
// user pages
import { UserLoginComponent } from "./user/login/login.component";
import { UserRegisterComponent } from "./user/register/register.component";
import { UserRegisterResultComponent } from "./user/register-result/register-result.component";
// single pages
import { CallbackComponent } from "./callback/callback.component";
import { UserLockComponent } from "./user/lock/lock.component";
import { TransactionComponent } from './transaction/transaction.component';

const COMPONENTS = [
  DashboardComponent,
  // exchange pages
  ExchangeComponent,
  CoinMarketComponent,
  WalletComponent,
  TransactionComponent,
  // user pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class PagesModule {}
