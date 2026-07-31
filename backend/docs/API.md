# Orlando API Contract

Base URL: `http://localhost:3000/api`  
Auth: `Authorization: Bearer <JWT>`

Response shape (success): body as documented.  
Errors: `{ "message": string, "errors"?: unknown }`

---

## Auth

### `POST /auth/signup`
Public. Creates `TENANT`.

Body:
```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "0501234567",
  "password": "Secret123!",
  "confirmPassword": "Secret123!"
}
```

Response `201`:
```json
{
  "user": { "id": "...", "email": "...", "name": "...", "phone": "...", "role": "TENANT" },
  "token": "jwt..."
}
```

### `POST /auth/login`
Body: `{ "email", "password" }` → `{ user, token }`

### `GET /auth/me`
Auth required → `{ user }`

---

## Chalets

### `GET /chalets`
Public. Query: `search`, `minPrice`, `maxPrice`, `capacity`, `page` (default 1), `perPage` (default 6).

Response:
```json
{
  "items": [/* Chalet with images[] urls, features[] */],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 12,
    "itemsPerPage": 6
  }
}
```

### `GET /chalets/featured`
Public. Returns first N active chalets (default 6).

### `GET /chalets/:id`
Public. Chalet details + `bookings` occupied ranges (non-cancelled: checkIn/checkOut/status).

### `POST /chalets` — ADMIN
Body: `{ name, description, location, price, capacity, rating?, features: string[], images: string[], isActive? }`

### `PUT /chalets/:id` — ADMIN
Same fields (partial or full).

### `DELETE /chalets/:id` — ADMIN
Soft-delete preferred: sets `isActive=false`. (Hard delete supported if no bookings — MVP soft.)

---

## Bookings

All require Auth.

### `POST /bookings` — TENANT | ADMIN
Body:
```json
{
  "chaletId": "...",
  "checkIn": "2026-08-01",
  "checkOut": "2026-08-03",
  "guestCount": 2,
  "specialRequests": "optional"
}
```

Server: availability check, price = nights × chalet.price, create Booking (`CONFIRMED` after stub payment), Payment SUCCESS, QrCode ACTIVE, Alert INFO.

Response `201`: booking + payment + active qrCode (token).

Conflicts overlapping dates → `409`.

Unauthenticated → `401`.

### `GET /bookings/:id`
Owner of booking or ADMIN. Includes payment + latest/active qr info.

### `GET /bookings` — ADMIN
Query: `status`, `chaletId`, `from`, `to`, `page`, `perPage`

### `PATCH /bookings/:id/status` — ADMIN
Body: `{ "status": "CONFIRMED" | "CANCELLED" | "PENDING" }`  
On `CANCELLED`: revoke active QRs.

---

## QR

### `POST /qr/validate` — ADMIN
Body: `{ "token": "..." }`

Validates window + status + booking not cancelled. On success marks `USED`.

Response success: `{ valid: true, booking: {...} }`  
Failure: `{ valid: false, reason: "USED" | "EXPIRED" | "REVOKED" | "NOT_FOUND" | "BOOKING_CANCELLED" }`

---

## Dashboard — ADMIN

### `GET /dashboard/stats`
```json
{
  "totalChalets": 24,
  "activeBookings": 18,
  "totalRevenue": 45600,
  "occupancyRate": 75
}
```

### `GET /dashboard/charts`
Monthly series: revenue, bookings, occupancy (last 6–12 months).

### `GET /dashboard/recent-bookings`
Latest N bookings with chaletName, customerName, checkIn, checkOut, status, amount.

### `GET /alerts`
List alerts (newest first).

### `PATCH /alerts/:id/read`
Marks `isRead: true`.

---

## Contact

### `POST /contact`
Public. Body: `{ name, email, phone, message }` → `201`

---

## Postman test order

1. `GET /chalets` without token → 200  
2. `POST /bookings` without token → 401  
3. Login admin → create chalet → list/featured  
4. Signup tenant → login → create booking → get confirmation  
5. Overlapping booking → 409  
6. Admin validate QR twice → second fails USED  
7. Admin dashboard stats/charts/recent/alerts  
8. Contact without token → 201  
