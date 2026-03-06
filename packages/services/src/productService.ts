import type { PrismaClient } from '@life-axe/database'
import {
  productRepository,
  type CreateProductInput,
  type UpdateProductInput,
} from '@life-axe/database'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const productService = {
  async create(prisma: PrismaClient, input: Omit<CreateProductInput, 'slug'>) {
    const slug = slugify(input.title)
    return productRepository.create(prisma, { ...input, slug })
  },

  async update(prisma: PrismaClient, id: string, data: UpdateProductInput) {
    if (data.title && !data.slug) {
      data.slug = slugify(data.title)
    }
    return productRepository.update(prisma, id, data)
  },

  async findAll(prisma: PrismaClient) {
    return productRepository.findAll(prisma)
  },

  async findById(prisma: PrismaClient, id: string) {
    return productRepository.findById(prisma, id)
  },

  async getStats(prisma: PrismaClient) {
    return productRepository.getStats(prisma)
  },

  async archive(prisma: PrismaClient, id: string) {
    return productRepository.updateStatus(prisma, id, 'ARCHIVED')
  },
}
