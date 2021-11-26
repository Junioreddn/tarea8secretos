import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.page.html',
  styleUrls: ['./secrets.page.scss'],
})
export class SecretsPage implements OnInit {
  data: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('storage'));
  }
  getAudioContent(audio): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(audio);
}
}
