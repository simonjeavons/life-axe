import { PrismaClient } from '../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

export function createPrismaClient(connectionString: string) {
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}
