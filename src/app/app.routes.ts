import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
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
];
