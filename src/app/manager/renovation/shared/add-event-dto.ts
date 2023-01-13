export class AddEventDto{
    eventType: number = 0;
    type: number = 0;
    time: Date = new Date();
    uuid: string = '';
    renovationId: number = 0;
   
    public constructor(obj?: any){
      if(obj){
          this.eventType = obj.eventType;
          this.type = obj.type;
          this.time = obj.time;
          this.uuid = obj.uuid;
          this.renovationId = obj.renovationId;
      }
   }
}