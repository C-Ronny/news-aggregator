import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule} from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isLoggedIn$ = new BehaviorSubject<boolean>(false); // reactive state

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    const user = await this.supabase.getUser();
    this.isLoggedIn$.next(!!user); // Update the state

    // Listen for auth state changes
    this.supabase.authChanges().subscribe((user) => {
      this.isLoggedIn$.next(!!user);
    });
  }

  async logout() {
    await this.supabase.signOut();
    this.isLoggedIn$.next(false); // Update the state
    this.router.navigate(['/login']);
  }
}
