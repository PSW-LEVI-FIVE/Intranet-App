export const enum HospitalizationState { ACTIVE, FINISHED }

export interface Hospitalization {
    id: number,
    state: HospitalizationState,
    startTime: Date,
    endTime: Date | null,
    pdfUrl: string
}