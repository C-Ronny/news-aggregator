import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-saved-articles',
  imports: [NgFor],
  templateUrl: './saved-articles.component.html',
  styleUrl: './saved-articles.component.scss'
})
export class SavedArticlesComponent {
  savedArticles: any[] = [];

  constructor (private supabase: SupabaseService){}

  async ngOnInit() {
    await this.fetchSavedArticles();
  }

  async fetchSavedArticles() {
    const user = await this.supabase.getUser();
    if (user) {
      const { data, error } = await this.supabase.fetchSavedArticles(user.id);
      if (error) {
        console.error('Error fetching saved articles:', error.message);
      } else {
        this.savedArticles = data || [];
      }
    }
  }

  async deleteArticle(articleId: string) {
    const { data, error } = await this.supabase.deleteArticle(articleId);
    if (error) {
      console.error('Error deleting article:', error.message);
    } else {
      this.savedArticles = this.savedArticles.filter(article => article.id !== articleId);
    }
  }

}
