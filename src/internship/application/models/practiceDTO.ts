export class PracticeDTO {
  id: number;
  estudianteId?: number;
  professorId?: number;
  isSolicited?: boolean;
  isAccepted?: boolean;
  companyName?: string;
  companyDirection?: string;
  companyEmail?: string;
  startDate?: Date;
  endDate?: Date;
  companyEvaluation?: number;
}
