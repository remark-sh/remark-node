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
 * Contact management methods for the Theta API.
 */
export class Contacts {
  constructor(private readonly theta: Theta) {}

  /**
   * Creates a new contact.
   * @example
   * ```ts
   * await theta.contacts.create({
   *   id: "user123",
   *   email: "user@example.com",
   *   firstName: "John",
   *   lastName: "Doe"
   * });
   * ```
   */
  async create(options: CreateContactOptions): Promise<CreateContactResponse> {
    return this.theta.post<Contact>("/contacts", {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      subscribed: options.subscribed ?? false,
    });
  }

  /**
   * Updates an existing contact.
   * @example
   * ```ts
   * await theta.contacts.update({
   *   id: "user123",
   *   email: "new@example.com"
   * });
   * ```
   */
  async update(options: UpdateContactOptions): Promise<UpdateContactResponse> {
    return this.theta.patch<Contact>(`/contacts/${options.id}`, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      subscribed: options.subscribed,
    });
  }

  /**
   * Deletes a contact.
   * @example
   * ```ts
   * await theta.contacts.delete("user123");
   * ```
   */
  async delete(id: string): Promise<DeleteContactResponse> {
    return this.theta.delete<Contact>(`/contacts/${id}`);
  }
}
