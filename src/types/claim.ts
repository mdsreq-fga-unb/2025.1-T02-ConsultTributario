export interface IRelatedQuestion {
  _id: string;
  label: string;
  isActive: boolean;
}

export interface IClaim {
  _id: string;
  title: string;
  objective: string;
  summary: string;
  recoverable_period: string;
  recoverable_value: string;
  createdAt: string;
  updatedAt: string;
  relatedQuestion: IRelatedQuestion;
}

export interface ICreateClaim {
  title: string;
  objective: string;
  summary: string;
  recoverable_period: string;
  recoverable_value: string;
  relatedQuestion?: string;
}

export interface IUpdateClaim {
  title: string;
  objective: string;
  summary: string;
  recoverable_period: string;
  recoverable_value: string;
  relatedQuestion: string | null;
}
