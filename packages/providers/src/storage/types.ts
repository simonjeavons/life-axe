export interface StorageProvider {
  upload(path: string, file: Blob | File): Promise<string>
  getPublicUrl(path: string): string
}

export interface StorageConfig {
  supabaseUrl: string
  supabaseServiceRoleKey: string
  bucket: string
}
