import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, MatSnackBarModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  isLoginMode: boolean = true;

  constructor(
    private supabase: SupabaseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async onSubmit() {
    console.log('Form submitted in mode:', this.isLoginMode ? 'Login' : 'Sign Up');
    if (this.isLoginMode) {
      await this.login();
    } else {
      await this.signUp();
    }
  }

  // async login() {
  //   const { data, error } = await this.supabase.signIn(this.email, this.password);
  //   if (error) {
  //     this.snackBar.open('Login failed: ' + error.message, 'Close', { duration: 3000 });
  //   } else {
  //     this.router.navigate(['/']);
  //   }
  // }

  // async signUp() {
  //   const { data, error } = await this.supabase.signUp(this.email, this.password);
  //   if (error) {
  //     this.snackBar.open('Signup failed: ' + error.message, 'Close', { duration: 3000 });
  //   } else {
  //     this.snackBar.open('Signup successful! Please log in.', 'Close', { duration: 3000 });
  //     this.isLoginMode = true; // Switch to login mode after signup
  //   }
  // }


  //new code
  // async login() {
  //   console.log('Logging in with:', { email: this.email, password: this.password });
  //   const { data, error } = await this.supabase.signIn(this.email, this.password);
  //   if (error) {
  //     console.error('Login error:', error);
  //     this.snackBar.open('Login failed: ' + error.message, 'Close', { duration: 3000 });
  //   } else {
  //     console.log('Login successful:', data);
  //     this.router.navigate(['/']);
  //   }
  // }
  
  // async signUp() {
  //   console.log('Signing up with:', { email: this.email, password: this.password });
  //   const { data, error } = await this.supabase.signUp(this.email, this.password);
  //   if (error) {
  //     console.error('Signup error:', error);
  //     this.snackBar.open('Signup failed: ' + error.message, 'Close', { duration: 3000 });
  //   } else {
  //     console.log('Signup successful:', data);
  //     this.snackBar.open('Signup successful! Please log in.', 'Close', { duration: 3000 });
  //     this.isLoginMode = true; // Switch to login mode after signup
  //   }
  // }


  //hardcode test
  async login() {
    const email = 'ronellecudjoe9@gmail.com'; // Use a valid email
    const password = 'Ronelle-0202731402-rocu'; // Use a valid password
    console.log('Logging in with:', { email, password });
    const { data, error } = await this.supabase.signIn(email, password);
    if (error) {
      console.error('Login error:', error);
      this.snackBar.open('Login failed: ' + error.message, 'Close', { duration: 3000 });
    } else {
      console.log('Login successful:', data);
      this.router.navigate(['/']);
    }
  }
  
  async signUp() {
    const email = 'test@example.com'; // Use a valid email
    const password = 'password123'; // Use a valid password
    console.log('Signing up with:', { email, password });
    const { data, error } = await this.supabase.signUp(email, password);
    if (error) {
      console.error('Signup error:', error);
      this.snackBar.open('Signup failed: ' + error.message, 'Close', { duration: 3000 });
    } else {
      console.log('Signup successful:', data);
      this.snackBar.open('Signup successful! Please log in.', 'Close', { duration: 3000 });
      this.isLoginMode = true; // Switch to login mode after signup
    }
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.email = '';
    this.password = '';
    console.log('Switched to mode:', this.isLoginMode ? 'Login' : 'Sign Up');
  }
}