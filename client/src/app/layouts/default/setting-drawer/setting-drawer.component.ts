import {
  Component,
  ChangeDetectionStrategy,
  NgZone,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { LazyService, copy, deepCopy } from '@delon/util';
import { SettingsService } from '@delon/theme';

const ALAINDEFAULTVAR = 'alain-default-vars';
const DEFAULT_COLORS = [
  {
    key: 'dust',
    color: '#F5222D',
  },
  {
    key: 'volcano',
    color: '#FA541C',
  },
  {
    key: 'sunset',
    color: '#FAAD14',
  },
  {
    key: 'cyan',
    color: '#13C2C2',
  },
  {
    key: 'green',
    color: '#52C41A',
  },
  {
    key: 'daybreak',
    color: '#1890ff',
  },
  {
    key: 'geekblue',
    color: '#2F54EB',
  },
  {
    key: 'purple',
    color: '#722ED1',
  },
];
const DEFAULT_VARS = {
    'primary-color': { label: 'main color', type: 'color', default: '#1890ff' },
    'alain-default-header-hg': {
      label: 'high',
      type: 'px',
      default: '64px',
      max: 300,
      min: 24,
    },
    'alain-default-header-bg': {
      label: 'background color',
      type: 'color',
      default: '@primary-color',
      Tip: 'Default with the main color system',
    },
    'alain-default-header-padding': {
      label: 'top left and right padding',
      type: 'px',
      default: '16px',
    },
    // Sidebar
    'alain-default-aside-wd': { label: 'width', type: 'px', default: '200px' },
    'alain-default-aside-bg': {
      label: 'background',
      type: 'color',
      default: '#ffffff',
    },
    'alain-default-aside-collapsed-wd': {
      label: 'shrink width',
      type: 'px',
      default: '64px',
    },
    'alain-default-aside-nav-padding-top-bottom': {
      label: 'items up and down padding',
      type: 'px',
      default: '8px',
      step: 8,
    },
    // main menu
    'alain-default-aside-nav-fs': {
      label: 'menu font size',
      type: 'px',
      default: '14px',
      min: 14,
      max: 30,
    },
    'alain-default-aside-collapsed-nav-fs': {
      label: 'shrink menu font size',
      type: 'px',
      default: '24px',
      min: 24,
      max: 32,
    },
    'alain-default-aside-nav-item-height': {
      label: 'menu item height',
      type: 'px',
      default: '38px',
      min: 24,
      max: 64,
    },
    'alain-default-aside-nav-text-color': {
      label: 'menu text color',
      type: 'color',
      default: 'rgba(0, 0, 0, 0.65)',
      Rgba: true,
    },
    'alain-default-aside-nav-text-hover-color': {
      label: 'menu text hover color',
      type: 'color',
      default: '@primary-color',
      Tip: 'Default with the main color system',
    },
    'alain-default-aside-nav-group-text-color': {
      label: 'menu group text color',
      type: 'color',
      default: 'rgba(0, 0, 0, 0.43)',
      Rgba: true,
    },
    'alain-default-aside-nav-selected-text-color': {
      label: 'the text color when the menu is activated',
      type: 'color',
      default: '@primary-color',
      Tip: 'Default with the main color system',
    },
    'alain-default-aside-nav-selected-bg': {
      label: 'the background color when the menu is activated',
      type: 'color',
      default: '#fcfcfc',
    },
    // content
    'alain-default-content-bg': {
      label: 'background color',
      type: 'color',
      default: '#f5f7fa',
    },
    'alain-default-content-heading-bg': {
      label: 'title background color',
      type: 'color',
      default: '#fafbfc',
    },
    'alain-default-content-heading-border': {
      label: 'the bottom border color of the title',
      type: 'color',
      default: '#efe3e5',
    },
    'alain-default-content-padding': {
      label: 'inseal',
      type: 'px',
      default: '24px',
      min: 0,
      max: 128,
      step: 8,
    },
    // zorro component fix
    'form-state-visual-feedback-enabled': {
      label: 'open visual feedback of form elements',
      type: 'switch',
      default: true,
    },
    'preserve-white-spaces-enabled': {
      label: 'open preserveWhitespaces',
      type: 'switch',
      default: true,
    },
    'nz-table-img-radius': {
      label: 'in the table: picture fillet',
      type: 'px',
      default: '4px',
      min: 0,
      max: 128,
    },
    'nz-table-img-margin-right': {
      label: 'in the table: the right margin of the picture',
      type: 'px',
      default: '4px',
      min: 0,
      max: 128,
    },
    'nz-table-img-max-width': {
      label: 'in the table: maximum width of the picture',
      type: 'px',
      default: '32px',
      min: 8,
      max: 128,
    },
    'nz-table-img-max-height': {
      label: 'in the table: the maximum height of the picture',
      type: 'px',
      default: '32px',
      min: 8,
      max: 128,
    },
  };

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'setting-drawer',
  templateUrl: './setting-drawer.component.html',
  host: {
    '[class.setting-drawer]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingDrawerComponent {
  private loadedLess = false;

  collapse = false;
  get layout() {
    return this.settingSrv.layout;
  }
  data: any = {};
  color: string;
  colors = DEFAULT_COLORS;

  constructor(
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    private settingSrv: SettingsService,
    private lazy: LazyService,
    private zone: NgZone,
    @Inject(DOCUMENT) private doc: any,
  ) {
    this.color = this.cachedData['@primary-color'] || this.DEFAULT_PRIMARY;
    this.resetData(this.cachedData, false);
  }

  private get cachedData() {
    return this.settingSrv.layout[ALAINDEFAULTVAR] || {};
  }

  private get DEFAULT_PRIMARY() {
    return DEFAULT_VARS['primary-color'].default;
  }

  private loadLess(): Promise<void> {
    if (this.loadedLess) return Promise.resolve();
    return this.lazy
      .loadStyle('./assets/alain-default.less', 'stylesheet/less')
      .then(() => {
        const lessConfigNode = this.doc.createElement('script');
        lessConfigNode.innerHTML = `
          window.less = {
            async: true,
            env: 'production',
            javascriptEnabled: true
          };
        `;
        this.doc.body.appendChild(lessConfigNode);
      })
      .then(() =>
        this.lazy.loadScript(
          'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js',
        ),
      )
      .then(() => {
        this.loadedLess = true;
      });
  }

  private genVars() {
    const { data, color, validKeys } = this;
    const vars: any = {
      [`@primary-color`]: color,
    };
    validKeys
      .filter(key => key !== 'primary-color')
      .forEach(key => (vars[`@${key}`] = data[key].value));
    this.setLayout(ALAINDEFAULTVAR, vars);
    return vars;
  }

  private runLess() {
    const { zone, msg, cdr } = this;
    const msgId = msg.loading(`Compiling the theme!`, { nzDuration: 0 }).messageId;
    setTimeout(() => {
      zone.runOutsideAngular(() => {
        this.loadLess().then(() => {
          (window as any).less.modifyVars(this.genVars()).then(() => {
            msg.success('Success');
            msg.remove(msgId);
            zone.run(() => cdr.detectChanges());
          });
        });
      });
    }, 200);
  }

  toggle() {
    this.collapse = !this.collapse;
  }

  changeColor(color: string) {
    this.color = color;
    Object.keys(DEFAULT_VARS)
      .filter(key => DEFAULT_VARS[key].default === '@primary-color')
      .forEach(key => delete this.cachedData[`@${key}`]);
    this.resetData(this.cachedData, false);
  }

  setLayout(name: string, value: any) {
    this.settingSrv.setLayout(name, value);
  }

  private resetData(nowData?: Object, run = true) {
    nowData = nowData || {};
    const data = deepCopy(DEFAULT_VARS);
    Object.keys(data).forEach(key => {
      const value = nowData[`@${key}`] || data[key].default || '';
      data[key].value = value === `@primary-color` ? this.color : value;
    });
    this.data = data;
    if (run) {
      this.cdr.detectChanges();
      this.runLess();
    }
  }

  private get validKeys(): string[] {
    return Object.keys(this.data).filter(
      key => this.data[key].value !== this.data[key].default,
    );
  }

  apply() {
    this.runLess();
  }

  reset() {
    this.color = this.DEFAULT_PRIMARY;
    this.settingSrv.setLayout(ALAINDEFAULTVAR, {});
    this.resetData({});
  }

  copyVar() {
    const vars = this.genVars();
    const copyContent = Object.keys(vars)
      .map(key => `${key}: ${vars[key]};`)
      .join('\n');
    copy(copyContent);
    this.msg.success('Copy success');
  }
}
