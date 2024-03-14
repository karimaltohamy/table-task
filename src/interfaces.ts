export interface Questions {
  question: string;
  type: string;
  choices: [{ value: string }] | [];
  stage: string;
  parentQuestion?: object;
  attachFile: boolean;
}
