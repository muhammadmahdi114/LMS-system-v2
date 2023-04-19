import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const copyData = req.body.course_code
      ? {
          paper_name: req.body.paper_name,
          date: req.body.date,
          duration: req.body.duration,
          weightage: req.body.weightage,
          freeflow: req.body.freeflow,
          review: req.body.review,
          course_code: req.body.course_code,
        }
      : {
          paper_name: req.body.paper_name,
          date: req.body.date,
          duration: req.body.duration,
          weightage: req.body.weightage,
          freeflow: req.body.freeflow,
          review: req.body.review,
        };

    const paper = await prisma.paper.update({
      where: {
        paper_id: req.body.paper_id,
      },
      data: {
        ...copyData,
      },
    });
    res.status(200).json(paper);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
