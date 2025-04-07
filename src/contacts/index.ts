import {
  ContactFields,
  ContactResponse,
  CreateContactOptions,
  DeleteContactOptions,
  UpdateContactOptions,
} from "@/contacts/interfaces";
import { Theta } from "@/theta";

export class Contacts {
  constructor(private readonly theta: Theta) {}

  /**
   * Creates a new contact.
   * @throws {Error} If the API request fails
   * @example
   * ```ts
   * const { data: contact } = await theta.contacts.create({
   *   email: "alan@turing.com",
   *   firstName: "Alan",
   *   lastName: "Turing",
   *
   * });
   * ```
   */
  async create(options: CreateContactOptions): Promise<ContactResponse> {
    const response = await this.theta.post<ContactFields>(`/contacts`, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      subscribed: options.subscribed,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      data: response.data,
      error: null,
    };
  }

  /**
   * Updates an existing contact.
   * @throws {Error} If the API request fails
   * @example
   * ```ts
   * const { data: contact } = await theta.contacts.update({
   *   email: "alan@turing.com",
   *   firstName: "Alan",
   *   lastName: "Turing",
   *   subscribed: false
   * });
   * ```
   */
  async update(options: UpdateContactOptions): Promise<ContactResponse> {
    const response = await this.theta.patch<ContactFields>(`/contacts`, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      subscribed: options.subscribed,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      data: response.data,
      error: null,
    };
  }

  /**
   * Deletes a contact.
   * @throws {Error} If the API request fails
   * @example
   * ```ts
   * const { data: contact } = await theta.contacts.delete({
   *   email: "alan@turing.com"
   * });
   * ```
   */
  async delete(options: DeleteContactOptions): Promise<ContactResponse> {
    const response = await this.theta.delete<ContactFields>(`/contacts`, {
      email: options.email,
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
