# Remark Node.js SDK

Node.js library for the Remark API.

## Install

```bash
bun add remark
```

## Setup

First, you need to get an API key, which is available in the Remark dashboard.

```ts
import { Remark } from "remark";
const remark = new Remark("...");
```

## Usage

### Contacts

Create a contact:

```ts
const result = await remark.contacts.create({
  id: "your_user_id"
  email: "user@example.com",
  name: "John Doe",
  subscribed: false,
});
```

Update a contact:

```ts
const result = await remark.contacts.update({
  id: "contact_id",
  email: "updated@example.com",
  name: "John Smith",
});
```

Delete a contact:

```ts
const result = await remark.contacts.delete("your_user_id");
```

### Feedbacks

Create a feedback:

```ts
const result = await remark.feedbacks.create({
  from: "your_user_id",
  message: "Hello world!",
  where: "https://example.com/page", // or a path e.g. "/page"
});
```

## License

MIT License
