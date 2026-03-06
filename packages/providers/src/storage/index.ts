import type { StorageConfig, StorageProvider } from './types'
import { SupabaseStorageProvider } from './supabaseStorage'

export function createStorageProvider(config: StorageConfig): StorageProvider {
  return new SupabaseStorageProvider(config)
}

export type { StorageProvider, StorageConfig } from './types'
