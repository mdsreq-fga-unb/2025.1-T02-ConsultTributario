export const ERROR_MESSAGES = {
  // Generic errors
  INVALID_ID: 'Invalid ID format',
  ENTITY_NOT_FOUND: 'Entity not found',
  OPERATION_FAILED: 'Operation failed',
  INVALID_RELATED_QUESTIONS: 'Invalid related question IDs',

  // Question-specific errors
  SELF_REFERENCE_NOT_ALLOWED: 'Question cannot reference itself',
  QUESTION_LABEL_EXISTS: 'Question label already exists',

  // Claim-specific errors
  CLAIM_TITLE_EXISTS: 'Claim title already exists',

  // Diagnosis-specific errors
  INVALID_QUESTION_RESPONSES: 'Invalid question responses',

  // Tax type-specific errors
  TAX_TYPE_NAME_EXISTS: 'Tax type name already exists',
} as const;

export const VALIDATION_MESSAGES = {
  IS_NOT_EMPTY: 'Field cannot be empty',
  IS_STRING: 'Field must be a string',
  IS_MONGO_ID: 'Must be a valid MongoDB ObjectId',
  IS_ARRAY: 'Field must be an array',
} as const;

export const API_ROUTES = {
  QUESTIONS: 'questions',
  CLAIMS: 'claims',
  DIAGNOSES: 'diagnoses',
} as const;
