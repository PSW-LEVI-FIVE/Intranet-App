export interface IFeedBack {
    id?: number;
    patientId: number;
    feedbackContent: string;
    allowPublishment : boolean;
    published: boolean;
    anonimity: boolean;
}