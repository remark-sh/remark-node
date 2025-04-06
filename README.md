# Theta Node.js SDK

Node.js library for the Theta API.

## Install

```bash
bun add theta
```

## Setup

First, you need to get an API key, which is available in the Theta dashboard.

```ts
import { Theta } from "theta";
const theta = new Theta("th_123456789");
```

## Usage

### Contacts

Create a contact:

```ts
const result = await theta.contacts.create({
  id: "your_user_id"
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  subscribed: false,
});
```

Update a contact:

```ts
const result = await theta.contacts.update({
  id: "contact_id",
  email: "updated@example.com",
  firstName: "John",
  lastName: "Smith",
});
```

Delete a contact:

```ts
const result = await theta.contacts.delete("your_user_id");
```

### Feedbacks

Create a feedback:

```ts
const result = await theta.feedbacks.create({
  from: "your_user_id",
  message: "Hello world!",
  where: "https://example.com/page", // or a path e.g. "/page"
});
```

## License

MIT License
