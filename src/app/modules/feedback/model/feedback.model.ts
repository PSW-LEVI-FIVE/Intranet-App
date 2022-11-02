export interface IFeedBack {
<<<<<<< HEAD
    id?: number;
    patientId: number;
    feedbackContent: string;
    allowPublishment : boolean;
    published: boolean;
    anonimity: boolean;
=======
    id: number;
    patient: string;
    patientId: number;
    feedbackContent: string; 

>>>>>>> 93712d7 (Catch patient name and surname from backend)
}