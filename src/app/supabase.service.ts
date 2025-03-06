import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://owuqgicnkkbnhveavdiz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dXFnaWNua2tibmh2ZWF2ZGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODY4MjIsImV4cCI6MjA1Njg2MjgyMn0.kFINOB0xu9lW1VNhXGlDcWztWRa279gjbsXKVpDMceo');
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


}
