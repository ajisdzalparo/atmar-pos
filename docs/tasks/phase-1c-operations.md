# Phase 1C: Operations

Outcome: confirmed order dirutekan ke station yang benar, dapat diproses pada KDS, disajikan oleh waiter, dan dicetak sesuai konfigurasi outlet.

## Preparation station and routing

- [ ] **OPS-001 Buat preparation station schema dan CRUD** `P0 / M`
  - Station bersifat dynamic, bukan fixed BAR/KITCHEN enum.
  - Acceptance: outlet dapat memakai satu atau beberapa station.

- [ ] **OPS-002 Wajibkan product station assignment** `P0 / M`
  - Acceptance: produk aktif tidak dapat dijual tanpa station yang valid.

- [ ] **OPS-003 Buat station ticket schema** `P0 / L`
  - Tables: `station_tickets` dan `station_ticket_items`.
  - States: new, preparing, ready.
  - Acceptance: progress tiap station tidak bergantung pada satu `order.status`.

- [ ] **OPS-004 Implementasikan atomic station routing** `P0 / XL`
  - Split confirmed order items berdasarkan station.
  - Acceptance: satu order berisi BAR dan KITCHEN menghasilkan dua ticket tanpa menggandakan order.

- [ ] **OPS-005 Hitung aggregate order preparation state** `P0 / L`
  - Acceptance: order ready hanya ketika seluruh ticket wajib ready.

- [ ] **OPS-006 Implementasikan ticket start dan ready commands** `P0 / M`
  - Endpoints: `POST /station-tickets/{id}/start` dan `/ready`.
  - Acceptance: transition invalid dan station access yang salah ditolak.

## KDS and realtime

- [ ] **KDS-001 Buat station tickets query API** `P0 / M`
  - Urutkan berdasarkan operational priority dan waktu masuk.
  - Acceptance: hanya ticket station yang diizinkan yang terlihat.

- [ ] **KDS-002 Buat KDS screen** `P0 / L`
  - Prioritaskan keterbacaan jarak jauh, timer, item configuration, dan touch target.
  - Acceptance: new, preparing, ready, loading, reconnecting, dan error state jelas tanpa mengandalkan warna saja.

- [ ] **KDS-003 Tambahkan SSE operational events** `P0 / L`
  - Events: order confirmed, ticket created, started, ready, order ready, waiter request.
  - Acceptance: KDS menerima update dalam target dua detik pada beban MVP.

- [ ] **KDS-004 Implementasikan reconnect and catch-up** `P0 / M`
  - Acceptance: setelah koneksi putus, UI fetch state terbaru dan tidak menggandakan ticket.

- [ ] **KDS-005 Tangani cancellation setelah preparation mulai** `P0 / L`
  - Definisikan policy dan visibility untuk station.
  - Acceptance: perubahan tidak menghilangkan histori ticket.

## Waiter operations

- [ ] **WTR-001 Buat waiter request schema dan API** `P1 / M`
  - Request harus terhubung ke outlet, table, session, type, status, dan timestamps.
  - Acceptance: request dari QR token invalid atau closed session ditolak.

- [ ] **WTR-002 Buat customer call waiter control** `P1 / S`
  - Tambahkan cooldown/idempotency.
  - Acceptance: tap berulang tidak membuat request spam.

- [ ] **WTR-003 Buat waiter dashboard** `P1 / L`
  - Fokus pada ready orders, cash due, waiter calls, dan table operation.
  - Acceptance: setiap action memiliki permission dan behavior nyata.

- [ ] **WTR-004 Implementasikan served transition** `P0 / M`
  - Endpoint: `POST /orders/{id}/served`.
  - Acceptance: QRIS harus paid, cash dapat mengikuti policy cash due yang telah disepakati dan tetap terlihat.

## Printing

- [ ] **PRN-001 Buat printer dan station output configuration** `P0 / L`
  - Modes: display, printer, display and printer, none.
  - Acceptance: konfigurasi berbeda per station dan outlet.

- [ ] **PRN-002 Buat print job schema dan queue contract** `P0 / L`
  - Simpan payload snapshot, target device, attempts, state, dan error.
  - Acceptance: retry tidak membuat duplicate print tanpa jejak.

- [ ] **PRN-003 Buat kitchen ticket renderer** `P0 / M`
  - Tampilkan table, order, item, variant, modifier, note, dan timestamp.
  - Acceptance: layout diuji pada lebar printer target.

- [ ] **PRN-004 Buat receipt renderer** `P0 / M`
  - Tampilkan snapshot transaksi, tax, service, payment, dan change jika cash.
  - Acceptance: receipt historis tidak berubah ketika master data berubah.

- [ ] **PRN-005 Implementasikan print dispatch dan retry** `P0 / L`
  - Acceptance: offline printer terlihat sebagai failure yang dapat ditindaklanjuti.

- [ ] **PRN-006 Tambahkan authenticated local print bridge** `P1 / XL`
  - Hanya jika hardware pilot memerlukannya.
  - Acceptance: outlet/device binding, authenticated jobs, dan tidak ada arbitrary command execution.

- [ ] **PRN-007 Tambahkan reprint permission dan audit** `P0 / M`
  - Acceptance: reprint memerlukan permission dan selalu mencatat actor serta reason.

## Operations tests

- [ ] **OPS-007 Tambahkan station routing integration tests** `P0 / L`
- [ ] **OPS-008 Tambahkan KDS realtime and reconnect tests** `P0 / L`
- [ ] **OPS-009 Tambahkan print failure and duplicate tests** `P0 / L`
- [ ] **OPS-010 Tambahkan QRIS E2E sampai ticket tampil di BAR** `P0 / XL`

## Phase gate

- [ ] Confirmed order dirutekan ke seluruh station yang benar.
- [ ] BAR ready dan KITCHEN preparing dapat direpresentasikan bersamaan.
- [ ] KDS pulih setelah koneksi terputus.
- [ ] Ready order terlihat oleh waiter dan dapat ditandai served.
- [ ] Printer failure tidak menghilangkan order atau histori print job.

