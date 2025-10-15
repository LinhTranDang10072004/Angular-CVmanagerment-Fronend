import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
// import { RouterLink } from "../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: res => {
        const user = res?.user ?? res;
        const role = String(user?.role ?? user?.roles?.[0] ?? '').toLowerCase();
        localStorage.setItem('user', JSON.stringify(user));

        // 👉 Chuyển hướng theo vai trò
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        this.error = err?.error?.message ?? 'Đăng nhập thất bại';
      }
    });
  }


}
