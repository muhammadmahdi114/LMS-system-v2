// enroll student in course
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  console.log(req.body);
  // return res.status(200).json("OK")
  const prisma = new PrismaClient();
  try {
    const course = await prisma.course.findUnique({
      where: {
        course_code: req.body.course_code,
      },
    });
    if (!course) return res.status(404).json("Course not found");
    const student = await prisma.student.findUnique({
      where: {
        p_number: Number(req.body.p_number),
      },
    });
    if (!student) return res.status(404).json("Student not found");
    const enrolled = await prisma.sRC.create({
      data: {
        course_code: req.body.course_code,
        p_number: Number(req.body.p_number),
      },
    });
    res.status(200).json(enrolled);
  } catch (err) {
    throw new Error(err.message);
  }
}
