// find answer of the student of a question
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const existingSOA = await prisma.sOA.findMany({
      where: {
        p_number: req.body.student,
        oq_id: {in: req.body.question},
      },
    });

    if (existingSOA) {
      res.status(200).json(existingSOA);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}