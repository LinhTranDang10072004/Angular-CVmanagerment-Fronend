import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminDashboardComponent } from './admin/components/dashboard/dashboard.component';
import { Home } from './pages/home/home';
import { Profile } from './user/component/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'profile', component: Profile },

  // Keep old login route for backward compatibility
  { path: 'login', redirectTo: '/auth/login', pathMatch: 'full' },
  {path : 'register' ,redirectTo : '/auth/register' ,pathMatch : 'full'},
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent }
    ]
    
  },
  {
    path: 'User',
    children: [
      { path: 'home', component: Home }
    ]
    
  }

];
