import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import 'zone.js'; // 👈 bắt buộc cho Angular change detection


// nếu có route thì import thêm
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),   // 👈 bắt buộc để dùng HttpClient
    provideRouter(routes)  // 👈 nếu bạn có routes
  ]
});
