import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { StorageProvider, StorageConfig } from './types'

export class SupabaseStorageProvider implements StorageProvider {
  private client: SupabaseClient
  private bucket: string

  constructor(config: StorageConfig) {
    this.client = createClient(config.supabaseUrl, config.supabaseServiceRoleKey)
    this.bucket = config.bucket
  }

  async upload(path: string, file: Blob | File): Promise<string> {
    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(path, file, { upsert: true })

    if (error) {
      throw new Error(`Storage upload failed: ${error.message}`)
    }

    return this.getPublicUrl(path)
  }

  getPublicUrl(path: string): string {
    const { data } = this.client.storage
      .from(this.bucket)
      .getPublicUrl(path)
    return data.publicUrl
  }
}
