import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';

/**
 * 菜单通知
 */
@Component({
  selector: 'header-notify',
  template: `
  <notice-icon
    [data]="data"
    [count]="count"
    [loading]="loading"
    btnClass="alain-default__nav-item"
    btnIconClass="alain-default__nav-item-icon"
    (select)="select($event)"
    (clear)="clear($event)"
    (popoverVisibleChange)="loadData()"></notice-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderNotifyComponent {
  data: NoticeItem[] = [
    {
      title: 'Notification',
      list: [],
      emptyText: 'You have viewed all notifications',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
      clearText: 'Empty notification',
    },
    {
      title: 'Message',
      list: [],
      emptyText: 'You have read all the messages',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
      clearText: 'Clear message',
    },
    {
      title: 'To do',
      list: [],
      emptyText: 'You have completed all to do',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
      clearText: 'Empty to do',
    },
  ];

  // data: NoticeItem[] = [
  //   {
  //     title: 'Notification',
  //     list: [],
  //     emptyText: 'You have viewed all notifications',
  //     emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  //     clearText: 'Empty notification',
  //   },
  //   {
  //     title: 'Message',
  //     list: [],
  //     emptyText: 'You have read all the messages',
  //     emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
  //     clearText: 'Clear message',
  //   },
  //   {
  //     title: 'To do',
  //     list: [],
  //     emptyText: 'You have completed all to do',
  //     emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
  //     clearText: 'Empty to do',
  //   },
  // ];
  count = 5;
  loading = false;

  constructor(private msg: NzMessageService, private cdr: ChangeDetectorRef) { }

  private updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = { ...item };
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime, {
          locale: (window as any).__locale__,
        });
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type).list.push(newItem);
    });
    return data;
  }

  loadData() {
    if (this.loading) return;
    this.loading = true;
    setTimeout(() => {
      this.data = this.updateNoticeData([
        {
          id: '000000001',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          title: 'You have received 14 new weekly newspapers',
          Datetime: '2017-08-09',
          type: 'Notification',
        },
        {
          id: '000000002',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
          title: 'You recommended Trinity has passed the third round of interviews',
          Datetime: '2017-08-08',
          type: 'Notification',
        },
        {
          id: '000000003',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
          title: 'This template can distinguish between multiple notification types',
          Datetime: '2017-08-07',
          Read: true,
          type: 'Notification',
        },
        {
          id: '000000004',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
          title: 'The left icon is used to distinguish between different types',
          Datetime: '2017-08-07',
          type: 'Notification',
        },
        {
          id: '000000005',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          title: 'The content should not exceed two lines of words, automatically cut off when exceeded',
          Datetime: '2017-08-07',
          type: 'Notification',
        },
        {
          id: '000000006',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: 'Qu Lili commented on you',
          description: 'Description information description information description information',
          Datetime: '2017-08-07',
          type: 'Message',
        },
        {
          id: '000000007',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: 'Zhu right, replied to you',
          description: 'This template is used to remind people who have interacted with you, and put the avatar of `who` on the left side',
          Datetime: '2017-08-07',
          type: 'Message',
        },
        {
          id: '000000008',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: 'title',
          description: 'This template is used to remind people who have interacted with you, and put the avatar of `who` on the left side',
          Datetime: '2017-08-07',
          type: 'Message',
        },
        {
          id: '000000009',
          title: 'task name',
          description: 'The task needs to be started before 2017-01-12 20:00',
          extra: 'not started',
          status: 'todo',
          type: 'To do',
        },
        {
          id: '000000010',
          title: 'Third-party emergency code change',
          description:
            'Guanlin submitted on 2017-01-06, need to complete the code change task before 2017-01-07',
          extra: 'Immediately expired',
          status: 'urgent',
          type: 'To do',
        },
        {
          id: '000000011',
          title: 'Information Security Exam',
          description: 'Assigned to Zhuer to complete the update and release before 2017-01-09',
          extra: 'It has taken 8 days',
          status: 'doing',
          type: 'To do',
        },
        {
          id: '000000012',
          title: 'ABCD version release',
          description:
            'Guanlin submitted on 2017-01-06, need to complete the code change task before 2017-01-07',
          extra: 'in progress',
          status: 'processing',
          type: 'To do',
        },
      ]);
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  clear(type: string) {
    this.msg.success(`empts ${type}`);
  }

  select(res: any) {
    this.msg.success(`Clicked ${res.item.title}) for ${res.title}`);
  }
}
