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
}

export interface CreateRoom {
    mapFloorId: number,
    roomNumber: string,
    area: number,
    xCoordinate: number,
    yCoordinate: number,
    width: number,
    height: number,
    rgbColour: string
}
