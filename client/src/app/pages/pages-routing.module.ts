import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layouts/default/default.component';
// import { LayoutFullScreenComponent } from "../layouts/fullscreen/fullscreen.component";
import { LayoutPassportComponent } from '../layouts/user/user.component';
// dashboard pages
// import { DashboardComponent } from "./dashboard/dashboard.component";
// exchange pages
import { ExchangeComponent } from './exchange/exchange.component';
import { CoinMarketComponent } from './coin-market/coin-market.component';
// wallet pages
import { WalletComponent } from './wallet/wallet.component';
// transaction pages
import { TransactionComponent } from './transaction/transaction.component';
// import { CoinMarketComponent } from "./coin-market/coin-market.component";
// user pages
import { UserLoginComponent } from './user/login/login.component';
import { UserRegisterComponent } from './user/register/register.component';
import { UserRegisterResultComponent } from './user/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './user/lock/lock.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'exchange', pathMatch: 'full' },
      {
        path: 'exchange',
        component: ExchangeComponent,
        data: { title: 'Exchange Page' }
      },
      {
        path: 'wallet',
        component: WalletComponent,
        data: { title: 'Wallet Page' }
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        data: { title: 'Transaction Page' }
      },
      {
        path: 'exchange/coin-market/:coin/:market',
        component: CoinMarketComponent,
        data: { title: 'Coin Market' }
      },
      {
        path: 'exception',
        loadChildren: './exception/exception.module#ExceptionModule'
      }
      // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
    ]
  },
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // user
  {
    path: 'user',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: 'Log in' }
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: 'Register' }
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: 'Registration result' }
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: 'Lock screen' }
      }
    ]
  },
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
