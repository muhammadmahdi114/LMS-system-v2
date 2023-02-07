import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //create FTC
    //upsert function CREATE Course and UPDATE FTC with faculty and Course
    res.status(200).json({message: "Objective Question has been created"})
  } catch (err) {
    throw new Error(err.message)
  }
}