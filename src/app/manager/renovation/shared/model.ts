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

export class MergeDTO{
  mainRoomId: number = 0;
  secondaryId: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();

  public constructor(obj?: any){
    if(obj){
        this.mainRoomId = obj.mainRoomId;
        this.secondaryId = obj.secondaryId;
        this.startDate = obj.startDate;
        this.endDate = obj.endDate;
    }
 }
}

export class SplitDTO{
  mainRoomId: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  roomName: string = '';
 
  public constructor(obj?: any){
    if(obj){
        this.mainRoomId = obj.mainRoomId;
        this.startDate = obj.startDate;
        this.endDate = obj.endDate;
        this.roomName = obj.roomName;
    }
 }
}