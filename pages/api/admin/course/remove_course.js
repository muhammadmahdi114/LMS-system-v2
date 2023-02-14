import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Remove Faculty
    await prisma.course.delete({
      where: {
        course_code: req.body.course_code,
      }
    })
    await prisma.$disconnect()
    res.status(200).json({message: "Course Deleted Successfully"})
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler