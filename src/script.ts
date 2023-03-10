import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'Fullstack GraphQL',
            url: 'www.howtograohql.com'
        }
    })
    
    const allLinks = await prisma.link.findMany()
    console.log(allLinks);   
}

main().finally(async () => {
    await prisma.$disconnect()
})