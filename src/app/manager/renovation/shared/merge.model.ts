export class MergeDTO{
    public mainRoomId = 0;
    public secondaryIds = '';
    public startDate = new Date();
    public endDate = new Date();
  
    public constructor(obj?: any){
      if(obj){
          this.mainRoomId = obj.mainRoomId;
          this.secondaryIds = obj.secondaryIds;
          this.startDate = obj.startDate;
          this.endDate = obj.endDate;
      }
   }
  }