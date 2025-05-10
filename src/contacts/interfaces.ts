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
  /**
   * Additional metadata for the contact.
   * Currently only supports tier as a string.
   * @optional
   */
  metadata?: {
    tier?: string;
  };
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
