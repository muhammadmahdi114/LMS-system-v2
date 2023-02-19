// get faculty by id

import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const faculty = await prisma.faculty.findUnique({
            where: {
                faculty_id: req.body.faculty_id,
            },
            select: {
                faculty_id: true,
                name: true,
                email: true,
                phone_number: true,
                department: true,
                profile_picture: true,
                level: true,
            },
        });
        res.status(200).json(faculty);
    } catch (err) {
        throw new Error(err.message);
    }
}

export default handler;