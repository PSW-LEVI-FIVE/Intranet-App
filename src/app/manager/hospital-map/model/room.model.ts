export interface IRoom{
    xCoordinate: number ,
    yCoordinate: number,
    width: number,
    height: number,
    id: string,
    room: {
        roomNumber: string,
        area: number
    }
    secondaryCoordinates: Coordinates[];
}

export interface Coordinates {
    xCoordinate: number;
    yCoordinate: number;
    width: number;
    height: number;    
}

export interface RoomArea {
    roomId: number;
    areaStrokes: {x: number; y:number}[];
}

export interface IRoomModel {
    id: number;
    roomNumber: string;
}

export interface CreateRoom {
    mapFloorId: number,
    roomNumber: string,
    area: number,
    xCoordinate: number,
    yCoordinate: number,
    width: number,
    height: number,
    rgbColour: string,
    roomType: number
}

export interface RoomType {
    name: string,
    value: number
}