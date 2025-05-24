import { tryCatch } from "@/common/helpers";
import { ApiResponse, PatchOptions, PostOptions } from "@/common/interfaces";
import { Contacts } from "@/contacts";
import { Feedbacks } from "@/feedbacks";

const BASE_URL = "http://localhost:3000/api";

/**
 * The main Remark SDK class. Initialize with your API key to start making requests.
 *
 * @example
 * ```ts
 * const remark = new Remark("your_api_key");
 * ```
 */
export class Remark {
  private readonly headers: Headers;

  readonly contacts = new Contacts(this);
  readonly feedbacks = new Feedbacks(this);

  /**
   * Creates a new instance of the Remark SDK.
   * @param key - Your Remark API key
   * @throws {Error} If no API key is provided
   */
  constructor(readonly key: string) {
    if (!key) {
      throw new Error(
        "Missing API key. Please define it in your .env file as REMARK_API_KEY."
      );
    }

    this.headers = new Headers({
      "x-api-key": this.key,
      "Content-Type": "application/json",
    });
  }

  /**
   * Makes a generic fetch request to the Remark API.
   * @throws {Error} If the API request fails
   */
  async fetchRequest<T>(path: string, options = {}): Promise<ApiResponse<T>> {
    // Network error
    const { data: response, error: fetchError } = await tryCatch(
      fetch(`${BASE_URL}${path}`, options)
    );
    if (fetchError || !response) {
      return {
        data: null,
        error: {
          name: "network_error",
          message: "Unable to fetch data. The request could not be resolved.",
        },
      };
    }

    // Success
    if (response.ok) {
      const { data, error: parseError } = await tryCatch<T>(
        response.json() as Promise<T>
      );
      if (parseError) {
        return {
          data: null,
          error: {
            name: "parse_error",
            message: "Failed to parse response data",
          },
        };
      }
      return { data, error: null };
    }

    // Error response
    const { data: errorText, error: textError } = await tryCatch(response.text());
    if (textError || !errorText) {
      return {
        data: null,
        error: {
          name: "server_error",
          message: response.statusText,
        },
      };
    }

    // Parse backend error
    const parsed = JSON.parse(errorText);
    return {
      data: null,
      error: {
        name: parsed.code.toLowerCase(),
        message: parsed.error,
      },
    };
  }

  /**
   * Makes a POST request to the Remark API.
   * @throws {Error} If the API request fails
   */
  async post<T>(
    path: string,
    entity?: unknown,
    options: PostOptions = {}
  ): Promise<ApiResponse<T>> {
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(entity),
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  /**
   * Makes a PATCH request to the Remark API.
   * @throws {Error} If the API request fails
   */
  async patch<T>(
    path: string,
    entity: unknown,
    options: PatchOptions = {}
  ): Promise<ApiResponse<T>> {
    const requestOptions = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(entity),
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  /**
   * Makes a DELETE request to the Remark API.
   * @throws {Error} If the API request fails
   */
  async delete<T>(path: string, query?: unknown): Promise<ApiResponse<T>> {
    const requestOptions = {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(query),
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}
