import { Hospitalization } from "./hospitalization.model";
import { Patient } from "./patient.model";

export interface MedicalRecord {
    id: number,
    patient: Patient
}