import {
  CreateFeedbackOptions,
  CreateFeedbackResponse,
  Feedback,
} from "@/feedbacks/interfaces";
import { Theta } from "@/theta";

export class Feedbacks {
  constructor(private readonly theta: Theta) {}

  async create(
    options: CreateFeedbackOptions,
  ): Promise<CreateFeedbackResponse> {
    return this.theta.post<Feedback>("/feedbacks", {
      from: options.from,
      where: options.where,
      message: options.message,
    });
  }
}
