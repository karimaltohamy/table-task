export interface Questions {
  id: string;
  question: string;
  type: string;
  choices: { id: string; value: string; nested?: boolean }[] | [];
  stage: string;
  parentQuestion:
    | {
        parentId: string;
        parentQuestion: string;
        parentChoice: string;
        parentChoiceId: string;
      }
    | {};
  attachFile: boolean;
}
