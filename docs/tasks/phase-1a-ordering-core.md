# Phase 1A: Ordering Core

Outcome: customer dapat scan QR meja, melihat menu, mengonfigurasi produk, dan membuat order tanpa login.

## Catalog

- [ ] **CAT-001 Buat category schema dan CRUD** `P0 / M`
  - Fields: outlet/business scope, name, sort order, dan active state.
  - Acceptance: menu publik hanya menampilkan category aktif dalam urutan yang benar.

- [ ] **CAT-002 Buat product schema dan CRUD** `P0 / M`
  - Fields: category, station, SKU, name, description, base price, active, dan availability.
  - Acceptance: harga disimpan sebagai integer dan SKU unik pada scope yang dipilih.

- [ ] **CAT-003 Buat variant groups dan variants** `P0 / L`
  - Dukung required, minimum selection, maximum selection, dan price delta.
  - Acceptance: kombinasi invalid ditolak server.

- [ ] **CAT-004 Buat modifier groups dan modifiers** `P0 / L`
  - Dukung optional/required dan batas selection.
  - Acceptance: modifier yang tidak terhubung ke produk tidak dapat dipesan.

- [ ] **CAT-005 Implementasikan product availability** `P0 / M`
  - States: available, sold out, inactive.
  - Endpoint: `PATCH /products/{id}/availability`.
  - Acceptance: menu publik memperbarui availability dan checkout menolak produk sold out.

- [ ] **CAT-006 Buat UI pengelolaan menu** `P0 / L`
  - Category, product, variants, modifiers, dan availability.
  - Acceptance: loading, empty, error, validation, dan keyboard flow tersedia.

## Area, table, and QR

- [ ] **TBL-001 Buat area dan table schema** `P0 / M`
  - Status utama: available, occupied, reserved.
  - Acceptance: table selalu berada pada satu outlet dan area yang valid.

- [ ] **TBL-002 Buat CRUD area dan table** `P0 / M`
  - Acceptance: permission dan outlet scope diterapkan pada seluruh operasi.

- [ ] **TBL-003 Buat random public QR token** `P0 / M`
  - Token tidak boleh predictable dan tidak memberi administrative capability.
  - Acceptance: `/public/tables/{token}` hanya mengembalikan informasi publik yang dibutuhkan.

- [ ] **TBL-004 Buat QR generation dan regeneration flow** `P0 / M`
  - Regeneration membatalkan token lama.
  - Acceptance: QR dapat dicetak dan token lama ditolak setelah regenerasi.

- [ ] **TBL-005 Buat table session schema** `P0 / L`
  - States: open, closing, closed.
  - Constraint: hanya satu active session per table.
  - Acceptance: concurrent open menghasilkan satu session dan satu conflict response.

- [ ] **TBL-006 Implementasikan open, close, dan transfer session** `P0 / L`
  - Acceptance: additional order tetap terhubung ke session aktif dan transfer tercatat di audit.

- [ ] **TBL-007 Buat staff table management UI** `P0 / L`
  - Area tabs, table state, session detail, dan derived indicators.
  - Acceptance: payment due, order ready, dan waiter request tidak disimpan sebagai status utama table.

## Public menu and cart

- [ ] **ORD-001 Buat public table bootstrap API** `P0 / M`
  - Resolve token, outlet, table, active session, dan public settings.
  - Acceptance: disabled table, invalid token, dan closed session memiliki error yang jelas.

- [ ] **ORD-002 Buat public menu API** `P0 / M`
  - Endpoint hanya mengirim category/product aktif dan pilihan yang valid.
  - Acceptance: data tenant lain tidak pernah muncul.

- [ ] **ORD-003 Buat customer menu UI mobile-first** `P0 / L`
  - Category navigation, product list, sold-out state, dan connection error.
  - Acceptance: dapat digunakan tanpa login, tanpa horizontal overflow, dan touch target minimal 44px.

- [ ] **ORD-004 Buat product configuration flow** `P0 / L`
  - Variant selector, modifier selector, quantity, dan note.
  - Acceptance: required/min/max tervalidasi sebelum item masuk cart.

- [ ] **ORD-005 Buat cart state dan persistence** `P0 / M`
  - Scope cart ke outlet, table, dan table session.
  - Acceptance: cart lama tidak terbawa ke token atau session berbeda.

## Pricing and checkout

- [ ] **ORD-006 Implementasikan server-side price engine** `P0 / XL`
  - Hitung base price, variant, modifier, quantity, tax, service, dan grand total.
  - Dukung inclusive/exclusive sesuai outlet settings.
  - Acceptance: frontend total diabaikan dan seluruh calculation memiliki unit test.

- [ ] **ORD-007 Buat order dan order item schema** `P0 / L`
  - Simpan product, variant, modifier, tax, dan service snapshot.
  - Acceptance: perubahan menu setelah transaksi tidak mengubah order historis.

- [ ] **ORD-008 Implementasikan idempotent public checkout** `P0 / XL`
  - Endpoint: `POST /public/orders` dengan `Idempotency-Key`.
  - Validasi table session, availability, pilihan, dan harga dalam transaction.
  - Acceptance: double tap hanya menghasilkan satu order.

- [ ] **ORD-009 Implementasikan additional order** `P0 / M`
  - Order baru masuk ke table session aktif yang sama.
  - Acceptance: setiap order memiliki payment dan status sendiri.

- [ ] **ORD-010 Buat checkout UI** `P0 / L`
  - Ringkasan backend-authoritative, payment selection, submitting, conflict, dan retry state.
  - Acceptance: user tidak dapat mengirim checkout ganda saat request aktif.

- [ ] **ORD-011 Buat public order token dan tracking endpoint** `P0 / M`
  - Endpoint: `GET /public/orders/{orderToken}`.
  - Acceptance: token hanya membuka order publik yang dimaksud tanpa mengekspos ID sensitif.

- [ ] **ORD-012 Tambahkan ordering tests** `P0 / L`
  - Unit: pricing, variants, modifiers, tax, service, transitions.
  - Integration: sold-out race, price change, closed session, invalid QR, multiple customers.
  - E2E: QR sampai order tercipta untuk payment cash placeholder.

## Staff POS and order management

- [ ] **POS-001 Buat staff POS catalog and cart UI** `P0 / L`
  - Product grid, category filter, variant/modifier selection, cart, dan table selector.
  - Acceptance: hanya produk available yang dapat ditambahkan dan seluruh touch target nyaman untuk operasional.

- [ ] **POS-002 Buat staff order command memakai order engine yang sama** `P0 / L`
  - Tambahkan source `POS`, tanpa membuat pricing atau order service kedua.
  - Acceptance: order QR dan POS menghasilkan snapshot serta transition yang konsisten.

- [ ] **POS-003 Buat operational fallback flow** `P0 / M`
  - Dukung staff-assisted table order dan counter order sesuai keputusan domain.
  - Acceptance: source, table/session bila ada, dan actor staff tercatat.

- [ ] **POS-004 Buat staff order list and detail** `P0 / L`
  - Filter berdasarkan status, source, table, payment, dan waktu.
  - Acceptance: loading, empty, error, permission denied, dan realtime refresh tersedia.

- [ ] **POS-005 Tambahkan POS order tests** `P0 / L`
  - Pastikan pricing, permission, tenant scope, snapshot, dan routing sama dengan customer order.

## Phase gate

- [ ] Customer dapat scan QR nyata dan membuka menu outlet yang benar.
- [ ] Customer dapat menambah produk dengan variant/modifier valid ke cart.
- [ ] Backend menghitung ulang seluruh harga saat checkout.
- [ ] Double submit tidak membuat order ganda.
- [ ] Additional order memakai table session yang sama.
- [ ] Staff dapat membuat order dari POS menggunakan domain order yang sama.
- [ ] Semua data dan endpoint lulus tenant isolation test.

