export interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateContactOptions {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscribed?: boolean;
}

export interface CreateContactResponse {
  data: Contact | null;
  error: { name: string; message: string } | null;
}

export interface UpdateContactOptions {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  subscribed?: boolean;
}

export interface UpdateContactResponse {
  data: Contact | null;
  error: { name: string; message: string } | null;
}

export interface DeleteContactResponse {
  data: Contact | null;
  error: { name: string; message: string } | null;
}
