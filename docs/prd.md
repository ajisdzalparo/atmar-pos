# Product Requirements Document
## Coffee Shop POS & Table Ordering Platform

**Version:** 1.0  
**Status:** MVP Definition  
**Initial Market:** Coffee shops — Majalengka, Indonesia  
**Business Model:** Setup fee + recurring subscription per outlet  
**Deployment Model:** Multi-tenant / multi-outlet ready, MVP UI focused on single-outlet operation  
**Payment Gateway:** Midtrans  
**Primary Channel:** Web-based POS + Customer Self Ordering  
**Connectivity:** Online-first

---

# 1. Executive Summary

Produk ini adalah platform operasional coffee shop yang menggabungkan:

- Customer self-order melalui QR meja.
- POS.
- Table management.
- Table session.
- Online payment melalui Midtrans.
- Cash payment.
- Bar/kitchen routing.
- Kitchen Display System opsional.
- Kitchen/bar printing.
- Waiter operations.
- Reservation.
- Cash shift management.
- Transaction auditing.
- Reporting.
- Dynamic Role-Based Access Control.

Customer tidak perlu membuat akun.

Untuk dine-in, setiap meja memiliki QR unik. Customer melakukan scan QR, memilih produk, varian dan modifier, lalu membuat order.

Terdapat dua flow pembayaran utama.

### QRIS

```text
Scan QR Table
→ Select Menu
→ Checkout
→ Midtrans
→ QRIS Payment
→ Webhook Confirmed
→ Order Confirmed
→ Route to Station
→ Prepare
→ Ready
→ Served
```

### Cash

```text
Scan QR Table
→ Select Menu
→ Checkout
→ Select CASH
→ Order Confirmed
→ Route to Station
→ Prepare
→ Ready
→ Staff delivers order
→ Collect Cash
→ Confirm Cash Payment
→ Served/Paid
```

Dengan demikian, aturan pembayaran berbeda berdasarkan payment method.

**QRIS harus terverifikasi sebelum order diproses.**

**Cash dapat diproses terlebih dahulu dan ditagih ketika staff mengantar pesanan.**

Sistem dirancang sejak awal agar mendukung multi-outlet di database, tetapi pengalaman MVP berfokus pada operasional satu outlet untuk mengurangi complexity.

---

# 2. Product Vision

Membangun sistem operasional coffee shop yang memungkinkan customer:

> duduk → scan → pesan → bayar → menerima pesanan

dengan interaksi staff seminimal mungkin tanpa menghilangkan fleksibilitas operasional coffee shop.

Produk harus dapat digunakan pada beberapa pola outlet:

### Coffee shop sederhana

```text
BAR + CASHIER
```

satu station dapat melakukan dua fungsi sekaligus.

### Coffee shop lebih besar

```text
CASHIER
BAR
KITCHEN
```

masing-masing memiliki tugas berbeda.

### Coffee shop dengan KDS

```text
Order
├── BAR DISPLAY
└── KITCHEN DISPLAY
```

### Coffee shop tanpa KDS

```text
Order
├── BAR PRINTER
└── KITCHEN PRINTER
```

Karena itu arsitektur tidak boleh mengasumsikan bahwa setiap outlet memiliki struktur operasional yang sama.

---

# 3. Problem Statement

Coffee shop dapat mengalami beberapa masalah:

1. Customer harus menunggu waiter untuk memesan.
2. Order manual berpotensi salah catat.
3. Pesanan minuman dan makanan harus diteruskan ke station berbeda.
4. Sulit mengetahui status meja secara realtime.
5. Pembayaran cash sulit diaudit jika tidak terhubung dengan order.
6. Owner membutuhkan visibility terhadap transaksi meskipun tidak berada di outlet.
7. Coffee shop memiliki struktur staff berbeda-beda.
8. Beberapa outlet mempunyai KDS sementara outlet lain hanya menggunakan printer.
9. POS generik sering memiliki terlalu banyak fitur yang belum tentu dibutuhkan coffee shop kecil-menengah.

Kompetitor nasional sudah membuktikan demand terhadap flow self-order. Moka mendukung pelanggan scan QR, memesan dan membayar dari meja sebelum pesanan masuk POS. Majoo juga memiliki web order dengan QR meja serta pembayaran online. Olsera menawarkan online dine-in, reservation, manajemen meja, waiter mode, kitchen display dan routing printing.

Produk ini karena itu **tidak memiliki keunggulan hanya karena mempunyai QR ordering**.

Diferensiasi awal harus datang dari:

- implementasi lokal,
- onboarding,
- fleksibilitas workflow,
- support,
- configurability,
- harga,
- dan kemampuan menyesuaikan operasional coffee shop target.

---

# 4. Product Goals

## Primary Goals

### G1 — Reduce ordering friction

Customer dapat membuat order tanpa menunggu waiter.

Target:

```text
Scan QR
→ Menu
→ Cart
→ Checkout
```

tanpa login.

---

### G2 — Ensure transaction traceability

Setiap order mempunyai:

- source,
- table,
- table session,
- payment,
- staff interaction,
- timestamp,
- audit history.

---

### G3 — Route orders correctly

Produk harus otomatis diarahkan ke preparation station.

Contoh:

```text
Cafe Latte
→ BAR

French Fries
→ KITCHEN
```

---

### G4 — Allow flexible coffee shop operations

Outlet dapat menggunakan:

```text
Bar only
Bar + Cashier
Bar + Kitchen
Bar + Kitchen + Cashier
```

tanpa perubahan source code.

---

### G5 — Provide remote owner visibility

Owner dapat melihat:

- revenue,
- orders,
- payment,
- cash,
- void,
- refund,
- staff activity,
- outlet performance.

---

# 5. Non-Goals — MVP

MVP **tidak** akan memiliki:

- ingredient inventory,
- recipe costing,
- purchasing,
- supplier,
- payroll,
- accounting,
- loyalty,
- CRM,
- delivery management,
- marketplace integration,
- advanced promotion engine,
- scheduled menu,
- product images,
- EDC integration,
- AI features,
- native mobile application,
- advanced offline synchronization.

Ini sengaja dilakukan agar produk tidak berubah menjadi ERP F&B sebelum product-market fit terbukti.

---

# 6. Success Metrics

## Business Metrics

### Pilot

Target awal:

```text
3 pilot coffee shops
```

Validasi:

- minimum 1 outlet menjadi paying customer,
- minimum 100 real orders diproses,
- minimum 30% dine-in transaction menggunakan QR self-order.

---

## Product Metrics

Track:

### Ordering

- QR scans.
- Menu sessions.
- Add-to-cart rate.
- Checkout rate.
- Payment completion rate.
- Order completion rate.

### Operational

- average order → confirmed.
- confirmed → preparing.
- preparing → ready.
- ready → served.
- cancelled order rate.
- void rate.
- refund rate.

### Payment

- QRIS success rate.
- QRIS expiration rate.
- cash outstanding.
- cash discrepancy.

---

# 7. Target Users

## 7.1 Customer

Tidak mempunyai account.

Capabilities:

- scan QR,
- browse menu,
- add items,
- customize item,
- checkout,
- choose payment,
- see payment status,
- see order status,
- add additional orders,
- call waiter.

---

## 7.2 Owner

Needs:

- remote monitoring,
- reports,
- outlet configuration,
- payment configuration,
- staff/access configuration,
- audit visibility.

---

## 7.3 Manager

Role opsional yang dapat dibuat outlet.

Access diberikan melalui permission system.

---

## 7.4 Cashier

Depending on outlet structure:

- standalone cashier,
- atau barista + cashier.

---

## 7.5 Waiter

Responsibilities dapat meliputi:

- cash collection,
- customer request,
- delivering order,
- table operation,
- reservation handling.

---

## 7.6 Preparation Staff

Contoh:

```text
BARISTA
KITCHEN
```

Tidak harus merupakan fixed system role.

Akses berasal dari permissions dan station assignment.

---

# 8. Core Domain Model

Model utama:

```text
Tenant / Business
│
├── Outlet
│   │
│   ├── Area
│   │   └── Table
│   │        └── Table Session
│   │             └── Order
│   │                  ├── Order Item
│   │                  │    ├── Variant
│   │                  │    └── Modifier
│   │                  │
│   │                  └── Payment
│   │
│   ├── Preparation Stations
│   │
│   ├── Printers
│   │
│   └── Staff
│
├── Products
├── Categories
├── Roles
└── Permissions
```

---

# 9. User Journey

## 9.1 Dine-in QR Ordering

```text
Customer enters cafe
↓
Gets a table
↓
Scan table QR
↓
System identifies table
↓
Open/Create Table Session
↓
Browse menu
↓
Configure products
↓
Cart
↓
Checkout
↓
Payment selection
```

Kemudian flow bercabang.

---

# 10. QRIS Payment Journey

```text
Checkout
↓
Select QRIS
↓
Create Order
↓
Order = WAITING_PAYMENT
↓
Create Midtrans transaction
↓
Customer pays
↓
Midtrans notification/webhook
↓
Backend verifies notification
↓
Payment = PAID
↓
Order = CONFIRMED
↓
Split items by preparation station
↓
BAR / KITCHEN
```

Midtrans Snap memungkinkan payment interface diintegrasikan melalui popup atau hosted payment page dan mendukung beberapa metode pembayaran melalui satu integrasi. Untuk QRIS, Midtrans mendukung dynamic QR dan notification handling.

QRIS dinamis juga menghindari customer memasukkan nominal secara manual seperti pada QRIS statis.

---

# 11. Cash Payment Journey

Cash memiliki behaviour berbeda.

```text
Checkout
↓
Select CASH
↓
Create Order
↓
Payment = CASH_DUE
↓
Order = CONFIRMED
↓
Send items to BAR / KITCHEN
↓
Prepare
↓
Ready
↓
Waiter receives notification
↓
Waiter delivers order
↓
Collect cash
↓
Confirm payment
↓
Payment = PAID
↓
Order eventually = SERVED
```

Cash payment **tidak menghalangi preparation**.

Namun cash transaction tetap harus terhubung dengan:

- order,
- table,
- table session,
- staff collector,
- shift,
- amount,
- tender,
- change,
- timestamp.

---

# 12. Additional Order Journey

Customer dapat order berkali-kali.

Contoh:

```text
TABLE 07

Table Session TS001

├── ORD001 — QRIS — PAID
├── ORD002 — CASH — DUE
└── ORD003 — QRIS — PAID
```

Customer tidak membuat table session baru selama session masih aktif.

---

# 13. Table Session

## Purpose

Menghubungkan seluruh aktivitas customer selama penggunaan satu meja.

Fields:

```text
id
outlet_id
table_id

status
OPEN
CLOSING
CLOSED

guest_count
opened_at
closed_at
opened_by
closed_by
```

---

## Rules

Satu meja hanya boleh mempunyai satu active table session.

```text
Table 07

OPEN SESSION
→ tidak boleh membuat active session kedua
```

Additional order masuk ke session existing.

---

# 14. Table Management

## Table Status

Recommended:

```text
AVAILABLE
OCCUPIED
RESERVED
```

Derived indicators dapat ditampilkan:

```text
PAYMENT DUE
ORDER READY
CALL WAITER
```

Jangan campurkan indikator operasional menjadi status meja utama kalau dapat dihitung dari entity lain.

---

## Area

Contoh:

```text
Indoor
Outdoor
Smoking
Rooftop
VIP
```

Relationship:

```text
Outlet
↓
Area
↓
Tables
```

---

# 15. Reservation Module

Reservation masuk MVP tetapi dibuat sederhana.

## Information

```text
reservation_code
outlet
customer_name
phone
reservation_date
reservation_time
guest_count
table_id (optional initially)
notes

status
PENDING
CONFIRMED
ARRIVED
CANCELLED
NO_SHOW
COMPLETED
```

---

## Flow

```text
Create Reservation
↓
CONFIRMED
↓
Customer Arrives
↓
Assign/Confirm Table
↓
ARRIVED
↓
Open Table Session
```

---

## Business Rules

Tidak boleh ada overlapping confirmed reservation pada meja yang sama berdasarkan configurable expected duration.

MVP tidak membutuhkan deposit reservation.

MVP tidak membutuhkan customer account.

---

# 16. Menu Management

## Category

Fields:

```text
id
outlet_id / business_id
name
sort_order
is_active
```

---

## Product

MVP fields:

```text
id
category_id
station_id

sku
name
description
base_price

is_active
is_available
```

Tidak ada product image pada MVP.

---

# 17. Product Variant

Contoh:

```text
Cafe Latte
```

Variant group:

```text
SIZE

Regular
Large +5k
```

dan:

```text
TEMPERATURE

Hot
Ice +3k
```

---

## Rules

Variant group mempunyai:

```text
required
minimum_selection
maximum_selection
```

Contoh:

```text
Size
required = true
min = 1
max = 1
```

---

# 18. Product Modifier

Modifier merupakan pilihan tambahan.

Contoh:

```text
Extra Shot +5k
Oat Milk +7k
Caramel +3k
```

Dapat:

```text
required = false
max_selection = configurable
```

---

# 19. Product Availability

Tidak menggunakan inventory ingredients pada MVP.

Product hanya mempunyai:

```text
AVAILABLE
SOLD_OUT
INACTIVE
```

Barista/authorized staff dapat menandai:

```text
Cafe Latte → SOLD OUT
```

Menu customer harus memperbarui availability.

---

# 20. Cart

Cart disimpan sementara pada browser/server berdasarkan table session.

Cart information:

```text
product
variants
modifiers
quantity
notes
```

Harga frontend bersifat informational.

**Backend harus menghitung ulang seluruh harga ketika checkout.**

Frontend tidak boleh menjadi authority untuk:

- base price,
- modifier price,
- tax,
- service,
- total.

---

# 21. Tax & Service Charge

Configurable per outlet.

Example configuration:

```text
Tax
enabled = true
rate = 10%

Service
enabled = true
rate = 5%
```

Harus mendukung:

```text
inclusive
exclusive
```

Untuk MVP, urutan calculation harus ditentukan di configuration/domain rules dan tidak hard-coded pada UI.

Order menyimpan snapshot:

```text
subtotal
discount_total
service_charge
tax_total
grand_total
```

serta configuration snapshot untuk audit historis.

---

# 22. Preparation Stations

Station merupakan entity dynamic.

Contoh:

```text
BAR
KITCHEN
DESSERT
```

Product wajib mempunyai preparation station.

Contoh:

```text
Americano → BAR
Nasi Goreng → KITCHEN
Croissant → KITCHEN
```

---

# 23. Station Routing

Order:

```text
ORD001

2x Latte
1x Nasi Goreng
1x Fries
```

System:

```text
BAR TICKET

2x Latte
```

dan:

```text
KITCHEN TICKET

1x Nasi Goreng
1x Fries
```

Tetapi semuanya masih satu customer order.

---

# 24. KDS / Printing Strategy

KDS **tidak wajib digunakan outlet**.

Configuration per station:

```text
output_mode

DISPLAY
PRINTER
DISPLAY_AND_PRINTER
NONE
```

Contoh Cafe A:

```text
BAR → DISPLAY
KITCHEN → DISPLAY
```

Cafe B:

```text
BAR → PRINTER
KITCHEN → PRINTER
```

Cafe C:

```text
BAR → DISPLAY
KITCHEN → PRINTER
```

---

# 25. Kitchen Display System

Jika digunakan:

```text
NEW
↓
PREPARING
↓
READY
```

`SERVED` berada pada order/service layer, bukan preparation station jika operational implementation memungkinkan.

Card example:

```text
TABLE 07
ORD-1028
3 minutes

2x Cafe Latte
   Ice
   Extra Shot

[ START ]
```

---

# 26. Order Status

Recommended order state:

```text
DRAFT

WAITING_PAYMENT
CONFIRMED

IN_PREPARATION
READY
SERVED

CANCELLED
VOIDED
```

Cash dapat:

```text
CONFIRMED
```

meskipun payment masih:

```text
CASH_DUE
```

---

# 27. Preparation Status

Jangan menggunakan `order.status` untuk menentukan progress masing-masing station.

Gunakan:

```text
order_item_preparations
```

atau:

```text
station_tickets
```

Status:

```text
NEW
PREPARING
READY
```

Karena satu order dapat:

```text
BAR = READY
KITCHEN = PREPARING
```

---

# 28. Payment Model

Payment status:

```text
PENDING
CASH_DUE
PAID
FAILED
EXPIRED
REFUNDED
PARTIALLY_REFUNDED
VOIDED
```

Payment method:

```text
QRIS
CASH
```

Phase 2:

```text
EDC
```

---

# 29. Midtrans Integration

MVP menggunakan Midtrans.

Recommended initial implementation:

```text
Midtrans Snap
```

Flow:

```text
Backend
↓
Create Snap Transaction
↓
Return token/payment URL
↓
Customer pays
↓
Midtrans webhook
↓
Backend validates
↓
Payment update
```

Midtrans Snap menyediakan hosted/payment interface sehingga MVP tidak perlu membangun seluruh payment UI dan integration dari nol.

---

# 30. Midtrans Security Rules

Frontend success callback **tidak pernah dianggap bukti pembayaran**.

Source of truth:

```text
verified server-side payment notification
```

Backend wajib:

1. Verify notification authenticity.
2. Match provider order ID.
3. Match internal order.
4. Validate amount.
5. Ensure idempotency.
6. Update payment atomically.
7. Record raw gateway event.

---

# 31. Cash Payment

When customer chooses CASH:

```text
payments.status = CASH_DUE
```

Order tetap diteruskan.

Staff yang mengantar:

```text
Collect Payment
```

Input:

```text
Invoice: 75,000

Tender:
100,000

System:
Change 25,000
```

Staff hanya boleh input:

```text
tender_amount
```

Tidak boleh mengubah invoice amount.

---

# 32. Cash Shift

Cash payment wajib tergabung ke active staff/cash shift.

## Open Shift

```text
Opening Cash
Rp500,000
```

## During Shift

Track:

```text
Cash Sales
Cash Refund
Cash In
Cash Out
```

## Close Shift

```text
Opening Cash
+ Cash Sales
+ Cash In
- Cash Refund
- Cash Out
────────────────
Expected Cash
```

User memasukkan:

```text
Actual Cash
```

System menghasilkan:

```text
Difference
```

Contoh:

```text
Expected  Rp2,500,000
Actual    Rp2,480,000

Variance  -Rp20,000
```

---

# 33. Cash Security Rules

Staff tidak boleh:

- delete paid payment,
- edit payment amount,
- edit transaction after close shift,
- silently change payment method.

Correction harus melalui:

```text
VOID
REFUND
ADJUSTMENT
```

dan menghasilkan audit log.

---

# 34. Void

Void tersedia.

Void dan Cancel dibedakan.

## Cancel

Order belum dibayar / belum masuk processing tertentu.

## Void

Transaksi/order sudah tercatat secara operasional tetapi perlu dibatalkan secara formal.

Void membutuhkan:

```text
reason
performed_by
performed_at
approval (depending permission)
```

Original transaction tidak dihapus.

---

# 35. Refund

Refund QRIS mengikuti capability/payment flow Midtrans.

Internal state tetap harus mencatat:

```text
requested
approved
processed
failed
```

Cash refund:

```text
cash_refund
↓
cash shift adjustment
```

Semua refund memiliki:

```text
reason
amount
authorized_by
performed_by
timestamp
```

---

# 36. Dynamic Role & Permission

Role tidak hard-coded sebagai:

```text
OWNER
WAITER
CASHIER
```

Role merupakan configurable entity.

Example:

```text
ROLE
Barista Cashier
```

Permissions:

```text
order.view
order.create
order.update

payment.view
payment.collect_cash
payment.refund

table.manage

reservation.manage

product.manage

station.bar.access

report.view

user.manage

role.manage

void.create
void.approve
```

Dengan model ini Cafe A dapat mempunyai:

```text
BARISTA CASHIER
```

sedangkan Cafe B:

```text
BARISTA
CASHIER
```

secara terpisah.

---

# 37. Permission Groups

Suggested:

### Dashboard

```text
dashboard.view
```

### Orders

```text
order.view
order.create
order.cancel
order.void
```

### Payments

```text
payment.view
payment.collect_cash
payment.refund
```

### Tables

```text
table.view
table.manage
table.session.manage
```

### Reservation

```text
reservation.view
reservation.manage
```

### Kitchen

```text
station.view
station.update
```

### Products

```text
product.view
product.manage
```

### Reports

```text
report.sales
report.payment
report.staff
report.audit
```

### Administration

```text
user.manage
role.manage
outlet.manage
setting.manage
```

---

# 38. Waiter Dashboard

Optional depending outlet.

Dashboard:

```text
ACTIVE REQUESTS

T07
Cash payment due
Rp75,000

T12
Order ready

T05
Customer called waiter
```

Actions:

```text
Accept
Complete
Collect Cash
Mark Served
```

---

# 39. Call Waiter

Customer may trigger:

```text
CALL WAITER
```

Request types future-proofed:

```text
GENERAL
PAYMENT
ASSISTANCE
```

MVP may expose one generic button.

Request lifecycle:

```text
OPEN
ACKNOWLEDGED
COMPLETED
```

---

# 40. Reservation

Admin/waiter dashboard contains:

```text
Today Reservations
Upcoming
No Show
Completed
Cancelled
```

Reservation does not create table session until customer arrives.

---

# 41. POS

POS remains available for staff-created order.

Use cases:

- customer cannot use phone,
- staff assists customer,
- operational fallback,
- counter order.

POS-generated orders use the same backend Order domain.

Never create two separate order engines for:

```text
self order
```

and:

```text
POS
```

Source field:

```text
CUSTOMER_QR
POS
```

---

# 42. Receipt Printing

Receipt printing included.

Possible receipt:

```text
Coffee Shop XYZ

ORD-00128
Table 07

2 Cafe Latte       50,000
1 Fries            25,000

Subtotal           75,000
Tax                 7,500
Service             3,750

Total              86,250

Payment
QRIS

PAID
```

Printing architecture should be abstracted from business logic.

Example:

```text
PrintJob
↓
Print Agent
↓
Printer
```

rather than backend directly assuming a specific printer.

---

# 43. Customer UI

Primary navigation should stay minimal.

### Menu

```text
Cafe Name

Table 07

[Coffee]
[Food]
[Dessert]

Products...
```

No account navigation.

---

# 44. Product Detail

```text
Cafe Latte
Rp25,000

Temperature *
○ Hot
● Ice +3k

Size *
● Regular
○ Large +5k

Add-ons
□ Extra Shot +5k
□ Oat Milk +7k

Note
[ Less sugar ]

[ Add to Cart ]
```

---

# 45. Checkout

```text
Table 07

2 Cafe Latte
1 French Fries

Subtotal
Tax
Service
────────────
Total

Payment

[ QRIS ]
[ CASH ]

[ PLACE ORDER ]
```

---

# 46. Order Tracking

Customer sees:

```text
Order Received
Preparing
Ready
Served
```

For QRIS before payment:

```text
Waiting for Payment
```

For cash:

```text
Cash payment will be collected by staff
```

---

# 47. Admin Navigation

Suggested sidebar:

```text
Dashboard

POS

Orders

Tables
├── Table Map
├── Areas
└── Reservations

Operations
├── Waiter
├── Preparation
└── Cash Shifts

Products
├── Products
├── Categories
└── Modifiers

Transactions
├── Payments
├── Refunds
└── Voids

Reports

Management
├── Users
├── Roles & Permissions
└── Stations

Settings
├── Outlet
├── Tax & Service
├── Payment
├── Printing
└── QR Tables
```

UI visibility follows permission.

---

# 48. Dashboard

Owner dashboard MVP:

```text
Today Sales
Orders
Average Order Value

Payment Split
QRIS
Cash

Top Products

Active Tables

Cash Outstanding

Refund / Void
```

---

# 49. Reporting

MVP reports required:

## Sales

- per day,
- date range,
- per outlet,
- per hour.

## Products

- units sold,
- gross sales,
- category.

## Payment

- QRIS,
- cash,
- refund,
- outstanding cash.

## Staff

- cash collected,
- orders handled,
- void initiated,
- refund initiated.

## Cash

- shift,
- expected cash,
- actual cash,
- variance.

## Audit

- voids,
- refunds,
- sensitive changes.

---

# 50. Audit Log

Mandatory for sensitive operations.

Structure:

```text
actor_user_id
outlet_id
action
entity_type
entity_id

old_value
new_value

reason

ip_address
user_agent

created_at
```

Track at minimum:

- role changes,
- permission changes,
- product price changes,
- tax changes,
- service changes,
- cash confirmation,
- payment changes,
- refunds,
- voids,
- table transfers,
- reservation changes,
- closing shift.

---

# 51. Functional Requirements Summary

| Module | MVP |
|---|---|
| Customer QR Order | Must |
| Menu | Must |
| Variants | Must |
| Modifiers | Must |
| Table Session | Must |
| Multi-area | Must |
| QRIS Midtrans | Must |
| Cash | Must |
| Station Routing | Must |
| KDS | Must/Configurable |
| Kitchen Printing | Must/Configurable |
| Receipt Printing | Must |
| Dynamic RBAC | Must |
| Cash Shift | Must |
| Reservation | Must |
| Waiter Dashboard | Should |
| Call Waiter | Should |
| Refund | Must |
| Void | Must |
| Reports | Must |
| EDC | Phase 2 |
| Inventory | Won't MVP |

---

# 52. Database Design

Recommended relational database: PostgreSQL.

Core tables:

```text
tenants

outlets
outlet_settings

areas
tables
table_sessions

reservations

categories
products

variant_groups
variants
product_variant_groups

modifier_groups
modifiers
product_modifier_groups

preparation_stations

orders
order_items
order_item_variants
order_item_modifiers

station_tickets
station_ticket_items

payments
payment_gateway_transactions
cash_payments

cash_shifts
cash_movements

refunds
voids

users
roles
permissions
role_permissions
user_roles

waiter_requests

printers
station_output_configs
print_jobs

audit_logs
```

---

# 53. Important Database Constraints

### Active table session

Prevent multiple active sessions on same table.

Conceptually:

```text
UNIQUE(table_id)
WHERE status = OPEN
```

---

### Gateway order ID

Must be unique.

```text
provider_order_id UNIQUE
```

---

### Gateway transaction ID

```text
transaction_id UNIQUE
```

where applicable.

---

### Role/Permission

Composite uniqueness:

```text
role_id + permission_id
```

---

# 54. Order Snapshot Strategy

Historical transaction must not depend on current product master.

`order_items` stores snapshot:

```text
product_id
product_name
sku
base_price

variant_total
modifier_total

qty
unit_price
total_price
```

If tomorrow:

```text
Latte 25k → 28k
```

yesterday's order remains 25k.

Same principle applies to:

- tax,
- service,
- modifiers.

---

# 55. REST API Design

Prefix:

```text
/api/v1
```

---

## Public Customer

```text
GET  /public/tables/{token}
GET  /public/menu
GET  /public/table-session

POST /public/orders
GET  /public/orders/{orderToken}

POST /public/orders/{id}/payment
POST /public/waiter-requests
```

---

## Midtrans

```text
POST /webhooks/midtrans
```

Not authenticated using normal user JWT.

Must use provider verification mechanism.

---

## Auth

```text
POST /auth/login
POST /auth/logout
GET  /auth/me
```

---

## Tables

```text
GET    /tables
POST   /tables
PATCH  /tables/{id}
DELETE /tables/{id}

POST /tables/{id}/open-session
POST /tables/{id}/close-session
POST /tables/{id}/transfer-session
```

---

## Reservations

```text
GET    /reservations
POST   /reservations
PATCH  /reservations/{id}
POST   /reservations/{id}/arrive
POST   /reservations/{id}/cancel
```

---

## Products

```text
GET    /products
POST   /products
GET    /products/{id}
PATCH  /products/{id}

PATCH /products/{id}/availability
```

---

## Orders

```text
GET  /orders
GET  /orders/{id}

POST /orders/{id}/cancel
POST /orders/{id}/void
POST /orders/{id}/served
```

---

## Stations

```text
GET /stations
POST /stations

GET /stations/{id}/tickets

POST /station-tickets/{id}/start
POST /station-tickets/{id}/ready
```

---

## Payments

```text
GET  /payments

POST /payments/{id}/collect-cash
POST /payments/{id}/refund
```

---

## Cash Shift

```text
POST /cash-shifts/open
GET  /cash-shifts/current
POST /cash-shifts/{id}/close
POST /cash-shifts/{id}/movement
```

---

## Reporting

```text
GET /reports/sales
GET /reports/products
GET /reports/payments
GET /reports/staff
GET /reports/cash
```

---

# 56. API Idempotency

Critical operations need idempotency.

Especially:

```text
POST /orders
POST /payment
Midtrans webhook
cash confirmation
refund
```

Customer double-tap must not result in:

```text
Order A
Order B
```

for the same checkout attempt.

Recommended:

```text
Idempotency-Key
```

---

# 57. Concurrency Requirements

Potential cases:

### Product becomes sold out during checkout

Backend rejects affected item.

### Staff and customer interact simultaneously

Server state wins.

### Two staff collect same cash order

Use transactional locking/status guard.

### Midtrans webhook arrives more than once

Webhook handler must be idempotent.

---

# 58. Non-Functional Requirements

## Availability

Target MVP:

```text
99.5%+
```

not contractual SLA initially.

---

## Performance

Target:

```text
Menu initial load < 2.5 sec
API common requests < 500ms p95
Operational realtime events < 2 sec
```

under expected MVP workload.

---

## Scalability

Database already scoped by:

```text
tenant_id
outlet_id
```

where appropriate.

Architecture should initially remain modular monolith rather than microservices.

---

# 59. Recommended Architecture

```text
CUSTOMER WEB
      │
      │
ADMIN/POS WEB
      │
      ▼
   BACKEND API
      │
 ┌────┼─────────────┐
 │    │             │
 ▼    ▼             ▼
DB   REDIS      MIDTRANS
 │
 ▼
Realtime Event Layer
 │
 ├── POS
 ├── Waiter
 └── Kitchen
```

---

# 60. Technical Recommendation

Given developer capabilities and solo-founder constraint:

### Frontend

```text
Next.js
TypeScript
Tailwind
Shadcn
TanStack Query
```

### Backend

Recommended:

```text
Laravel
```

for this product because the domain contains:

- transactional business rules,
- jobs,
- queues,
- authorization,
- reporting,
- webhook processing,
- relational data.

### Database

```text
PostgreSQL
```

### Cache / Queue

```text
Redis
```

not necessarily required on day one, but recommended once realtime/jobs are introduced.

### Realtime

```text
SSE
```

is sufficient for many one-direction operational updates.

WebSocket may be used if bidirectional realtime needs grow.

---

# 61. Modular Monolith

Do not use microservices in MVP.

Suggested domains:

```text
Identity
Catalog
Ordering
Table
Reservation
Payment
Preparation
Cash
Reporting
Printing
Audit
```

One deployable backend.

This is significantly easier to maintain as a solo founder.

---

# 62. Multi-Tenant Architecture

Every business-sensitive entity must resolve tenant scope server-side.

Never trust:

```text
tenant_id
```

coming directly from frontend authorization context.

User:

```text
user
↓
membership
↓
tenant
↓
outlet access
```

---

# 63. Online-First Behaviour

MVP does not promise offline ordering.

When API/server cannot be reached:

Customer:

```text
We're having trouble connecting.
Please contact staff to place your order.
```

POS:

```text
Connection Lost
```

Do not silently queue financial transactions offline.

Especially:

- payment,
- cash confirmation,
- refund,
- void.

---

# 64. Security Review

## Authentication

Staff:

- secure login,
- server session/JWT,
- secure token storage.

Customer:

- no account.

---

## Table QR Token

Never expose predictable:

```text
/table/1
```

Use random public token.

Example:

```text
/t/qK82xP9...
```

Token identifies table but does not grant administrative capability.

---

## Price Security

Backend calculates:

- prices,
- modifiers,
- tax,
- service,
- discount,
- total.

Never trust frontend totals.

---

## Authorization

Every staff endpoint performs:

```text
authentication
+
tenant scope
+
outlet scope
+
permission check
```

---

## Sensitive Operations

Require explicit permissions for:

- refund,
- void,
- tax configuration,
- role configuration,
- closing shift,
- price changes.

---

# 65. Payment Security

Never store:

- card credentials,
- payment account secrets in browser.

Midtrans server key remains backend-only.

Webhook logs should redact sensitive data.

---

# 66. Printing Security

If local print bridge is introduced:

- authenticated connection,
- restricted outlet/device binding,
- no arbitrary command execution,
- signed/authenticated print jobs.

---

# 67. Edge Case Checklist

## Ordering

- [ ] Customer double submit.
- [ ] Product sold out during checkout.
- [ ] Product price changed during open cart.
- [ ] Modifier removed during checkout.
- [ ] Table disabled.
- [ ] QR from old table configuration.
- [ ] Table session closed while customer still has page open.
- [ ] Multiple customers order from same table simultaneously.

---

## QRIS

- [ ] Payment pending.
- [ ] Payment success.
- [ ] Payment failed.
- [ ] Payment expired.
- [ ] Duplicate webhook.
- [ ] Webhook before browser callback.
- [ ] Browser callback before webhook.
- [ ] Wrong amount.
- [ ] Unknown provider order ID.
- [ ] Customer closes payment page.
- [ ] Customer retries payment.

---

## Cash

- [ ] Staff collects exact cash.
- [ ] Staff receives overpayment/change.
- [ ] Staff attempts duplicate collection.
- [ ] Order served but cash remains outstanding.
- [ ] Shift closes with cash outstanding.
- [ ] Cash refund.
- [ ] Cash variance.
- [ ] Staff changes shift.

---

## Table

- [ ] Two active sessions.
- [ ] Move table.
- [ ] Merge unsupported.
- [ ] Reservation overlaps.
- [ ] Customer sits at reserved table.
- [ ] Table becomes unavailable.

---

## Kitchen

- [ ] BAR ready but KITCHEN preparing.
- [ ] One station offline.
- [ ] Printer unavailable.
- [ ] Duplicate print.
- [ ] KDS reconnect.
- [ ] Item cancelled after preparation starts.

---

## Reservation

- [ ] No show.
- [ ] Late arrival.
- [ ] Table changed.
- [ ] Walk-in occupies reserved table.
- [ ] Reservation cancelled.

---

# 68. Competitor Analysis

## Moka

Documented capabilities include QR dine-in where customer scans, orders and pays before the transaction enters POS.

**Implication:** QR self-order cannot be considered a unique differentiator.

---

## Majoo

Majoo supports table/web ordering, QR menu and QRIS flows, including dynamic and static implementations.

**Implication:** payment + web ordering is already established.

---

## Olsera

Olsera advertises dine-in ordering, reservation, table/waiter management, kitchen display and printing, product management and broader restaurant features.

**Implication:** competing feature-for-feature against mature POS vendors would require excessive scope.

---

# 69. Feature Gap Analysis

The MVP intentionally does **not** attempt parity with mature platforms.

Major competitor capabilities that may be missing:

```text
Inventory
Recipe/BOM
Purchasing
Supplier
CRM
Loyalty
Promotion engine
Delivery
Marketplace
Payroll
Accounting
Advanced analytics
Native application
```

This is acceptable for validation.

Initial wedge:

```text
coffee-shop-specific workflow
+
QR ordering
+
payment
+
cash controls
+
station routing
+
local implementation/support
```

---

# 70. Positioning Hypothesis

Do not sell as:

> aplikasi kasir.

Test positioning:

> Customer pesan langsung dari meja, pembayaran tercatat, pesanan otomatis masuk ke bar atau kitchen, dan owner bisa memantau seluruh transaksi.

This remains a hypothesis until validated with paying coffee shops.

---

# 71. MoSCoW Prioritization

## MUST

- Multi-tenant foundation.
- Single-outlet MVP UI.
- Areas.
- Tables.
- QR table.
- Table sessions.
- Customer self-order.
- Categories.
- Products.
- Variants.
- Modifiers.
- Product availability.
- Tax.
- Service charge.
- Midtrans.
- QRIS.
- Cash payment.
- Cash shift.
- Orders.
- Preparation stations.
- Routing.
- KDS support.
- Printing support.
- Dynamic roles.
- Permissions.
- Reservation.
- Void.
- Refund.
- Reports.
- Audit log.
- Receipt printing.

---

## SHOULD

- Waiter dashboard.
- Call waiter.
- Table transfer.
- Display + printer simultaneously.
- Detailed hourly reports.
- Staff performance report.

---

## COULD

- Reservation public page.
- Customer nickname.
- Order ready notification.
- QR regeneration.
- Advanced dashboard charts.

---

## WON'T — MVP

- Inventory.
- Ingredients.
- Purchasing.
- Suppliers.
- EDC integration.
- Product images.
- Scheduled products.
- Loyalty.
- CRM.
- Accounting.
- Payroll.
- AI.
- Delivery.
- Marketplace.
- Offline financial transaction sync.

---

# 72. Engineering Complexity Estimate

Scale:

```text
S = low
M = moderate
L = high
XL = very high
```

| Module | Complexity |
|---|---:|
| Authentication | M |
| RBAC | L |
| Product/Menu | M |
| Variants/Modifiers | M |
| Areas/Tables | M |
| Table Session | M |
| Customer Ordering | L |
| Midtrans | L |
| Cash Payment | M |
| Cash Shift | L |
| Station Routing | L |
| KDS | L |
| Printing | L |
| Reservation | M |
| Refund/Void | L |
| Reports | M |
| Audit | M |
| Multi-Tenant foundation | L |

Overall MVP:

**XL for one developer if built simultaneously.**

Therefore development must be staged.

---

# 73. Solo Founder Optimization

Build vertical slices.

Do **not** build:

```text
all master data
↓
all backend
↓
all frontend
↓
integration
```

Instead:

### Slice 1

```text
Table
→ QR
→ Menu
→ Order
```

### Slice 2

```text
Order
→ QRIS
→ webhook
→ confirmed
```

### Slice 3

```text
Confirmed
→ station routing
→ kitchen
→ ready
```

### Slice 4

```text
Cash
→ collect
→ shift
```

### Slice 5

```text
Reservation
Reports
RBAC
Audit
```

Each slice should work end-to-end before moving forward.

---

# 74. UI Component Breakdown

## Customer

```text
TableHeader
CategoryTabs
ProductCard
ProductDetailSheet
VariantSelector
ModifierSelector
CartDrawer
CheckoutSummary
PaymentSelector
QRISPayment
OrderTracker
WaiterCallButton
```

---

## POS

```text
POSProductGrid
POSCategoryTabs
POSCart
TableSelector
PaymentModal
OrderSummary
ReceiptDialog
```

---

## Table

```text
AreaTabs
TableGrid
TableCard
TableSessionDrawer
ReservationBadge
```

---

## Kitchen

```text
StationTabs
TicketColumn
TicketCard
PreparationTimer
```

---

## Reports

```text
DateFilter
MetricCards
SalesChart
PaymentBreakdown
ProductTable
CashVarianceTable
```

---

# 75. UX Principles

## Customer

No login.

No unnecessary fields.

Do not request phone/name unless needed for a specific feature.

Primary actions large and mobile-friendly.

---

## Staff

Operational screens prioritize:

```text
speed
status clarity
touch target size
```

over decorative design.

---

## KDS

Must be readable from distance.

Avoid dense tables.

Use clear states:

```text
NEW
PREPARING
READY
```

---

# 76. Accessibility Review

Minimum:

- semantic HTML,
- readable font size,
- sufficient contrast,
- keyboard support for admin,
- form labels,
- status not represented by color alone,
- minimum touch targets,
- screen reader labels for customer checkout.

---

# 77. SEO Review

Public ordering pages do not require SEO optimization as primary acquisition channel.

Recommended:

```text
noindex
```

for table-specific ordering URLs.

Marketing site/product landing page should be separately optimized for SEO.

---

# 78. Performance & Scalability Review

Initial architecture should easily support first pilot outlets.

Potential hotspots:

- realtime kitchen events,
- reports,
- menu traffic,
- payment webhooks.

Avoid premature infrastructure optimization.

Indexes should cover at minimum:

```text
tenant_id
outlet_id
created_at
table_id
table_session_id
order_id
payment_status
order_status
station_id
```

---

# 79. Analytics & Monitoring

Application monitoring:

- backend errors,
- frontend errors,
- webhook failures,
- queue failures,
- print failures,
- KDS connectivity.

Business events:

```text
qr_scanned
menu_viewed
product_added
checkout_started

payment_started
payment_success
payment_failed

order_confirmed
order_preparing
order_ready
order_served

cash_due
cash_collected

waiter_called
```

---

# 80. Logging

Logs must carry contextual IDs:

```text
request_id
tenant_id
outlet_id
order_id
payment_id
```

Never log payment secrets.

---

# 81. Testing Strategy

## Unit Tests

Critical business logic:

- price calculation,
- variant calculation,
- tax,
- service,
- cash change,
- permissions,
- order transitions.

---

## Integration Tests

- checkout.
- Midtrans transaction creation.
- webhook processing.
- cash collection.
- station routing.
- reservation conflicts.
- cash shift close.

---

## End-to-End Tests

### QRIS

```text
QR Table
→ menu
→ cart
→ checkout
→ payment
→ webhook
→ kitchen
→ ready
```

### Cash

```text
QR Table
→ order
→ cash
→ kitchen
→ ready
→ collect
→ served
```

---

## Permission Tests

Every protected action needs:

```text
allowed test
denied test
cross-tenant denied test
```

---

# 82. Release Checklist

## Infrastructure

- [ ] Production environment.
- [ ] HTTPS.
- [ ] Production DB.
- [ ] Backup.
- [ ] Secrets management.
- [ ] Monitoring.

## Midtrans

- [ ] Production merchant activated.
- [ ] Production credentials.
- [ ] QRIS activated.
- [ ] Webhook configured.
- [ ] Success tested.
- [ ] Failed tested.
- [ ] Expired tested.
- [ ] Duplicate notification tested.

## Operational

- [ ] Menu imported.
- [ ] Tables configured.
- [ ] QR generated.
- [ ] Stations configured.
- [ ] Printers/KDS tested.
- [ ] Roles configured.
- [ ] Staff trained.
- [ ] Tax configured.
- [ ] Service configured.
- [ ] Cash opening tested.
- [ ] Refund tested.
- [ ] Void tested.

---

# 83. MVP Roadmap

## Phase 0 — Foundation

Build:

```text
Tenant
Outlet
Auth
RBAC
Settings
```

---

## Phase 1A — Ordering Core

```text
Category
Product
Variant
Modifier

Area
Table
QR

Table Session

Customer Menu
Cart
Checkout
Order
```

Goal:

Customer can create order from table.

---

## Phase 1B — Payment

```text
Midtrans Sandbox
QRIS
Webhook

Cash
Cash Collection
```

Goal:

Both QRIS and cash flows work end-to-end.

---

## Phase 1C — Operations

```text
Station
Routing

KDS
Printing

Waiter
Ready/Served
```

Goal:

Real coffee shop workflow.

---

## Phase 1D — Control

```text
Cash Shift
Refund
Void
Audit
```

Goal:

Transaction accountability.

---

## Phase 1E — Reservation & Reporting

```text
Reservation

Sales Report
Product Report
Payment Report
Staff Report
Cash Report
```

---

# 84. Phase 2

After real operational validation:

```text
EDC
Product Images
Menu Scheduling

Advanced Reservation

Advanced Printing

Discount/Promo Engine

Split Payment
Split Bill

Customer Notification

Multi-outlet UI
```

Split bills should only be introduced after understanding actual customer behaviour because they materially increase payment/order complexity.

---

# 85. Phase 3

Only after sufficient demand:

```text
Inventory Ingredients
Recipe/BOM
Stock Deduction
Purchase
Supplier

Loyalty
CRM

Advanced Analytics

Accounting Integration

Delivery
Marketplace Integration
```

---

# 86. Development Epic Breakdown

## EPIC 01 — Identity & Tenant

**Priority:** P0

Tasks:

- tenant model,
- outlet,
- authentication,
- users,
- roles,
- permissions,
- outlet membership.

---

## EPIC 02 — Menu

**Priority:** P0

Tasks:

- category,
- product,
- variant,
- modifier,
- availability.

---

## EPIC 03 — Table

**Priority:** P0

Tasks:

- area,
- tables,
- QR token,
- table session,
- table state.

---

## EPIC 04 — Ordering

**Priority:** P0

Tasks:

- public menu,
- cart validation,
- price engine,
- checkout,
- order snapshot,
- additional order.

---

## EPIC 05 — Midtrans

**Priority:** P0

Tasks:

- Snap,
- QRIS,
- gateway transaction,
- webhook,
- reconciliation state,
- retry/idempotency.

---

## EPIC 06 — Cash

**Priority:** P0

Tasks:

- cash method,
- cash due,
- waiter collection,
- tender,
- change.

---

## EPIC 07 — Preparation

**Priority:** P0

Tasks:

- stations,
- product routing,
- tickets,
- KDS,
- ready state.

---

## EPIC 08 — Printing

**Priority:** P0/P1

Tasks:

- receipt,
- kitchen ticket,
- printer mapping,
- print queue,
- reprint permission.

---

## EPIC 09 — Cash Shift

**Priority:** P0

Tasks:

- open,
- movement,
- sales aggregation,
- close,
- variance.

---

## EPIC 10 — Reservation

**Priority:** P1

Tasks:

- CRUD,
- availability,
- assign table,
- arrival,
- no-show.

---

## EPIC 11 — Financial Controls

**Priority:** P0

Tasks:

- void,
- refund,
- approval permissions,
- immutable history,
- audit.

---

## EPIC 12 — Reporting

**Priority:** P1

Tasks:

- daily,
- hourly,
- product,
- payment,
- staff,
- cash.

---

# 87. Risks

## Risk 1 — Product scope becomes POS ERP

Mitigation:

Do not implement inventory/accounting before validation.

---

## Risk 2 — Payment onboarding

Each merchant may require provider onboarding before receiving production payments.

Mitigation:

Use Midtrans Sandbox during implementation and include merchant onboarding in deployment SOP.

---

## Risk 3 — Cash leakage

Cash remains dependent on human handling.

Mitigation:

- order created before collection,
- cash due tracking,
- collector identity,
- shift,
- reconciliation,
- audit.

---

## Risk 4 — Internet dependency

Online-first means outage impacts self-order/payment.

Mitigation:

Operational fallback:

```text
staff manual order
```

MVP does not promise offline payment.

---

## Risk 5 — Printing hardware fragmentation

Different cafes may have different printers/devices.

Mitigation:

Printer abstraction + configurable station output.

---

## Risk 6 — Competitor pressure

Feature parity with established POS companies is unrealistic at MVP.

Mitigation:

Focus distribution on:

```text
local implementation
support
coffee-shop workflow
flexibility
```

instead of number of features.

---

# 88. Product Validation Criteria

Do not expand scope unless first pilots demonstrate usage.

## Continue

Strong signal:

- cafe actually uses it daily,
- customer uses QR,
- owner sees value,
- owner pays after pilot,
- staff does not bypass system.

---

## Pivot

Examples:

- customer rarely self-orders,
- staff prefers entering orders,
- QRIS payment creates friction,
- cash flow dominates,
- reservation becomes more valuable than self-order.

Product should adapt based on observed behaviour rather than original assumptions.

---

## Kill Criteria

Reconsider product if after meaningful prospecting/pilot:

1. Coffee shops do not have enough operational pain to pay.
2. Existing POS solutions satisfy them at significantly lower switching cost.
3. Support/installation requirements make unit economics unattractive.

---

# 89. Commercial Model

Selected model:

```text
SETUP FEE
+
MONTHLY SUBSCRIPTION
```

Potentially:

```text
Business
↓
Subscription

Outlet
↓
Plan / entitlement
```

Exact pricing:

**TBD — must be validated.**

Do not lock pricing based purely on development cost.

Measure actual willingness to pay from pilot businesses.

---

# 90. Configuration Philosophy

Things that differ among cafes should be configuration—not custom code.

Examples:

```text
Cash enabled
QRIS enabled

Tax enabled
Service enabled

BAR exists
KITCHEN exists

KDS enabled
Printer enabled

Barista = cashier
or
Cashier separate

Reservation enabled

Call waiter enabled
```

This is critical for scaling deployment beyond the first cafe.

---

# 91. Recommended MVP Deployment Configuration

Example Cafe A:

```text
Outlet
Majalengka Coffee

Areas
Indoor
Outdoor

Stations
BAR
KITCHEN

BAR
output = DISPLAY

KITCHEN
output = PRINTER

Payments
QRIS = ON
Cash = ON

Reservation = ON

Cash Shift = ON
```

Cafe B:

```text
Stations
BAR

BAR
acts as preparation + cashier

output = PRINTER

QRIS = ON
Cash = OFF
```

Same product.

No source-code fork.

---

# 92. Key Product Principle

The platform should model:

> **what happens operationally**

rather than:

> **how one specific cafe currently works.**

Therefore:

```text
roles
stations
payments
tax
service
outputs
permissions
```

must remain configurable.

---

# 93. Final MVP Scope

The first production-worthy release consists of:

```text
AUTH
DYNAMIC RBAC

OUTLET SETTINGS

AREA
TABLE
TABLE QR
TABLE SESSION

RESERVATION

CATEGORY
PRODUCT
VARIANT
MODIFIER
AVAILABILITY

CUSTOMER SELF ORDER
CART
CHECKOUT

ORDER MANAGEMENT

MIDTRANS
QRIS

CASH
CASH DUE
CASH COLLECTION
CASH SHIFT

PREPARATION STATION
BAR/KITCHEN ROUTING

KDS
PRINTING

WAITER OPERATIONS
CALL WAITER

TAX
SERVICE CHARGE

PAYMENT
TRANSACTION

VOID
REFUND

AUDIT LOG

REPORTING

OWNER DASHBOARD
```

---

# 94. Final Product Flow

```text
                         ┌─────────────────┐
                         │    CUSTOMER     │
                         └────────┬────────┘
                                  │
                              Scan QR
                                  │
                                  ▼
                         ┌─────────────────┐
                         │      MENU       │
                         └────────┬────────┘
                                  │
                              Checkout
                                  │
                    ┌─────────────┴──────────────┐
                    │                            │
                    ▼                            ▼
                  QRIS                          CASH
                    │                            │
                 Midtrans                    CASH_DUE
                    │                            │
                 Webhook                         │
                    │                            │
                   PAID                          │
                    │                            │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                              CONFIRMED
                                  │
                          Route by Product
                                  │
                    ┌─────────────┴────────────┐
                    ▼                          ▼
                   BAR                       KITCHEN
                    │                          │
                 Prepare                    Prepare
                    │                          │
                    └────────────┬─────────────┘
                                 │
                               READY
                                 │
                              WAITER
                                 │
                      ┌──────────┴───────────┐
                      │                      │
                   QRIS PAID              CASH_DUE
                      │                      │
                      │                Collect Cash
                      │                      │
                      │                     PAID
                      └──────────┬───────────┘
                                 │
                               SERVED
                                 │
                                 ▼
                         TABLE SESSION
                             CONTINUES
                                 │
                           Add Order?
                           /        \
                         YES        NO
                          │          │
                         Menu       Close
```

---

# 95. MVP Decision

**[TEST]**

Build only enough production-quality functionality to operate real pilot coffee shops.

The biggest unvalidated assumption is not technical feasibility.

The biggest assumption is:

> **Will coffee shops in the target market switch or pay for this workflow instead of continuing with their current process or existing POS?**

The software therefore should reach a real cafe as early as possible.

---

# 96. Immediate Development Order

Recommended first implementation sequence:

```text
1. Tenant + Outlet
2. Dynamic RBAC

3. Area + Table
4. Table QR
5. Table Session

6. Category
7. Product
8. Variant
9. Modifier

10. Public Menu
11. Cart
12. Order

13. Midtrans Sandbox
14. QRIS webhook

15. Preparation Station
16. Routing
17. KDS

18. Cash Due
19. Cash Collection

20. Cash Shift

21. Printing

22. Reservation

23. Void / Refund
24. Audit

25. Reports
26. Owner Dashboard
```

The first meaningful milestone is not “admin dashboard finished.”

It is:

```text
REAL PHONE
↓
SCAN REAL TABLE QR
↓
ORDER REAL PRODUCT
↓
PAY SANDBOX QRIS
↓
WEBHOOK
↓
ORDER APPEARS AT BAR
```

Once that vertical slice works reliably, the core architecture has been validated.