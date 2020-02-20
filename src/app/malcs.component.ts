import { Component } from '@angular/core';

@Component({
  selector: 'malcs-root',
  template: `<nav-bar></nav-bar>
            <router-outlet></router-outlet>`
})
export class MalcsComponent {
  title = 'ng-fundamentals1';
}
