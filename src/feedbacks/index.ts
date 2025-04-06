import {
  CreateFeedbackOptions,
  CreateFeedbackResponse,
  Feedback,
} from "@/feedbacks/interfaces";
import { Theta } from "@/theta";

/**
 * Feedback management methods for the Theta API.
 */
export class Feedbacks {
  constructor(private readonly theta: Theta) {}

  /**
   * Creates a new feedback.
   * @example
   * ```ts
   * await theta.feedbacks.create({
   *   from: "user123",
   *   message: "Great product!",
   *   where: "https://example.com/page"
   * });
   * ```
   */
  async create(
    options: CreateFeedbackOptions
  ): Promise<CreateFeedbackResponse> {
    return this.theta.post<Feedback>("/feedbacks", {
      from: options.from,
      where: options.where,
      message: options.message,
    });
  }
}
