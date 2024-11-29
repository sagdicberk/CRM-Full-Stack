import { Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { HomeComponent } from './components/Layout/home/home.component';
import { authGuard } from './config/auth.guard';
import { ProfileComponent } from './components/pages/profile/profile.component'; // Import ProfileComponent
import { CompanyComponent } from './components/pages/company/company.component';
import { CreateCompanyComponent } from './components/pages/company/create-company/create-company.component';
import { UpdateCompanyComponent } from './components/pages/company/update-company/update-company.component';
import { DeleteCompanyComponent } from './components/pages/company/delete-company/delete-company.component';
import { CustomerComponent } from './components/pages/customer/customer.component';
import { CreateCustomerComponent } from './components/pages/customer/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/pages/customer/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './components/pages/customer/delete-customer/delete-customer.component';
import { EmployessComponent } from './components/pages/employess/employess.component';
import { DeleteEmployessComponent } from './components/pages/employess/delete-employess/delete-employess.component';
import { UpdateEmployessComponent } from './components/pages/employess/update-employess/update-employess.component';
import { OpportunityComponent } from './components/pages/opportunity/opportunity.component';
import { CreateOpportunityComponent } from './components/pages/opportunity/create-opportunity/create-opportunity.component';
import { DeleteOpportunityComponent } from './components/pages/opportunity/delete-opportunity/delete-opportunity.component';
import { UpdateOpportunityComponent } from './components/pages/opportunity/update-opportunity/update-opportunity.component';
import { TasksComponent } from './components/pages/tasks/tasks.component';
import { CreateTaskComponent } from './components/pages/tasks/create-task/create-task.component';
import { DeleteTaskComponent } from './components/pages/tasks/delete-task/delete-task.component';
import { UpdateTaskComponent } from './components/pages/tasks/update-task/update-task.component';
import { StatsComponent } from './components/pages/stats/stats.component';
import { adminGuard } from './config/admin.guard';
import { DetailComponent } from './components/pages/profile/detail/detail.component';

export const routes: Routes = [
  // Redirect to login if no path matches
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  // Authentication routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Home route with authentication guards and default profile component
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], // Protect the home route
    canActivateChild: [authGuard], // Protect child routes of home
    children: [
      // Profile page as the default child component
      { path: '', component: ProfileComponent },

      // Company routes
      { path: 'companies', component: CompanyComponent },
      { path: 'companies/create', component: CreateCompanyComponent },
      { path: 'companies/update/:id', component: UpdateCompanyComponent },
      { path: 'companies/delete/:id', component: DeleteCompanyComponent },

      // Customer routes
      { path: 'customers', component: CustomerComponent },
      { path: 'customers/create', component: CreateCustomerComponent },
      { path: 'customers/update/:id', component: UpdateCustomerComponent },
      { path: 'customers/delete/:id', component: DeleteCustomerComponent },

      // Employee routes
      {
        path: 'employees',
        component: EmployessComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'employees/update/:id',
        component: UpdateEmployessComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'employees/delete/:id',
        component: DeleteEmployessComponent,
        canActivate: [adminGuard],
      },

      // Opportunity routes
      { path: 'opportunities', component: OpportunityComponent },
      { path: 'opportunities/create', component: CreateOpportunityComponent },
      {
        path: 'opportunities/update/:id',
        component: UpdateOpportunityComponent,
      },
      {
        path: 'opportunities/delete/:id',
        component: DeleteOpportunityComponent,
      },

      // Task routes -- Admin
      { path: 'tasks', component: TasksComponent, canActivate: [adminGuard] },
      {
        path: 'tasks/create',
        component: CreateTaskComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'tasks/update/:id',
        component: UpdateTaskComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'tasks/delete/:id',
        component: DeleteTaskComponent,
        canActivate: [adminGuard],
      },
      {
        path:'task-detail/:id',
        component: DetailComponent
      },

      // Stats
      { path: 'stats', component: StatsComponent, canActivate: [adminGuard] },
    ],
  },
];
