import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { NgFor, NgIf } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-articles',
  standalone: true,
  imports: [NgFor, MatSnackBarModule, NgIf],
  templateUrl: './saved-articles.component.html',
  styleUrl: './saved-articles.component.scss'
})
export class SavedArticlesComponent {
  savedArticles: any[] = [];
  snackBar: any;

  constructor (private supabase: SupabaseService){}

  loading: boolean = false;

  async ngOnInit() {
    this.loading = true;
    await this.fetchSavedArticles();
    this.loading = false;
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

  // async deleteArticle(articleId: string) {
  //   const { data, error } = await this.supabase.deleteArticle(articleId);
  //   if (error) {
  //     console.error('Error deleting article:', error.message);
  //   } else {
  //     this.savedArticles = this.savedArticles.filter(article => article.id !== articleId);
  //   }
  // }

  async deleteArticle(articleId: string) {
    const { data, error } = await this.supabase.deleteArticle(articleId);
    if (error) {
      console.error('Error deleting article:', error.message);
      this.snackBar.open('Failed to delete article.', 'Close', { duration: 3000 });
    } else {
      this.savedArticles = this.savedArticles.filter(article => article.id !== articleId);
      this.snackBar.open('Article deleted successfully!', 'Close', { duration: 3000 });
    }
  }



  

}
