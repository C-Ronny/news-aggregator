import { Routes } from '@angular/router';

// Creates routes for hom and authentication navigation
import { HomeComponent } from  './home/home.component';
import { AuthComponent } from  './auth/auth.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home'},
  { path: 'login', component: AuthComponent, title: 'Login'},
  { path: 'signup', component: AuthComponent, title: 'Signup'},
  { path: '**', redirectTo: ''} // Redirect to Home for unknown routes

];
