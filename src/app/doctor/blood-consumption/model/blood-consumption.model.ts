export interface BloodConsumption {
    id: number,
    typeBlood: number,
    quantity: number,
    doctorName: string,
    doctorSurname: string,
    prescribedDate: Date,
    bloodName?: string,
    position?: number
}