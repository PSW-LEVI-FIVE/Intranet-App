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