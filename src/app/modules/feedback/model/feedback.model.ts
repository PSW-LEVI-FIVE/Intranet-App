export class FeedBack {
    id: number = 0;
    patientId: number = 0;
    feedbackContent: string = ''; 

    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.patientId = obj.patientId;
            this.feedbackContent = obj.feedbackContent;        
        }
    }
}