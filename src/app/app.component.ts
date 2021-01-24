import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoveApp 0.3';
  chatVisible = false;

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event.rectangle.left, event.rectangle.right, event.edges.left);
  }

  receiveMessage($event) {
    console.dir($event)
    this.chatVisible = !this.chatVisible
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.setupUpdates();
    }
  }

  constructor(
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate) {
  }


  setupUpdates() {
    this.swUpdate.available.subscribe(u => {
      // Update wurde entdeckt

      // Update herunterladen
      this.swUpdate.activateUpdate().then(e => {
        // Update wurde heruntergeladen

        const message = 'Application has been updated';
        const action = 'Ok, Reload!';

        // Benutzer auf Update hinweisen und Seite neu laden
        this.snackBar.open(message, action).onAction().subscribe(
          () => location.reload()
        );
      });
    });

    // Auf Updates prüfen
    this.swUpdate.checkForUpdate();
  }
}
