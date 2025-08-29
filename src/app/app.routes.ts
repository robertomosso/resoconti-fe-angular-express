import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { loginGuard } from './shared/guards/login.guard';
import { authGuard } from './shared/guards/auth.guard';
import { onlyAdminGuard } from './shared/guards/only-admin.guard';

export const routes: Routes = [
    {
         path: '', 
         pathMatch: 'full', 
         redirectTo: 'login'
    },
    {
        // raggiungibile solo se user table con almeno uno user
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        // raggiungibile solo da user con ruolo admin oppure se la table user è ancora vuota (per registrare primo utente admin)
        path: 'register',
        loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
        canActivate: [onlyAdminGuard]
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
        canActivate: [authGuard, onlyAdminGuard]
    },
];
