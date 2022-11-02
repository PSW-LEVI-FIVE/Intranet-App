export interface IFeedBack {
    id?: number;
    patientId: number;
    patient: string;
    feedbackContent: string;
    allowPublishment : boolean;
    published: boolean;
    anonimity: boolean;
}