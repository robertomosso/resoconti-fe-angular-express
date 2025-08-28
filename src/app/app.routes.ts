import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { startupRedirectGuard } from './shared/guards/startup-redirect.guard';
import { registerSuperuserGuard } from './shared/guards/register-superuser.guard';
import { loginGuard } from './shared/guards/login.guard';
import { authGuard } from './shared/guards/auth.guard';
import { onlySuperuserAdminGuard } from './shared/guards/only-superuser-admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [startupRedirectGuard]
    },
    {
        // raggiungibile solo se user table con almeno uno user
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        // raggiungibile solo se user table vuota
        path: 'register-superuser',
        loadComponent: () => import('./features/register-superuser/register-superuser.component').then(m => m.RegisterSuperuserComponent),
        canActivate: [registerSuperuserGuard]
    },
    {
        // raggiungibile solo da user con ruolo superuser/admin
        path: 'register',
        loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
        canActivate: [onlySuperuserAdminGuard]
    },
    {
        path: 'change-password',
        loadComponent: () => import('./features/change-password/change-password.component').then(m => m.ChangePasswordComponent),
        canActivate: [authGuard]
    },
    {
        path: 'inserimento-resoconto',
        loadComponent: () => import('./features/inserimento-resoconto/inserimento-resoconto.component').then(m => m.InserimentoResocontoComponent),
        canActivate: [authGuard]
    },
    {
        path: 'visualizza-resoconti',
        loadComponent: () => import('./features/visualizza-resoconti/visualizza-resoconti.component').then(m => m.VisualizzaResocontiComponent),
        canActivate: [authGuard, onlySuperuserAdminGuard]
    },
];
