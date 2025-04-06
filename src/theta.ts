import { tryCatch } from "@/common/helpers";
import { ApiResponse, PatchOptions, PostOptions } from "@/common/interfaces";
import { Contacts } from "@/contacts";
import { Feedbacks } from "@/feedbacks";

const baseUrl = "http://localhost:3000/api"; // Good for now we test locally

/**
 * The main Theta SDK class. Initialize with your API key to start making requests.
 *
 * @example
 * ```ts
 * const theta = new Theta("your_api_key");
 * ```
 */
export class Theta {
  private readonly headers: Headers;

  readonly contacts = new Contacts(this);
  readonly feedbacks = new Feedbacks(this);

  /**
   * Creates a new instance of the Theta SDK.
   * @param key - Your Theta API key
   * @throws {Error} If no API key is provided
   */
  constructor(readonly key: string) {
    if (!key) {
      throw new Error(
        'Missing API key. Pass it to the constructor `new Theta("th_123")`'
      );
    }

    this.headers = new Headers({
      "x-api-key": this.key,
      "Content-Type": "application/json",
    });
  }

  /**
   * Makes a generic fetch request to the Theta API.
   * @param path - The API endpoint path
   * @param options - Optional fetch request options
   * @returns A promise that resolves to an API response with data or error
   */
  async fetchRequest<T>(path: string, options = {}): Promise<ApiResponse<T>> {
    const { data: response, error: fetchError } = await tryCatch(
      fetch(`${baseUrl}${path}`, options)
    );

    if (fetchError || !response) {
      return {
        data: null,
        error: {
          name: "application_error",
          message: "Unable to fetch data. The request could not be resolved.",
        },
      };
    }

    if (response.ok) {
      const { data, error: parseError } = await tryCatch<T>(
        response.json() as Promise<T>
      );

      if (parseError) {
        return {
          data: null,
          error: {
            name: "application_error",
            message: "Failed to parse response data",
          },
        };
      }
      return { data, error: null };
    }

    const { data: errorText, error: textError } = await tryCatch(
      response.text()
    );
    if (textError || !errorText) {
      return {
        data: null,
        error: {
          name: "application_error",
          message: response.statusText,
        },
      };
    }

    const { data: parsedError, error: parseError } = await tryCatch(
      Promise.resolve(JSON.parse(errorText))
    );

    if (parseError || !parsedError) {
      return {
        data: null,
        error: {
          name: "application_error",
          message:
            "Internal server error. We are unable to process your request right now, please try again later.",
        },
      };
    }

    return { data: null, error: parsedError };
  }

  /**
   * Makes a POST request to the Theta API.
   * @param path - The API endpoint path
   * @param entity - The data to send in the request body
   * @param options - Additional fetch options
   * @returns A promise that resolves to an API response with data or error
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
   * Makes a PATCH request to the Theta API.
   * @param path - The API endpoint path
   * @param entity - The data to send in the request body
   * @param options - Additional fetch options
   * @returns A promise that resolves to an API response with data or error
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
   * Makes a DELETE request to the Theta API.
   * @param path - The API endpoint path
   * @param query - Optional query parameters to send in the request body
   * @returns A promise that resolves to an API response with data or error
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
