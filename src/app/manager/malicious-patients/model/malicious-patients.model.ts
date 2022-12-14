export interface IMaliciousPatient {
    id: number;
    patient: string;
    numberOfCanceledAppointments: number;
    blocked: boolean;
}