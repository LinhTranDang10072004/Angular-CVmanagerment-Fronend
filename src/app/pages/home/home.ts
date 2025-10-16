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
        // Lưu vào localStorage để giữ thông tin mới nhất
        localStorage.setItem('user', JSON.stringify(userData));
        alert(`Xin chào ${userData.fullName || userData.username}! Thông tin đã được cập nhật từ server.`);
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin user:', error);
        alert('Không thể lấy thông tin user từ server. Vui lòng thử lại sau.');
      }
    });
  }
}
