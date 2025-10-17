const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@clinic.test' },
    update: {},
    create: { email: 'admin@clinic.test', name: 'Admin', password: 'password', role: 'admin' },
  })
  console.log('Seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
