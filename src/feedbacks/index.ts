import {
  CreateFeedbackOptions,
  CreateFeedbackResponse,
  Feedback,
} from "@/feedbacks/interfaces";
import { Theta } from "@/theta";

/**
 * Feedback management for the Theta API.
 */
export class Feedbacks {
  constructor(private readonly theta: Theta) {}

  /**
   * Creates a new feedback.
   * @throws {Error} If feedback already exists or request fails
   * @example
   * ```ts
   * const { data: feedback } = await theta.feedbacks.create({
   *   from: "user123",
   *   message: "Great product!"
   * });
   * ```
   */
  async create(
    options: CreateFeedbackOptions
  ): Promise<CreateFeedbackResponse> {
    const response = await this.theta.post<Feedback>(
      `/feedbacks/${options.id}`,
      {
        from: options.from,
        where: options.where,
        message: options.message,
      }
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      data: response.data,
      error: null,
    };
  }
}
