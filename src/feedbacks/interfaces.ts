export interface Feedback {
  id: string;
  from: string;
  where?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFeedbackOptions {
  from: string;
  where?: string;
  message: string;
}

export interface CreateFeedbackResponse {
  data: Feedback | null;
  error: { name: string; message: string } | null;
}
