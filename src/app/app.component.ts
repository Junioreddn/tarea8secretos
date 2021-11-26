import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Secrets', url: '/secrets', icon: 'document-lock' },

  ];
  public labels = ['Jose Claudio Oleaga', '2019-8670', 'joseoleaga005@gmail.com', 'Software Developer',];
  constructor() {}
}
