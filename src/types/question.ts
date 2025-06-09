export interface IRelatedQuestion {
  _id: string;
  label: string;
}

export interface IQuestion {
  _id: string;
  label: string;
  tooltip: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  relatedQuestions: IRelatedQuestion[];
}

export interface IQuestionCreate {
  label: string;
  tooltip: string;
  relatedQuestions: string[];
}

export interface IQuestionUpdate {
  _id: string;
  label: string;
  tooltip: string;
  isActive: boolean;
  relatedQuestions: string[];
}
