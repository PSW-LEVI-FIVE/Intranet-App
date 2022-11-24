export interface TherapiesDto {
    id: number;
    typeBlood?: number,
    medicineName?: string,
    therapyType: string,
    quantity: number,
    prescribedDate: Date,
    bloodName?: string,
    position?: number,
}