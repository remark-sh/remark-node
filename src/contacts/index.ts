import {
  ContactFields,
  ContactResponse,
  CreateContactOptions,
  DeleteContactOptions,
  UpdateContactOptions,
} from "@/contacts/interfaces";
import { Remark } from "@/remark";

export class Contacts {
  constructor(private readonly remark: Remark) { }

  /**
   * Creates a new contact.
   * @throws {Error} If the API request fails
   * @example
   * ```ts
   * const { data: contact } = await remark.contacts.create({
   *   email: "alan@turing.com",
   *   lastName: "Turing",
   *   firstName: "Alan",
   * });
   * ```
   */
  async create(options: CreateContactOptions): Promise<ContactResponse> {
    const response = await this.remark.post<ContactFields>(`/contacts`, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
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
   * const { data: contact } = await remark.contacts.update({
   *   email: "alan@turing.com",
   *   lastName: "Turing",
   *   firstName: "Alan"
   * });
   * ```
   */
  async update(options: UpdateContactOptions): Promise<ContactResponse> {
    const response = await this.remark.patch<ContactFields>(`/contacts`, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
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
   * const { data: contact } = await remark.contacts.delete({
   *   email: "alan@turing.com"
   * });
   * ```
   */
  async delete(options: DeleteContactOptions): Promise<ContactResponse> {
    const response = await this.remark.delete<ContactFields>(`/contacts`, {
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
