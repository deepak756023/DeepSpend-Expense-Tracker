import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgetPasswordComponent } from './modules/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { CreatePwdComponent } from './modules/auth/create-pwd/create-pwd.component';
import { UserManagementComponent } from './modules/user-management/user-management/user-management.component';
import { ExpenseMgmtComponent } from './modules/expense-management/expense-mgmt/expense-mgmt.component';
import { ChartsComponent } from './modules/dashboard/charts/charts.component';
import { HomeComponent } from './modules/landing-page/home/home.component';
import { roleBasedAuthGuard } from './guards/role-based-auth.guard';
import { UnauthorizedComponent } from './modules/landing-page/unauthorized/unauthorized.component';
import { SessionExpiredComponent } from './modules/landing-page/session-expired/session-expired.component';
import { ProfileComponent } from './modules/landing-page/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user-mgmt',
        component: UserManagementComponent,
        canActivate: [roleBasedAuthGuard],
        data: { role: 'ADMIN' }
    },
    {
        path: 'expense-mgmt',
        component: ExpenseMgmtComponent,
        canActivate: [roleBasedAuthGuard],
        data: { role: 'USER' }
    },
    {
        path: 'charts',
        component: ChartsComponent,
        canActivate: [roleBasedAuthGuard],
        data: { role: 'USER' }
    },
    {
        path: 'my-profile',
        component: ProfileComponent,
        canActivate: [roleBasedAuthGuard],
        data: { role: 'USER' }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'create-password',
        component: CreatePwdComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: 'session-expired',
        component: SessionExpiredComponent

    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
