export class RenovationEventDto{
    id: number = 0;
    mainRoomId: number = 0;
    secondaryRoomId: number = 0;
    type: number = 0;
    state: number = 0;
    startAt: Date = new Date();
    endAt: Date = new Date();
    roomName: string = '';
    uuid: string = '';
   
    public constructor(obj?: any){
      if(obj){
          this.id = obj.id;
          this.mainRoomId = obj.mainRoomId;
          this.secondaryRoomId = obj.secondaryRoomId;
          this.state =  obj.state;
          this.type = obj.type;
          this.startAt = obj.startDate;
          this.endAt = obj.endDate;
          this.uuid = obj.uuid;
          this.roomName = obj.roomName;
      }
   }
}