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
    const token = this.getToken();
    console.log('Token retrieved:', token ? 'Token exists' : 'No token'); // Debug log
    
    const headers: { [key: string]: string } = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set:', headers['Authorization']); // Debug log
    } else {
      console.warn('No token available for API call'); // Debug log
    }
    
    return this.http.get<any>(`${this.apiUrl.replace('/Auth', '/User')}`, { headers });
  }

  // Lấy token từ localStorage
  private getToken(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        console.log('User data from localStorage:', userData); // Debug log
        return userData.token || null;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    console.log('No user data in localStorage'); // Debug log
    return null;
  }
  
}
