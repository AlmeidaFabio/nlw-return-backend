import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackCreateData {
    type:string;
    comment:string;
    screenshot?:string;
}

export class SubmitFeedbackService {
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackCreateData) {
       try {
        const { type, comment, screenshot } = request;

        if(!type) {
            throw new Error("Type is required");
        }

        if(!comment) {
            throw new Error("Comment is required");
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invalid screenshot format");
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans=serif; font-size: 16px; color:#123">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />`: '',
                `</div>`
            ].join('\n')
        })

       } catch (error) {
           return error;
       }
    }
}