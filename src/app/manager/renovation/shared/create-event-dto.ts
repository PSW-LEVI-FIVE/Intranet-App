export class CreateEventDto{
    mainRoomId: number = 0;
    type: number = 0;

    public constructor(obj?: any){
      if(obj){
          this.mainRoomId = obj.mainRoomId;
          this.type = obj.type;
      }
   }
}