import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [AdminDashboardComponent, ManageUsersComponent]
})
export class AdminModule {}


