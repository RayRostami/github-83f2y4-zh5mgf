import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

/**
 * Declares the WebChat property on the window object.
 */
declare global {
  interface Window {
    WebChat: any;
  }
}

window.WebChat = window.WebChat || {};

const styleOptions = {
  accent: '#5A5A5A',
  botAvatarImage: 'logo.svg',
  avatarBorderRadius: '0',
  avatarSize: 30,
  botAvatarInitials: 'BH',
  botAvatarBackgroundColor: '#1a475f',
  bubbleBackground: '#eeeded',
  bubbleBorderColor: '#eeeded',
  bubbleTextColor: 'black',
  bubbleBorderRadius: 14,
  bubbleBorderWidth: 1,
  bubbleNubSize: 0,
  bubbleNubOffset: 'bottom',
  bubbleFromUserBackground: '#1a475f',
  bubbleFromUserBorderColor: '#5A5A5A',
  bubbleFromUserTextColor: 'white',
  bubbleFromUserBorderRadius: 14,
  bubbleFromUserBorderWidth: 1,
  bubbleFromUserNubSize: 0,
  bubbleFromUserNubOffset: 'bottom',
  groupTimestamp: 3000,
  showAvatarInGroup: 'status',
  hideUploadButton: true,
  suggestedActionLayout: 'stacked',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('botWindow') botWindowElement: ElementRef;
  token: string;
  minimized: Boolean = true;
  loaded: Boolean = false;
  newMessage: Boolean = false;
  needLoad: boolean = true;
  public constructor() {
    this.token = 'hhh';
  }
  public ngOnInit(): void {}
  private loadChat() {
    const el = document.getElementById('botWindow');
    if (!el) return;
    const directLine = window.WebChat.createDirectLine({
      secret: 'NFJod-6Mx6k.c-kLNkn4V3oNeQTFPApqb_32mokGiTZj0zVnFf_HKnE',
      webSocket: false,
    });
    console.log('init');

    window.WebChat.renderWebChat(
      {
        directLine: directLine,
        styleOptions: styleOptions
      },
      el
    );

   
    directLine
      .postActivity({
        from: {
          // id: '202220232589909',
          // name: 'Rohi2020520202',
          // firstName: 'Bahar6663',
          // lastName: 'Ray',
          // clientId: '1',
          // clientName: 'Test',
        },
        name: 'StartChat',
        type: 'event',
      })
      .subscribe(
        (id) => console.log(`Posted activity, assigned ID ${id}`),
        (error) => console.log(`Error posting activity ${error}`)
      );
  }
  public handleMaximizeButtonClick(): void {
    this.loaded = true;
    this.minimized = false;
    this.newMessage = false;
    if (this.needLoad) {
      setTimeout(() => this.loadChat(), 200);
      this.needLoad = false;
    }
  }
  public handleMinimizeButtonClick(): void {
    this.minimized = true;
    this.newMessage = false;
  }
  public handleLoadButtonClick() {
    this.loadChat();
  }
}
