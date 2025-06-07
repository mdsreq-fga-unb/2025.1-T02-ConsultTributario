import { Injectable } from '@nestjs/common';

interface HasRelatedQuestions {
  relatedQuestions?: string[];
}

@Injectable()
export class QuestionDomainService {
  validateSelfReference(questionId: string, relatedQuestionIds: string[]): boolean {
    return relatedQuestionIds.includes(questionId);
  }

  hasRelatedQuestions(question: HasRelatedQuestions): boolean {
    return !!(question.relatedQuestions && question.relatedQuestions.length > 0);
  }
}
