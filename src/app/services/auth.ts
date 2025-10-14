import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://localhost:7217/api/Auth'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }
   register(data: { username: string; email: string; password: string; fullName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
