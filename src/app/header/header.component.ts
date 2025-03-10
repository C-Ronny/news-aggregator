import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private supabase: SupabaseService, private router: Router) {
    this.supabase.getUser().then((user) => {
      this.isLoggedIn = !!user;
    });
  }

  async logout() {
    await this.supabase.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
