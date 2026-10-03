# Phase 1E: Reservation and Reporting

Outcome: outlet dapat mengelola reservation, owner dapat melihat laporan operasional dan finansial, dan seluruh angka berasal dari data transaksi nyata.

## Reservation

- [ ] **RSV-001 Buat reservation schema** `P1 / M`
  - Fields: code, outlet, customer name, phone, date/time, guest count, optional table, notes, dan status.
  - States: pending, confirmed, arrived, cancelled, no show, completed.

- [ ] **RSV-002 Buat reservation CRUD API** `P1 / M`
  - Endpoints list, create, update, arrive, dan cancel.
  - Acceptance: permission dan outlet scope diterapkan.

- [ ] **RSV-003 Implementasikan overlap detection** `P1 / L`
  - Gunakan configurable expected duration.
  - Acceptance: concurrent confirmed reservations pada table/time yang sama ditolak.

- [ ] **RSV-004 Implementasikan arrival to table session flow** `P1 / L`
  - Assign/confirm table lalu buka table session.
  - Acceptance: arrival tidak dapat membuat active session kedua.

- [ ] **RSV-005 Implementasikan cancel, no-show, dan completion** `P1 / M`
  - Acceptance: seluruh transition memiliki timestamp dan actor.

- [ ] **RSV-006 Buat reservation management UI** `P1 / L`
  - Calendar/list, availability, assignment, arrival, cancellation, dan no-show.
  - Acceptance: overlap dan walk-in conflict ditampilkan dengan tindakan yang jelas.

- [ ] **RSV-007 Tambahkan reservation tests** `P1 / L`
  - Overlap, late arrival, table changed, occupied reserved table, cancel, dan no-show.

## Reporting

- [ ] **RPT-001 Tetapkan report definitions** `P1 / M`
  - Definisikan timezone, date boundary, gross/net, paid/cash due, void, dan refund treatment.
  - Acceptance: setiap angka memiliki definisi dan query source yang jelas.

- [ ] **RPT-002 Buat sales report API** `P1 / L`
  - Daily dan hourly breakdown berdasarkan transaksi nyata.

- [ ] **RPT-003 Buat product report API** `P1 / M`
  - Quantity, sales, category, dan station breakdown.

- [ ] **RPT-004 Buat payment report API** `P1 / M`
  - QRIS, cash, pending, expired, refund, dan cash due.

- [ ] **RPT-005 Buat staff report API** `P1 / M`
  - Aktivitas berdasarkan audit dan transaksi yang dapat diverifikasi.

- [ ] **RPT-006 Buat cash report API** `P1 / L`
  - Shift, movements, expected, actual, variance, dan outstanding cash.

- [ ] **RPT-007 Buat report export** `P1 / M`
  - CSV minimum dengan timezone dan filter yang tercantum.
  - Acceptance: export cocok dengan angka pada layar.

- [ ] **RPT-008 Buat reports UI** `P1 / XL`
  - Date filter, sales, products, payment, staff, dan cash.
  - Acceptance: loading, no-result, error, permission denied, dan export state tersedia.

## Owner dashboard

- [ ] **DSH-001 Tentukan keputusan utama owner dashboard** `P1 / S`
  - Prioritaskan exception dan action, bukan kumpulan stat card generik.

- [ ] **DSH-002 Buat owner dashboard API** `P1 / L`
  - Data minimum: sales, orders, payment exceptions, cash due, void/refund, dan outlet health.

- [ ] **DSH-003 Buat owner dashboard UI** `P1 / L`
  - Hanya tampilkan metric yang sudah didefinisikan dan bersumber nyata.
  - Acceptance: tidak ada angka, delta, atau activity feed fiktif.

## Analytics

- [ ] **ANL-001 Buat business event taxonomy** `P1 / M`
  - QR scanned, menu viewed, product added, checkout, payment, order lifecycle, cash, dan waiter call.

- [ ] **ANL-002 Instrument ordering funnel** `P1 / M`
  - Acceptance: event tidak memuat secret atau data customer yang tidak diperlukan.

- [ ] **ANL-003 Buat pilot metric queries** `P1 / M`
  - Orders processed, QR dine-in usage, payment completion, operational timing, dan cash discrepancy.

## Phase gate

- [ ] Reservation overlap ditolak secara konsisten.
- [ ] Arrival membuka atau menghubungkan table session yang benar.
- [ ] Sales, product, payment, staff, dan cash reports memiliki definisi yang terdokumentasi.
- [ ] Dashboard dan laporan hanya menampilkan data nyata.
- [ ] Export cocok dengan filter dan angka pada UI.

