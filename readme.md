
# NotifyFlow Server SDK

Official Node.js SDK for interacting with the NotifyFlow (Notifications as a Service) platform.

The SDK abstracts:
- authentication
- HTTP transport
- request serialization
- response parsing
- error normalization

so backend developers can interact with NotifyFlow using a clean developer-friendly API.

---

# Installation

```bash
npm install @notifyflow/server-sdk
```

---

# Quick Start

```ts
import { NotifyFlowServer } from "@notifyflow/server-sdk";

const server = new NotifyFlowServer("YOUR_API_KEY");

await server.notifications.createNotification({
    recepientId:"recipient_123",
    title:"Order Placed",
    body:"Your order has been placed successfully",
    type:"MARKETPLACE_UPDATE",
    channel:["PUSH","IN_APP"],
    idempotencyKey:"order_123",
    smartOrchestration:true
});
```

---

# SDK Architecture

The SDK internally follows a layered architecture:

```txt
Resources
   ↓
HttpClient
   ↓
NotifyFlow Backend APIs
```

---

# Core Concepts

## NotifyFlow Client

The `NotifyFlow` class is the main SDK runtime container.

It initializes:

* shared HTTP transport layer
* authentication configuration
* API resources

Example:

```ts
const server = new NotifyFlowServer("API_KEY");
```

---

# Resources

Resources represent grouped platform capabilities.

Example:

```ts
notifyflow.notifications
```

Resources do NOT directly handle:

* fetch
* headers
* authentication
* serialization

All transport logic is delegated to the internal `HttpClient`.

---

# HttpClient

The internal `HttpClient` handles:

* x-api-key injection
* request execution
* JSON serialization
* response parsing
* error normalization

This creates a centralized transport layer shared across all SDK resources.

---

# Notifications Resource

The SDK currently exposes:

```ts
server.notifications
```

---

# Create Notification

```ts
await server.notifications.createNotification({
    recepientId:"recipient_123",
    title:"Message Received",
    body:"You have received a new message",
    type:"MESSAGE_RECEIVED",
    channel:["IN_APP","PUSH"],
    idempotencyKey:"msg_001",
    smartOrchestration:true
});
```

---

# Get Notifications

```ts
await server.notifications.getNotifications({
    recipientId:"recipient_123",
    limit:10,
    page:0,
    orderBy:"desc"
});
```

---

# Mark Notification As Read

```ts
await server.notifications.markNotificationAsReadById({
    notificationId:"notification_123"
});
```

---

# Mark Multiple Notifications As Read

```ts
await server.notifications.markMultipleNotificationsAsReadById({
    notificationIds:[
        "notif_1",
        "notif_2"
    ]
});
```

---

# Mark All Notifications As Read

```ts
await server.notifications.markAllNotificationsAsReadByRecipientId({
    recipientId:"recipient_123"
});
```

---

# Get Unread Count

```ts
await server.notifications.getUnreadCountByRecipientId({
    recipientId:"recipient_123"
});
```

---

# Error Handling

The SDK normalizes backend API errors into SDK-specific error classes.

Current supported SDK errors:

* `AuthenticationError`
* `QuotaExceededError`
* `BaseAPIError`

Example:

```ts
import {
    AuthenticationError,
    QuotaExceededError
} from "@notifyflow/server-sdk";

try{

    await server.notifications.createNotification(...);

}
catch(error){

    if(error instanceof AuthenticationError)
    {
        console.log("Invalid API key");
    }

    if(error instanceof QuotaExceededError)
    {
        console.log("Monthly quota exceeded");
    }
}
```

---

# Smart Orchestration

When `smartOrchestration` is enabled, the NotifyFlow backend automatically selects the best delivery channel based on:

* recipient presence
* activity status
* available channels
* delivery optimization logic

Example:

```ts
smartOrchestration:true
```

---

# Idempotency

The SDK supports idempotent notification creation using:

```ts
idempotencyKey
```

This prevents duplicate notification creation during retries or repeated requests.

---

# Type Safety

The SDK is fully typed using TypeScript interfaces.

Developers receive:

* autocomplete
* compile-time validation
* strongly typed request payloads

---

# Internal Design Principles

The SDK follows several production-grade design principles:

* centralized transport abstraction
* resource-oriented API structure
* normalized error handling
* shared runtime configuration
* typed request contracts
* reusable query serialization

---

# Roadmap

Planned SDK features:

* retries with exponential backoff
* webhook APIs
* realtime APIs
* API key management
* telemetry hooks
* request interceptors
* SDK logging
* response typing improvements

---
