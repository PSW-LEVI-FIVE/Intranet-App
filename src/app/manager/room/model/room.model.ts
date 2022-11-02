export class Room {
    id: number = 0;
    number: string = '';
    floor: number = 0;

    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.number = obj.number;
            this.floor = obj.floor;        
        }
    }
}