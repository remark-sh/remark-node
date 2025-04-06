import {
  Contact,
  CreateContactOptions,
  CreateContactResponse,
  DeleteContactResponse,
  UpdateContactOptions,
  UpdateContactResponse,
} from "@/contacts/interfaces";
import { Theta } from "@/theta";

export class Contacts {
  constructor(private readonly theta: Theta) {}

  async create(options: CreateContactOptions): Promise<CreateContactResponse> {
    return this.theta.post<Contact>("/contacts", {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      subscribed: options.subscribed ?? false,
    });
  }

  async update(options: UpdateContactOptions): Promise<UpdateContactResponse> {
    return this.theta.patch<Contact>(`/contacts/${options.id}`, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      subscribed: options.subscribed,
    });
  }

  async delete(id: string): Promise<DeleteContactResponse> {
    return this.theta.delete<Contact>(`/contacts/${id}`);
  }
}
