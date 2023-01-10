export class TimeInterval {
    start: Date = new Date() ;
    end: Date = new Date();

    public constructor(obj?: any){
      if(obj){
          this.start = obj.start;
          this.end = obj.end;
      }
   }
  }

  export class TimeSlotRegDTO {
    startDate: Date = new Date() ;
    endDate: Date = new Date();
    roomId: number = 0;
    duration: number = 0;

    public constructor(obj?: any){
      if(obj){
          this.startDate = obj.startDate;
          this.endDate = obj.endDate;
          this.roomId = obj.roomId;
          this.duration = obj.duration;
      }
   }
  }