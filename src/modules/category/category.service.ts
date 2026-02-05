import { Category } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createCategory = async (data: Category) => {
    const result = await prisma.category.create({
        data
    })
    return result;
}

const updateCategory = async (data: Category) => {
    const result = await prisma.category.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            description: data.description
        }
    })
    return result;
}

const getTutorProfileBycategoryId = async (categoryId: string) => {
    const result = await prisma.category.findUnique({
        where: {
            id: categoryId
        },
        include: {
            tutorProfiles: true
        }
    })
    return result;
}

export const categoryService = {
    createCategory,
    updateCategory,
    getTutorProfileBycategoryId
}
