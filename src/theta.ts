import { tryCatch } from "@/common/helpers";
import { ApiResponse, PatchOptions, PostOptions } from "@/common/interfaces";
import { Contacts } from "@/contacts";
import { Feedbacks } from "@/feedbacks";

const baseUrl = "http://localhost:3000/api"; // Good for now we test locally

export class Theta {
  private readonly headers: Headers;

  readonly contacts = new Contacts(this);
  readonly feedbacks = new Feedbacks(this);

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

  async delete<T>(path: string, query?: unknown): Promise<ApiResponse<T>> {
    const requestOptions = {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(query),
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}
