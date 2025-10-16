import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://localhost:7217/api/Auth'; 
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }
  
  register(data: { username: string; email: string; password: string; fullName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.checkLoginStatus();
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private checkLoginStatus(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  // Phương thức để gọi API User
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl.replace('/Auth', '/User')}`);
  }
}
