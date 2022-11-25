export class Equipment{
    name: string = '';
    quantity: number = 0;
    roomId: number = 0;

    public constructor(obj?: any){
        if(obj){
            this.name = obj.name;
            this.quantity = obj.quantity;
            this.roomId = obj.roomId;
        }
    }
}