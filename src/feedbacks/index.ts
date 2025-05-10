import {
  CreateFeedbackOptions,
  CreateFeedbackResponse,
  FeedbackFields,
} from "@/feedbacks/interfaces";
import { Remark } from "@/remark";

export class Feedbacks {
  constructor(private readonly remark: Remark) {}

  /**
   * Creates a new feedback.
   * @throws {Error} If the API request fails
   * @example
   * ```ts
   * const { data: feedback } = await remark.feedbacks.create({
   *   from: "alan@turing.com",
   *   text: "Great product!",
   *   metadata: {
   *     path: "/page"
   *   }
   * });
   * ```
   */
  async create(
    options: CreateFeedbackOptions
  ): Promise<CreateFeedbackResponse> {
    const response = await this.remark.post<FeedbackFields>(`/feedbacks`, {
      from: options.from,
      text: options.text,
      metadata: options.metadata,
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
