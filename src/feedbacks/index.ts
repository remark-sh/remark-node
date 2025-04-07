import {
  CreateFeedbackOptions,
  CreateFeedbackResponse,
  FeedbackFields,
} from "@/feedbacks/interfaces";
import { Theta } from "@/theta";

export class Feedbacks {
  constructor(private readonly theta: Theta) {}

  /**
   * Creates a new feedback.
   * @throws {Error} If the API request fails
   * @example
   * ```ts
   * const { data: feedback } = await theta.feedbacks.create({
   *   from: "alan@turing.com",
   *   message: "Great product!"
   * });
   * ```
   */
  async create(
    options: CreateFeedbackOptions
  ): Promise<CreateFeedbackResponse> {
    const response = await this.theta.post<FeedbackFields>(`/feedbacks`, {
      from: options.from,
      text: options.text,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      data: response.data,
      error: null,
    };
  }
}
