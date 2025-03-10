import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { SupabaseService } from '../supabase.service';
import { NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, MatProgressSpinnerModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  articles: any[] = [];
  loading: boolean = false; // Add this line

  constructor(private news: NewsService, private supabase: SupabaseService) {}

  async ngOnInit() {
    this.loading = true;
    const user = await this.supabase.getUser();
    if (user) {
      const { data: preferences, error } = await this.supabase.fetchPreferences(user.id);
      if (error) {
        console.error('Error fetching preferences:', error.message);
      } else {
        const categories = preferences?.categories || [];
        const sources = preferences?.sources || [];
        this.news.getTopHeadlines(categories, sources).subscribe({
          next: (data: any) => {
            this.articles = data.articles;
            console.log('Fetched articles:', this.articles);
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching news:', err);
            this.loading = false;
          }
        });
      }
    } else {
      this.loading = false;
    }
  }


  async saveArticle(article: any) {
    const user = await this.supabase.getUser(); // Get the current user
    if (user) {
      const { data, error } = await this.supabase.saveArticle(user.id, article);
      if (error) {
        console.error('Error saving article:', error.message);
      } else {
        console.log('Article saved:', data);
      }
    } else {
      console.error('User not logged in');
    }
  }

  async refreshNews() {
    const user = await this.supabase.getUser();
    if (user) {
      const { data: preferences, error } = await this.supabase.fetchPreferences(user.id);
      if (error) {
        console.error('Error fetching preferences:', error.message);
      } else {
        const categories = preferences?.categories || [];
        const sources = preferences?.sources || [];
        this.news.getTopHeadlines(categories, sources).subscribe((data: any) => {
          this.articles = data.articles;
        });
      }
    }
  }

}