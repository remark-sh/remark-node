export interface ContactFields {
  /**
   * The email address of the contact.
   * @required
   */
  email: string;
  /**
   * The full name of the contact.
   * @optional
   */
  name?: string;
}

export interface CreateContactOptions extends ContactFields { }
export interface UpdateContactOptions extends ContactFields { }

export interface ContactResponse {
  data: ContactFields | null;
  error: { name: string; message: string } | null;
}

export interface DeleteContactOptions {
  email: string;
}
