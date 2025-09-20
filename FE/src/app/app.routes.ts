import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgetPasswordComponent } from './modules/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { CreatePwdComponent } from './modules/auth/create-pwd/create-pwd.component';
import { TopbarComponent } from './modules/landing-page/topbar/topbar.component';
import { UserManagementComponent } from './modules/user-management/user-management/user-management.component';
import { ExpenseMgmtComponent } from './modules/expense-management/expense-mgmt/expense-mgmt.component';
import { ChartsComponent } from './modules/dashboard/charts/charts.component';
import { HomeComponent } from './modules/landing-page/home/home.component';
import { FooterComponent } from './modules/landing-page/footer/footer.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
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
        path: 'topbar',
        component: TopbarComponent
    },
    {
        path: 'user-mgmt',
        component: UserManagementComponent
    },
    {
        path: 'expense-mgmt',
        component: ExpenseMgmtComponent
    },
    {
        path: 'charts',
        component: ChartsComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'footer',
        component: FooterComponent
    }
]