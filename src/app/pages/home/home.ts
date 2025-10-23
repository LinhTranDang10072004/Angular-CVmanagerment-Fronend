import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentUser: any = null;
  private subscription: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Kiểm tra trạng thái đăng nhập ban đầu
    this.isLoggedIn = this.auth.isLoggedIn();
    this.currentUser = this.auth.getCurrentUser();

    // Theo dõi thay đổi trạng thái đăng nhập
    this.subscription.add(
      this.auth.isLoggedIn$.subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
        this.currentUser = this.auth.getCurrentUser();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // Phương thức để gọi API User và cập nhật thông tin
  getUser() {
    this.auth.getUser().subscribe({
      next: (userData) => {
        console.log('Thông tin user từ API:', userData);
        // Cập nhật thông tin user
        this.currentUser = userData;
        
        // Giữ nguyên token khi cập nhật thông tin user
        const existingUser = this.auth.getCurrentUser();
        const updatedUserData = {
          ...userData,
          token: existingUser?.token // Giữ nguyên token
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        
        // Navigate to profile page
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin user:', error);
        alert('Không thể lấy thông tin user từ server. Vui lòng thử lại sau.');
      }
    });
  }
}
