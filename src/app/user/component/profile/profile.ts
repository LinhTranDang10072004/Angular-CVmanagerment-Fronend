import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  userData: any = null;
  loading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.loading = true;
    this.error = null;
    
    // Kiểm tra token trước khi gọi API
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.token) {
      this.error = 'Không có token xác thực. Vui lòng đăng nhập lại.';
      this.loading = false;
      return;
    }
    
    this.authService.getUser().subscribe({
      next: (data) => {
        this.userData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        if (error.status === 401) {
          this.error = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        } else {
          this.error = 'Không thể tải thông tin người dùng';
        }
        this.loading = false;
      }
    });
  }

  goBack() {
    window.history.back();
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
