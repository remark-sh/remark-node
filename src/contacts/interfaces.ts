export interface ContactFields {
  /**
   * The email address of the contact.
   * @required
   */
  email: string;
  /**
   * The first name of the contact.
   * @optional
   */
  firstName?: string;
  /**
   * The last name of the contact.
   * @optional
   */
  lastName?: string;
  /**
   * Whether the contact is a paid user.
   * @optional
   */
  subscribed?: boolean;
}

export interface CreateContactOptions extends ContactFields {}
export interface UpdateContactOptions extends ContactFields {}

export interface ContactResponse {
  data: ContactFields | null;
  error: { name: string; message: string } | null;
}

export interface DeleteContactOptions {
  email: string;
}
