export { createPrismaClient } from './client'
export { productRepository } from './repositories/productRepository'
export type {
  CreateProductInput,
  UpdateProductInput,
} from './repositories/productRepository'
export type { Product, ProductStatus } from '../prisma/generated/client'
