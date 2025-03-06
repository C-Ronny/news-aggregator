import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SupabaseService } from '../supabase.service';
import { FormsModule } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent { 
  email: string = '';
  password: string = '';

  constructor (private supabase: SupabaseService) {};

  async onSignUp() {
    const { data, error } = await this.supabase.signUp(this.email, this.password);
    if (error) {
      console.error('Signup error:', error.message);
    } else {
      console.log('Signed up as:', data.user);
    }
  }

  async onLogin() {
    const { data, error } = await this.supabase.signIn(this.email, this.password);
    if (error) {
      console.error('Login error:', error.message);
    } else {
      console.log('Logged in as:', data.user);
    }
  }
}
