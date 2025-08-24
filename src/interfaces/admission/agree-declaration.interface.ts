import { PostAdmissionStepResponse } from './children-info.interface';

export interface AgreeDeclarationInterface
  extends Omit<PostAdmissionStepResponse, 'currentStep' | 'form_number'> {
  step: number;
}
