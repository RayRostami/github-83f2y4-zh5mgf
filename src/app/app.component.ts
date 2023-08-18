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
      secret: 'rx9DlV3_inw.UicKny46K5StB2PAd9dChu1i5AQ6q7OQgV7zXSESaOI',
      webSocket: false,
    });
    console.log('init');

    window.WebChat.renderWebChat(
      {
        directLine: directLine,
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
