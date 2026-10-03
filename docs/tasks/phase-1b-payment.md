# Phase 1B: Payment

Outcome: order QRIS hanya diproses setelah webhook terverifikasi, sedangkan order cash langsung diproses sebagai cash due.

## Shared payment domain

- [ ] **PAY-001 Buat payment schema dan state machine** `P0 / L`
  - States: pending, cash due, paid, failed, expired, refunded, partially refunded, voided.
  - Methods MVP: QRIS dan cash.
  - Acceptance: transition invalid ditolak dan tercatat.

- [ ] **PAY-002 Buat payment service abstraction** `P0 / M`
  - Pisahkan domain payment dari Midtrans adapter.
  - Acceptance: order service tidak bergantung langsung pada SDK provider.

- [ ] **PAY-003 Tambahkan payment audit dan raw gateway events** `P0 / M`
  - Redact secret dan sensitive payload.
  - Acceptance: perubahan status dapat ditelusuri tanpa menyimpan credential.

## Midtrans and QRIS

- [ ] **QRS-001 Konfigurasi Midtrans Sandbox** `P0 / M`
  - Server key hanya di backend, environment tervalidasi saat startup.
  - Acceptance: credential tidak masuk frontend bundle, log, atau repository.

- [ ] **QRS-002 Buat gateway transaction schema** `P0 / M`
  - Simpan provider order ID, transaction ID, amount, status, attempt, dan timestamps.
  - Constraints: provider order ID dan transaction ID unik.

- [ ] **QRS-003 Implementasikan create Snap transaction** `P0 / L`
  - Endpoint payment bersifat idempotent.
  - Acceptance: amount berasal dari order server-side dan retry tidak membuat transaksi liar.

- [ ] **QRS-004 Buat QRIS payment UI** `P0 / L`
  - Tampilkan pending, success, failed, expired, cancelled, dan connection error.
  - Acceptance: browser success callback tidak pernah menandai payment paid.

- [ ] **QRS-005 Implementasikan Midtrans webhook verification** `P0 / XL`
  - Verifikasi authenticity, provider order ID, internal order, amount, dan transaction status.
  - Acceptance: invalid signature, wrong amount, dan unknown order ditolak serta dicatat.

- [ ] **QRS-006 Buat idempotent webhook processor** `P0 / L`
  - Tangani duplicate dan out-of-order notification.
  - Acceptance: webhook yang sama dapat dikirim berulang tanpa duplikasi side effect.

- [ ] **QRS-007 Hubungkan payment paid ke order confirmation** `P0 / L`
  - QRIS: `WAITING_PAYMENT -> CONFIRMED` hanya setelah webhook verified.
  - Acceptance: callback frontend sebelum webhook tidak memproses order.

- [ ] **QRS-008 Tambahkan payment status refresh** `P0 / M`
  - Polling atau SSE untuk memperbarui customer order tracker.
  - Acceptance: halaman yang dibuka ulang menampilkan state server terbaru.

- [ ] **QRS-009 Buat reconciliation/admin payment view** `P1 / M`
  - Cari berdasarkan order, provider ID, status, dan tanggal.
  - Acceptance: staff tidak dapat mengedit amount atau memaksa status paid.

- [ ] **QRS-010 Tambahkan Midtrans tests** `P0 / XL`
  - Pending, success, failed, expired, duplicate, wrong amount, unknown ID, callback ordering, close page, dan retry.

## Cash

- [ ] **CSH-001 Buat cash payment saat checkout** `P0 / M`
  - Set payment `CASH_DUE` dan order `CONFIRMED` secara atomic.
  - Acceptance: cash tidak menghalangi preparation.

- [ ] **CSH-002 Buat daftar cash due** `P0 / M`
  - Filter by outlet, table, order, dan active shift context.
  - Acceptance: customer/order yang sudah paid tidak muncul lagi.

- [ ] **CSH-003 Implementasikan collect cash endpoint** `P0 / L`
  - Input hanya tender amount, invoice amount tidak dapat diubah.
  - Gunakan transaction lock/status guard.
  - Acceptance: dua staff tidak dapat mengoleksi payment yang sama.

- [ ] **CSH-004 Hitung change server-side** `P0 / S`
  - Acceptance: exact payment, overpayment, dan insufficient tender memiliki unit test.

- [ ] **CSH-005 Buat cash collection UI** `P0 / M`
  - Tampilkan invoice, tender input, change, confirmation, dan duplicate conflict.
  - Acceptance: staff identity dan timestamp tercatat setelah sukses.

- [ ] **CSH-006 Tambahkan cash payment tests** `P0 / L`
  - Exact cash, change, duplicate collection, served with outstanding cash, dan staff/shift change.

## Phase gate

- [ ] QRIS sandbox berhasil dari create transaction sampai verified webhook.
- [ ] QRIS order tidak masuk preparation sebelum payment paid.
- [ ] Cash order langsung confirmed dan memiliki payment cash due.
- [ ] Cash collection aman dari duplicate execution.
- [ ] Semua critical operation menggunakan idempotency atau transactional guard.

