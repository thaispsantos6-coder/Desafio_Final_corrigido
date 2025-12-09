import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TermsComponent } from './pages/terms/terms.component';
import { LgpdComponent } from './pages/lgpd/lgpd.component';

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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: RegisterComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'lgpd',
    component: LgpdComponent
  }
];
