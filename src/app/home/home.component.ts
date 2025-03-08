import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { SupabaseService } from '../supabase.service';
import { NgFor, NgForOf } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  articles: any[] = []; // array to stroe articles to be displayed

  constructor(private news: NewsService, private supabase: SupabaseService) {}

  // fetch articles and store them in the array
  ngOnInit() {
    this.news.getTopHeadlines().subscribe((data: any) => {
      this.articles = data.articles;
    });
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

}


