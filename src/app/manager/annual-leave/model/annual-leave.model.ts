export interface IAnnualLeave {
    id:number;
    doctorId:number;
    doctor: string;
    reason:string;
    startAt:string;
    endAt:string;
    state:string;
    isUrgent:boolean;

}
