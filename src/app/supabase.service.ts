import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://owuqgicnkkbnhveavdiz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dXFnaWNua2tibmh2ZWF2ZGl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTI4NjgyMiwiZXhwIjoyMDU2ODYyODIyfQ.fVj5RLT2VRio4njtNv7vJRkF8Lmaeakj3X8EeQvWbBs', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    });
  }

  //async method to fetch data without waiting for a process to occur first
  async fetchNews() {
    const { data, error } = await this.supabase
      .from('news')
      .select('*');
    return { data, error };
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }

  async saveArticle(userId: string, article: any) {
    const { data, error } = await this.supabase
      .from('saved_articles')
      .insert([
        {
          user_id: userId,
          article_id: article.url, // Use URL as a unique ID
          title: article.title,
          description: article.description,
          url: article.url,
          published_at: new Date(article.publishedAt).toISOString()
        }
      ]);
    return { data, error };
  }

  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }


}
