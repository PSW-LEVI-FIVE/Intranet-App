export interface IAnnualLeave {
    id:number;
    doctor: {
        id:number;
        name:String;
        surname:String;
    }
    reason:String;
    startAt:Date;
    endAt:Date;
    state:String;
    isUrgent:boolean;

}
