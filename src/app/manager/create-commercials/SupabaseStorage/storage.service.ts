import { Injectable } from '@angular/core';
import { createClient,SupabaseClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root'
})
export class StorageService  {
  supabaseUrl = 'https://pdphmpovyeiqspzsxqzq.supabase.co';
  supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcGhtcG92eWVpcXNwenN4cXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY0NjAyNzksImV4cCI6MTk4MjAzNjI3OX0.q8av_HwPBAaEt84mCmeuUduizmrVGUSQdRdXFVO_0Jo';
  
  apiHost: string = 'http://localhost:5000/api';

  public supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async upload(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(path, file);

    return { data, error };
  }
  
  async download(bucket: string, path: string) {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .download(path);

    return { data, error };
  }

  async createBucket() {
    const { data, error } = await this.supabaseClient.storage.createBucket('photos');
    return { data, error };
  }

  async getBucket() {
    const { data, error } = await this.supabaseClient.storage.getBucket('photos');
    return { data, error };
  }
}
