import type { PrismaClient, ProductStatus } from '../../prisma/generated/client'

export interface CreateProductInput {
  title: string
  slug: string
  subtitle?: string
  category?: string
  audience?: string
  tone?: string
  difficulty?: string
  shortDescription?: string
  longDescription?: string
}

export interface UpdateProductInput {
  title?: string
  slug?: string
  subtitle?: string
  category?: string
  audience?: string
  tone?: string
  difficulty?: string
  shortDescription?: string
  longDescription?: string
  contentJson?: unknown
  pdfUrl?: string
  coverImageUrl?: string
  status?: ProductStatus
}

export const productRepository = {
  async findAll(prisma: PrismaClient) {
    return prisma.product.findMany({
      orderBy: { updatedAt: 'desc' },
    })
  },

  async findById(prisma: PrismaClient, id: string) {
    return prisma.product.findUnique({ where: { id } })
  },

  async create(prisma: PrismaClient, data: CreateProductInput) {
    return prisma.product.create({ data })
  },

  async update(prisma: PrismaClient, id: string, data: UpdateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
    })
  },

  async updateStatus(
    prisma: PrismaClient,
    id: string,
    status: ProductStatus
  ) {
    return prisma.product.update({
      where: { id },
      data: { status },
    })
  },

  async getStats(prisma: PrismaClient) {
    const [total, pdfsGenerated, recentlyUpdated] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({
        where: { status: 'PDF_GENERATED' },
      }),
      prisma.product.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ])
    return { total, pdfsGenerated, recentlyUpdated }
  },
}
