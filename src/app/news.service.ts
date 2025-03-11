import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey = 'aad573178ad044749fedfa8ecef88638';
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) { }

  // getTopHeadlines(categories?: string[], sources?: string[]) {
  //   let url = `${this.apiUrl}/top-headlines?country=us&apiKey=${this.apiKey}`;

  //   if (categories && categories.length > 0) {
  //     url += `&category=${categories.join(',')}`;
  //   }
  //   if (sources && sources.length > 0) {
  //     url += `&sources=${sources.join(',')}`;
  //   }

  //   console.log('Fetching news from:', url); // Log the API URL
  //   return this.http.get(url);
  // }


  getTopHeadlines(categories?: string[], sources?: string[]) {
    let url = `${this.apiUrl}/top-headlines?country=us&apiKey=${this.apiKey}`;

    // Add categories (only the first category is used)
    if (categories && categories.length > 0) {
      url += `&category=${categories[0]}`; // Use the first category only
    }
    // Add sources (comma-separated string)
    if (sources && sources.length > 0) {
      url += `&sources=${sources.join(',')}`;
    }

    console.log('Fetching news from:', url);
    return this.http.get(url);
  }



  getNewsByCategory (category: string){
    return this.http.get(`${this.apiUrl}/top-headlines?category=${category}&apiKey=${this.apiKey}`);
  }
}