import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor } from '@angular/common';
import { MatPseudoCheckbox } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [NgFor, MatCheckboxModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent implements OnInit{
  categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  selectedCategories: string[] = [];

  constructor (private supabase: SupabaseService, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    await this.fetchPreferences();
  }

  async fetchPreferences(){
    const user = await this.supabase.getUser();
    if (user) {
      const { data, error } = await this.supabase.fetchPreferences(user.id);
      if (error) {
        console.error('Error fetching preferences:', error.message);
      } else {
        this.selectedCategories = data?.categories || [];
      }
    }
  }

  async savePreferences(){
    const user = await this.supabase.getUser();
    if (user){
      const { data, error } = await this.supabase.updatePreferences(user.id, this.selectedCategories);
      if (error) {
        console.error('Error saving preferences:', error.message);
        this.snackBar.open('Failed to save preferences.', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('Preferences saved successfully!', 'Close', { duration: 3000 });
      }
    }
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }
}