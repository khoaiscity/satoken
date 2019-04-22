import { Injectable, Injector, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { zip } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  MenuService,
  SettingsService,
  TitleService,
  ALAIN_I18N_TOKEN
} from "@delon/theme";
import { DA_SERVICE_TOKEN, ITokenService } from "@delon/auth";
import { ACLService } from "@delon/acl";
import { TranslateService } from "@ngx-translate/core";
import { I18NService } from "../i18n/i18n.service";

import { NzIconService } from "ng-zorro-antd";
import { ICONS_AUTO } from "../../../style-icons-auto";
import { ICONS, CUSTOM_ICONS } from "../../../style-icons";

@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS, ...CUSTOM_ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`),
      this.httpClient.get("assets/tmp/app-data.json")
    )
      .pipe(
        catchError(([langData, appData]) => {
          resolve(null);
          return [langData, appData];
        })
      )
      .subscribe(
        ([langData, appData]) => {
          this.translate.setTranslation(this.i18n.defaultLang, langData);
          this.translate.setDefaultLang(this.i18n.defaultLang);

          // application data
          const res: any = appData;
          this.settingService.setApp(res.app);
          this.settingService.setUser(res.user);
          this.aclService.setFull(true);
          this.menuService.add(res.menu);
          this.titleService.suffix = res.app.name;
        },
        () => {},
        () => {
          resolve(null);
        }
      );
  }

  private viaMockI18n(resolve: any, reject: any) {
    this.httpClient
      .get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`)
      .subscribe(langData => {
        this.translate.setTranslation(this.i18n.defaultLang, langData);
        this.translate.setDefaultLang(this.i18n.defaultLang);

        this.viaMock(resolve, reject);
      });
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/user/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro admin panel front-end framework`
    };
    const user: any = {
      name: "Admin",
      avatar: "./assets/tmp/img/avatar.jpg",
      email: "cipchk@qq.com",
      token: "123456789"
    };
    this.settingService.setApp(app);
    this.settingService.setUser(user);
    this.aclService.setFull(true);
    this.menuService.add([
      {
        text: "Primary navigation",
        group: false,
        children: [
          {
            text: "Exchange",
            link: "/exchange",
            icon: { type: "icon", value: "exchange" }
          },
          {
            text: "Wallet",
            link: "/wallet",
            icon: { type: "icon", value: "wallet" }
          },
          {
            text: "Transaction",
            link: "/transaction",
            icon: { type: "icon", value: "transaction" }
          },
          {
            text: "Favorite",
            icon: { type: "icon", value: "farorite" },
            shortcutRoot: true
          },
          {
            text: "Media",
            icon: { type: "icon", value: "media" },
            shortcutRoot: true
          }
        ]
      }
    ]);

    // this.menuService.add([
    //   {
    //     text: 'Exchange',
    //     link: '/dashboard',
    //     icon: { type: 'icon', value: 'exchange' }
    //   },
    //   {
    //     text: 'Shortcut menu',
    //     icon: { type: 'icon', value: 'rocket' },
    //     shortcutRoot: true
    //   }
    // ]);

    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：Don't use it in a production environment, viaMock is just to simulate some data to make the scaffold work properly at first.
      this.viaMockI18n(resolve, reject);
    });
  }
}
