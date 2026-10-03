# Atmar POS Frontend Coverage

Dokumen ini memetakan scope UI pada `docs/prd.md` ke prototype React. Semua data masih lokal dan diberi label demo. Backend tetap menjadi authority untuk harga, permission, pembayaran, state transition, tenant scope, dan audit persistence.

## Foundation

- [x] Staff sign-in preview.
- [x] Tenant dan outlet context.
- [x] Users, dynamic roles, permission matrix, dan station assignment.
- [x] Outlet settings untuk tax, service, calculation mode, Midtrans environment, output station, dan cash close policy.

## Customer ordering

- [x] Table identity dan table session identity.
- [x] Category menu dan product availability.
- [x] Product detail dengan temperature, size, modifiers, dan note.
- [x] Cart dengan snapshot pilihan produk.
- [x] Checkout summary, tax, service, dan payment selector.
- [x] QRIS waiting payment lalu simulasi verified webhook.
- [x] Cash due yang tetap masuk preparation.
- [x] Order tracker dan additional order pada session yang sama.
- [x] Call waiter dengan duplicate-request guard.

## Staff ordering and service

- [x] POS category, product search, table selector, cart, payment, order result, dan receipt dialog.
- [x] Order list, filters, detail, timeline, payment state, dan served action.
- [x] Waiter queue untuk request, ready order, cash collection, dan served transition.

## Tables and reservation

- [x] Area tabs dan table map.
- [x] Table primary status serta derived operational note.
- [x] Open, inspect, transfer, dan close table session.
- [x] QR table token, copy simulation, regeneration, dan print preparation.
- [x] Reservation list, status filter, confirm, arrive, open session, cancel, no-show, dan complete.

## Preparation and printing

- [x] Dynamic preparation station management.
- [x] Independent station ticket state: new, preparing, ready.
- [x] Station filter dan distance-readable KDS cards.
- [x] KDS live, reconnecting, dan error previews.
- [x] Station output modes: display, printer, display and printer, none.
- [x] Print queue, failed job, retry, receipt/kitchen job, dan audited reprint simulation.

## Payments and financial control

- [x] QRIS pending dan paid simulation.
- [x] Cash collection with immutable invoice, tender, change, collector, dan shift reference.
- [x] Cash shift summary, cash in, cash out, expected, actual, variance, dan close.
- [x] Refund request list dan creation form.
- [x] Void request list dan approval state.
- [x] Audit log with actor, action, entity, old/new value, reason, dan time.

## Catalog and management

- [x] Product availability and station assignment visibility.
- [x] Category ordering and active state.
- [x] Required variant groups and modifier availability.
- [x] User activation, roles, and permission grants.
- [x] Dynamic station creation and output configuration.

## Owner visibility

- [x] Operational dashboard with action queue, cash due, active order flow, and station load.
- [x] Sales per hour and payment split.
- [x] Product, payment, staff, cash, and audit report tabs.
- [x] Date-range selector and CSV export.
- [x] Loading, no-result, error, and permission-denied report previews.

## Backend-dependent behavior

The UI represents these flows, but they cannot become authoritative before the backend exists:

- Midtrans transaction creation, webhook verification, refund adapter, and idempotency.
- Tenant isolation, outlet scoping, authentication sessions, and permission enforcement.
- Server-side price, tax, service, and total recalculation.
- Concurrency protection for table sessions, cash collection, sold-out products, and reservations.
- SSE events, reconnect catch-up, persistent print queue, and authenticated local print bridge.
- Immutable audit storage, real reports, analytics events, and cross-tenant tests.
