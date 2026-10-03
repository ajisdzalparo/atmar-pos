# Phase 1D: Financial Control

Outcome: cash, void, refund, dan perubahan sensitif memiliki control, approval, dan audit trail yang dapat dipertanggungjawabkan.

## Cash shift

- [ ] **SFT-001 Buat cash shift schema** `P0 / L`
  - Simpan staff, outlet, opening cash, opened/closed timestamps, expected, actual, dan variance.
  - Acceptance: satu staff/outlet tidak memiliki shift aktif yang konflik sesuai policy.

- [ ] **SFT-002 Buat cash movement schema** `P0 / M`
  - Types: cash sale, refund, cash in, cash out, dan adjustment bila diizinkan.
  - Acceptance: movement immutable dan selalu memiliki actor serta reason jika manual.

- [ ] **SFT-003 Implementasikan open shift** `P0 / M`
  - Endpoint: `POST /cash-shifts/open`.
  - Acceptance: opening amount tervalidasi dan permission diterapkan.

- [ ] **SFT-004 Implementasikan current shift query** `P0 / S`
  - Endpoint: `GET /cash-shifts/current`.
  - Acceptance: response hanya berasal dari outlet context server-side.

- [ ] **SFT-005 Hubungkan cash collection ke active shift** `P0 / L`
  - Acceptance: cash payment membuat movement tepat satu kali pada shift collector.

- [ ] **SFT-006 Implementasikan cash in dan cash out** `P0 / M`
  - Endpoint: `POST /cash-shifts/{id}/movement`.
  - Acceptance: amount, type, reason, permission, dan audit wajib.

- [ ] **SFT-007 Hitung expected cash server-side** `P0 / M`
  - Formula: opening + sales + cash in - refunds - cash out.
  - Acceptance: unit test mencakup seluruh movement type.

- [ ] **SFT-008 Implementasikan close shift** `P0 / L`
  - Input hanya actual cash dan data yang dibutuhkan.
  - Acceptance: variance dihitung server, close bersifat atomic, transaksi setelah close ditolak.

- [ ] **SFT-009 Definisikan policy outstanding cash saat close** `P0 / S`
  - Catat keputusan: block, warn plus approval, atau handover terkontrol.
  - Acceptance: behavior dan audit konsisten dengan keputusan produk.

- [ ] **SFT-010 Buat cash shift UI** `P0 / L`
  - Open, active summary, movements, outstanding cash, close, dan variance.
  - Acceptance: expected cash dapat dibatasi berdasarkan permission jika blind close dipilih.

## Void and cancel

- [ ] **FIN-001 Definisikan cancel versus void transition rules** `P0 / M`
  - Acceptance: rule terdokumentasi dan diuji untuk setiap order/payment state.

- [ ] **FIN-002 Buat void schema dan service** `P0 / L`
  - Simpan reason, performed by, performed at, approval, dan original transaction reference.
  - Acceptance: original record tidak dihapus atau diedit diam-diam.

- [ ] **FIN-003 Implementasikan void command and approval policy** `P0 / L`
  - Endpoint: `POST /orders/{id}/void`.
  - Acceptance: permission terpisah untuk create dan approve bila dikonfigurasi.

## Refund

- [ ] **FIN-004 Buat refund schema dan state machine** `P0 / L`
  - States: requested, approved, processed, failed.
  - Dukung full dan partial refund bila provider/domain mengizinkan.

- [ ] **FIN-005 Implementasikan QRIS refund adapter** `P0 / XL`
  - Acceptance: provider response diverifikasi, retry idempotent, dan status internal dapat direkonsiliasi.

- [ ] **FIN-006 Implementasikan cash refund** `P0 / L`
  - Buat negative cash movement pada active shift sesuai policy.
  - Acceptance: amount tidak melebihi refundable balance.

- [ ] **FIN-007 Buat refund UI** `P0 / L`
  - Amount, reason, permission/approval, progress, failure, dan final state.
  - Acceptance: double submit tidak membuat refund ganda.

## Audit and controls

- [ ] **AUD-001 Lengkapi immutable audit log** `P0 / L`
  - Covered actions: price/settings, role, payment, cash, shift, void, refund, reprint, dan table transfer.
  - Acceptance: audit entry tidak dapat diubah oleh user aplikasi.

- [ ] **AUD-002 Buat audit query API dan UI** `P0 / M`
  - Filter by actor, entity, action, outlet, dan date.
  - Acceptance: permission khusus dan tenant isolation diterapkan.

- [ ] **AUD-003 Tambahkan sensitive-operation permission tests** `P0 / L`
  - Refund, void, tax settings, role config, close shift, dan price change.

- [ ] **AUD-004 Tambahkan financial concurrency tests** `P0 / L`
  - Duplicate collect, duplicate refund, close during payment, dan retry after timeout.

## Phase gate

- [ ] Setiap cash payment terhubung ke collector dan shift.
- [ ] Expected cash dan variance dihitung server-side.
- [ ] Paid transaction tidak dapat dihapus atau diedit.
- [ ] Void dan refund memerlukan reason, permission, idempotency, dan audit.
- [ ] Seluruh sensitive operation memiliki allowed, denied, dan cross-tenant test.

