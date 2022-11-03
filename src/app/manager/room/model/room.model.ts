export class Room {
    id: number = 0;
    roomNumber: string = '';
    floor: number = 0;

    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.roomNumber = obj.roomNumber;
            this.floor = obj.floor;
        }
    }
}