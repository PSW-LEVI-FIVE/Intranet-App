export interface IBuilding {
      xCoordinate: number ,
      yCoordinate: number,
      width: number,
      height: number,
      id: string,
      building: {
            Id: string,
            Name: string,
            Address: string
      }
}

export interface CreateBuilding {
    address: string,
    name: string,
	xCoordinate: number,
	yCoordinate: number,
	width: number,
    height: number,
	rgbColour: string
}
