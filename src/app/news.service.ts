import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey = 'aad573178ad044749fedfa8ecef88638';
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) { }

  getTopHeadlines(){
    return this.http.get(`${this.apiUrl}/top-headlines?country=us&apiKey=${this.apiKey}`);
  }

  getNewsByCategory (category: string){
    return this.http.get(`${this.apiUrl}/top-headlines?category=${category}&apiKey=${this.apiKey}`);
  }
}
