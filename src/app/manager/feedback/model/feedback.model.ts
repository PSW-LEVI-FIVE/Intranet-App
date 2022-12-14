export interface IFeedback {
    id?: number;
    patientId: number;
    patient: string;
    feedbackContent: string;
    feedbackStatus: IFeedbackStatus;
}
export interface IFeedbackStatus {
    allowPublishment : boolean;
    published: boolean;
    anonimity: boolean;
}