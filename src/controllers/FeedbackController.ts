import { Request, Response } from "express";
import { NodeMailerAdapter } from "../adapters/nodemailer";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackService } from "../services/submitFeedback";



export class FeedbackController {
    async create(req:Request, res:Response) {
        try {
            const { type, comment, screenshot } = req.body;
            const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
            const nodemailerAdater = new NodeMailerAdapter()
            const submitService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerAdater);
            

            await submitService.execute({
                type,
                comment,
                screenshot
            })

            

            return res.status(201).send()
        } catch (error) {
            return error;
        }
    }
}