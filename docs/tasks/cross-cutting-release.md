# Cross-cutting and Release

Task pada dokumen ini berjalan paralel dengan phase domain. Release pilot tidak boleh dilakukan sebelum seluruh release gate relevan selesai.

## Security

- [ ] **SEC-001 Review authentication and token storage** `P0 / M`
- [ ] **SEC-002 Verify tenant and outlet isolation across all endpoints** `P0 / XL`
- [ ] **SEC-003 Add rate limiting for login, public ordering, waiter calls, and webhooks** `P0 / M`
- [ ] **SEC-004 Validate all money and status transitions server-side** `P0 / L`
- [ ] **SEC-005 Redact secrets and sensitive payment data from logs** `P0 / M`
- [ ] **SEC-006 Add dependency and secret scanning to CI** `P0 / M`
- [ ] **SEC-007 Review QR token entropy and regeneration** `P0 / M`
- [ ] **SEC-008 Review print bridge authentication if enabled** `P1 / L`

## Reliability and concurrency

- [ ] **REL-001 Add request IDs and contextual logging** `P0 / M`
  - Include request, tenant, outlet, order, dan payment IDs bila tersedia.

- [ ] **REL-002 Add structured exception reporting** `P0 / M`
- [ ] **REL-003 Add queue failure and retry monitoring** `P0 / M`
- [ ] **REL-004 Add webhook failure dashboard and replay tooling** `P0 / L`
- [ ] **REL-005 Add database constraints for all critical invariants** `P0 / L`
- [ ] **REL-006 Run concurrency tests for checkout, session, cash, and webhook** `P0 / XL`
- [ ] **REL-007 Document online-first outage behavior** `P0 / S`
  - Customer diarahkan menghubungi staff, POS menampilkan connection lost.
  - Tidak ada silent offline queue untuk financial operation.

## Performance

- [ ] **PERF-001 Add required database indexes** `P0 / M`
  - Tenant, outlet, created at, table, session, order, payment status, order status, dan station.

- [ ] **PERF-002 Measure public menu initial load** `P0 / M`
  - Target MVP kurang dari 2.5 detik pada kondisi pilot yang disepakati.

- [ ] **PERF-003 Measure common API p95** `P0 / M`
  - Target MVP kurang dari 500 ms pada expected workload.

- [ ] **PERF-004 Measure operational event latency** `P0 / M`
  - Target MVP kurang dari dua detik.

- [ ] **PERF-005 Add frontend bundle and route-loading review** `P1 / M`

## Accessibility and UX resilience

- [ ] **A11Y-001 Verify semantic HTML and form labels** `P0 / M`
- [ ] **A11Y-002 Verify WCAG AA contrast and non-color status cues** `P0 / M`
- [ ] **A11Y-003 Verify staff keyboard navigation and visible focus** `P0 / M`
- [ ] **A11Y-004 Verify minimum 44px customer touch targets** `P0 / M`
- [ ] **A11Y-005 Verify reduced-motion behavior** `P1 / S`
- [ ] **A11Y-006 Test responsive layouts on real phone and tablet sizes** `P0 / L`
- [ ] **A11Y-007 Verify loading, empty, error, reconnecting, and permission states** `P0 / L`

## Test suites

- [ ] **TST-001 Unit suite for pricing and money calculations** `P0 / L`
- [ ] **TST-002 Unit suite for permissions and status transitions** `P0 / L`
- [ ] **TST-003 Integration suite for checkout and station routing** `P0 / L`
- [ ] **TST-004 Integration suite for Midtrans webhook and reconciliation** `P0 / XL`
- [ ] **TST-005 Integration suite for cash collection and shift close** `P0 / L`
- [ ] **TST-006 Integration suite for reservation conflicts** `P1 / M`
- [ ] **TST-007 E2E QRIS flow** `P0 / XL`
  - QR, menu, cart, checkout, payment, webhook, station, ready.

- [ ] **TST-008 E2E cash flow** `P0 / XL`
  - QR, order, cash due, station, ready, collect, served.

- [ ] **TST-009 Permission matrix suite** `P0 / XL`
  - Allowed, denied, dan cross-tenant denied untuk setiap protected action.

## Infrastructure

- [ ] **INF-001 Provision production environment and HTTPS** `P0 / L`
- [ ] **INF-002 Provision production PostgreSQL with backup** `P0 / L`
- [ ] **INF-003 Configure secrets management** `P0 / M`
- [ ] **INF-004 Configure Redis/queue where required** `P0 / M`
- [ ] **INF-005 Configure monitoring and alerting** `P0 / L`
- [ ] **INF-006 Document restore and incident procedures** `P0 / M`

## Pilot readiness

- [ ] **PIL-001 Activate and verify Midtrans production merchant** `P0 / External`
- [ ] **PIL-002 Verify QRIS production configuration and webhook** `P0 / External`
- [ ] **PIL-003 Import real pilot menu** `P0 / M`
- [ ] **PIL-004 Configure real areas, tables, QR codes, and stations** `P0 / M`
- [ ] **PIL-005 Test target printers and/or KDS hardware** `P0 / L`
- [ ] **PIL-006 Configure roles and train staff** `P0 / L`
- [ ] **PIL-007 Verify tax, service, cash opening, refund, and void** `P0 / L`
- [ ] **PIL-008 Run real-device vertical slice rehearsal** `P0 / XL`
- [ ] **PIL-009 Define pilot support and rollback procedure** `P0 / M`
- [ ] **PIL-010 Capture pilot baseline metrics** `P1 / M`

## Explicitly out of MVP

Do not create implementation tasks for these items until validation changes the scope:

- Ingredient inventory, recipe costing, purchasing, supplier.
- Loyalty, CRM, payroll, accounting.
- Delivery and marketplace integration.
- Native mobile application.
- Advanced offline financial synchronization.
- EDC, split payment, split bill, product images, and advanced promotion engine.

## Release gate

- [ ] Production environment, backup, secrets, monitoring, and HTTPS verified.
- [ ] QRIS success, failed, expired, duplicate, and wrong-amount cases verified.
- [ ] Cash, shift, void, refund, station routing, KDS, and printing verified.
- [ ] No critical or high security issue remains open.
- [ ] E2E QRIS and cash suites pass.
- [ ] Pilot cafe configuration and staff rehearsal complete.
- [ ] Rollback and manual operating fallback documented.

