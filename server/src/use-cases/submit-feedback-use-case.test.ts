import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// spies = espioes

const createFeedbackSpy = jest.fn(); // funcao espiã
const sendmailFeedbackSpy = jest.fn(); // funcao espiã

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy }, // mock test. 
    { sendMail: sendmailFeedbackSpy } // mock test
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        // expect: "funcao chegue até o final e nao dispare nenhum erro"
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exampler comment',
            screenshot: 'data:image/png;base64sdfaretgrgr',
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendmailFeedbackSpy).toHaveBeenCalled()
    })

    // teste pra ver se rejeita o comment vazio "if (!type) {throw new Error('Type is required')}"
    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exampler comment',
            screenshot: 'data:image/png;base64sdfaretgrgr',
        })).rejects.toThrow()
    })

    // teste pra ver se rejeita o comment vazio "if (!comment) {throw new Error('Comment is required')}"
    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64sdfaretgrgr',
        })).rejects.toThrow()
    })

    // teste pra ver se rejeita o comment vazio "if (!comment) {throw new Error('Comment is required')}"
    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'ta tudo bugado',
            screenshot: 'test.jpg',
        })).rejects.toThrow()
    })
})