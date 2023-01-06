import { Prescription } from "../model/prescription.model";
import { Symptom } from "../model/symptom.model";

export interface CreateExaminationReportDTO {
    id: number,
    symptoms: Array<Symptom>
    prescriptions: Array<Prescription>
    content: string | null | undefined
    examinationId: number
}