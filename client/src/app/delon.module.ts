/**
 * Further import and refine the basic module
 * For module registration guidelines please refer to: https://github.com/ng-alain/ng-alain/issues/180
 */
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { throwIfAlreadyLoaded } from '@core';

import { AlainThemeModule, AlainThemeConfig } from '@delon/theme';

// #region mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { environment } from '@env/environment';
const MOCK_MODULES = !environment.production
  ? [DelonMockModule.forRoot({ data: MOCKDATA })]
  : [];
// #endregion

// #region reuse-tab
/**
 * If you need [Route Reuse] (https://ng-alain.com/components/reuse-tab) you need:
 * 1, increase `REUSETAB_PROVIDES`
 * 2, in `src/app/layouts/default/default.component.html` Modify:
 * ```html
 *  <section class="alain-default__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */
import { RouteReuseStrategy } from '@angular/router';
import { ReuseTabService, ReuseTabStrategy } from '@delon/abc/reuse-tab';
const REUSETAB_PROVIDES = [
  // {
  //   provide: RouteReuseStrategy,
  //   useClass: ReuseTabStrategy,
  //   deps: [ReuseTabService],
  // },
];
// #endregion

// #region global config functions

import { PageHeaderConfig } from '@delon/abc';
export function fnPageHeaderConfig(): PageHeaderConfig {
  return {
    ...new PageHeaderConfig(),
    ...({ homeI18n: 'home' } as PageHeaderConfig)
  };
}

import { DelonAuthConfig } from '@delon/auth';
export function fnDelonAuthConfig(): DelonAuthConfig {
  return {
    ...new DelonAuthConfig(),
    ...({ login_url: '/user/login' } as DelonAuthConfig)
  };
}

import { STConfig } from '@delon/abc';
export function fnSTConfig(): STConfig {
  return {
    ...new STConfig(),
    ...({
      modal: { size: 'lg' }
    } as STConfig)
  };
}

export function fnAlainThemeConfig(): AlainThemeConfig {
  return {
    ...new AlainThemeConfig(),
    ...({
      http: {
        nullValueHandling: 'ignore'
      }
    } as AlainThemeConfig)
  };
}

const GLOBAL_CONFIG_PROVIDES = [
  // TIPS: @delon/abc has a lot of global configuration information, such as setting the page number of all `st` to default to `20`
  { provide: STConfig, useFactory: fnSTConfig },
  { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
  { provide: AlainThemeConfig, useFactory: fnAlainThemeConfig },
  { provide: DelonAuthConfig, useFactory: fnDelonAuthConfig }
];

// #endregion

@NgModule({
  imports: [AlainThemeModule.forRoot(), ...MOCK_MODULES]
})
export class DelonModule {
  constructor(@Optional() @SkipSelf() parentModule: DelonModule) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [...REUSETAB_PROVIDES, ...GLOBAL_CONFIG_PROVIDES]
    };
  }
}
