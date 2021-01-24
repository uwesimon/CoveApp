import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  emailCount: number = 10
  chatCount: number = 5
  newsCount: number = 1
  popoverValue: number = 0
  result: string = '';

  ngOnInit(){
  }
  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }

  toggleChat() {
    this.chatCount = 0
    this.messageEvent.emit("toggleChat")
  }
}
