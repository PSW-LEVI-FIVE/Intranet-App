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