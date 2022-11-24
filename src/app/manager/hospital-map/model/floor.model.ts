export interface IFloor {
      xCoordinate: number ,
      yCoordinate: number,
      width: number,
      height: number,
      id: string,
      floor: {
         area:any   
      }
}

export interface CreateFloor {
      buildingId: number,
      number: number,
      area: number,
      xCoordinate: number,
      yCoordinate: number,
      width: number,
      height: number,
      rgbColour: string
}