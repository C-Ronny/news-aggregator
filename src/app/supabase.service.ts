import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://owuqgicnkkbnhveavdiz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dXFnaWNua2tibmh2ZWF2ZGl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTI4NjgyMiwiZXhwIjoyMDU2ODYyODIyfQ.fVj5RLT2VRio4njtNv7vJRkF8Lmaeakj3X8EeQvWbBs'
    
    , {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    }
  );
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

  // async signIn(email: string, password: string) {
  //   const { data, error } = await this.supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password
  //   });
  //   return { data, error };
  // }
  
  // async signUp(email: string, password: string) {
  //   const { data, error } = await this.supabase.auth.signUp({
  //     email: email,
  //     password: password
  //   });
  //   return { data, error };
  // }

  async fetchSavedArticles(userId: string) {
    const { data, error } = await this.supabase
      .from('saved_articles')
      .select('*')
      .eq('user_id', userId);
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

  async deleteArticle(articleId: string) {
    const { data, error } = await this.supabase
      .from('saved_articles')
      .delete()
      .eq('id', articleId);
    return { data, error };
  }

  async fetchPreferences(userId: string) {
    const { data, error } = await this.supabase
      .from('preferences')
      .select('categories, sources')
      .eq('user_id', userId);
  
    if (error) {
      console.error('Error fetching preferences:', error);
      return { data: null, error };
    }
  
    // If no preferences exist, return default values
    if (data.length === 0) {
      return { data: { categories: [], sources: [] }, error: null };
    }
  
    return { data: data[0], error: null };
  }

  async updatePreferences(userId: string, categories: string[]) {
    const { data, error } = await this.supabase
      .from('preferences')
      .upsert({ user_id: userId, categories })
      .eq('user_id', userId);
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  }

}