import { SubmitFeedbackService } from "./submitFeedback"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,akjshduqhweuryqw9uiahs',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    }) ;

    it('should not be able to submit without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,akjshduqhweuryqw9uiahs',
        })).rejects.toThrow();
    });

    it('should not be able to submit without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,akjshduqhweuryqw9uiahs',
        })).rejects.toThrow();
    });

    it('should not be able to submit with invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.png',
        })).rejects.toThrow();
    });
});