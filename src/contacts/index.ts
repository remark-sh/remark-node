import {
  Contact,
  CreateContactOptions,
  CreateContactResponse,
  DeleteContactResponse,
  UpdateContactOptions,
  UpdateContactResponse,
} from "@/contacts/interfaces";
import { Theta } from "@/theta";

/**
 * Contact management for the Theta API.
 */
export class Contacts {
  constructor(private readonly theta: Theta) {}

  /**
   * Creates a new contact with the given ID.
   * @throws {Error} If contact already exists or request fails
   * @example
   * ```ts
   * const { data: contact } = await theta.contacts.create({
   *   id: "user123",
   *   email: "user@example.com"
   * });
   * ```
   */
  async create(options: CreateContactOptions): Promise<CreateContactResponse> {
    const response = await this.theta.post<Contact>(`/contacts/${options.id}`, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      subscribed: options.subscribed ?? false,
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
   * @throws {Error} If contact not found or request fails
   * @example
   * ```ts
   * const { data: contact } = await theta.contacts.update({
   *   id: "user123",
   *   email: "new@example.com"
   * });
   * ```
   */
  async update(options: UpdateContactOptions): Promise<UpdateContactResponse> {
    const response = await this.theta.patch<Contact>(
      `/contacts/${options.id}`,
      {
        email: options.email,
        firstName: options.firstName,
        lastName: options.lastName,
        subscribed: options.subscribed,
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

  /**
   * Deletes a contact by ID.
   * @throws {Error} If contact not found or request fails
   * @example
   * ```ts
   * const { data: contact } = await theta.contacts.delete("user123");
   * ```
   */
  async delete(id: string): Promise<DeleteContactResponse> {
    const response = await this.theta.delete<Contact>(`/contacts/${id}`);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      data: response.data,
      error: null,
    };
  }
}
