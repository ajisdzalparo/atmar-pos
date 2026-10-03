# Phase 0: Foundation

Outcome: tenant, outlet, autentikasi, RBAC, konfigurasi dasar, dan kontrak frontend-backend siap untuk vertical slice pertama.

## Project foundation

- [ ] **FND-001 Tetapkan struktur repository** `P0 / S`
  - Putuskan lokasi frontend Vite dan backend Laravel.
  - Dokumentasikan cara menjalankan seluruh service secara lokal.
  - Acceptance: satu perintah atau prosedur terdokumentasi dapat menjalankan frontend, API, dan database.

- [ ] **FND-002 Inisialisasi Laravel API** `P0 / M`
  - Aktifkan route prefix `/api/v1`.
  - Tambahkan health endpoint tanpa data sensitif.
  - Acceptance: health check merespons sukses dan test API pertama lulus.

- [ ] **FND-003 Konfigurasi PostgreSQL dan migration workflow** `P0 / M`
  - Siapkan environment lokal, test database, migration, dan seeder non-produksi.
  - Acceptance: database dapat dibuat ulang dari nol tanpa langkah manual.

- [ ] **FND-004 Siapkan frontend application foundation** `P0 / M`
  - Tambahkan routing, API client, TanStack Query, error boundary, dan environment validation.
  - Acceptance: route publik dan route staff dapat dirender, error jaringan terlihat jelas.

- [ ] **FND-005 Tambahkan quality gates** `P0 / S`
  - Jalankan lint, typecheck, frontend build, backend test, dan migration check.
  - Acceptance: quality gates dapat dijalankan lokal dan siap dipindahkan ke CI.

## Tenant and outlet

- [ ] **TEN-001 Buat schema tenant dan outlet** `P0 / M`
  - Tables: `tenants`, `outlets`, dan membership yang diperlukan.
  - Tambahkan status aktif/nonaktif dan timestamp audit.
  - Acceptance: satu tenant dapat memiliki beberapa outlet tanpa kebocoran data.

- [ ] **TEN-002 Terapkan tenant resolver server-side** `P0 / L`
  - Tenant dan outlet tidak boleh dipercaya dari payload frontend.
  - Acceptance: request lintas tenant ditolak meskipun ID entity valid.

- [ ] **TEN-003 Buat outlet settings** `P0 / M`
  - Config awal: payment methods, tax, service charge, reservation, call waiter, dan timezone.
  - Acceptance: setiap outlet dapat memiliki konfigurasi berbeda tanpa perubahan source code.

## Authentication and access control

- [ ] **IAM-001 Buat schema user dan outlet membership** `P0 / M`
  - Tables: `users` dan relasi akses tenant/outlet.
  - Acceptance: user tanpa membership tidak dapat mengakses outlet.

- [ ] **IAM-002 Implementasikan login, logout, dan current user** `P0 / M`
  - Endpoints: `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`.
  - Acceptance: token/session aman, logout membatalkan akses, dan response tidak membocorkan credential.

- [ ] **IAM-003 Buat permission catalog** `P0 / M`
  - Seed permission dari grup dashboard, order, payment, table, reservation, kitchen, product, report, dan administration.
  - Acceptance: permission memiliki kode unik dan dapat digunakan oleh policy.

- [ ] **IAM-004 Buat dynamic roles** `P0 / L`
  - Tables: `roles`, `permissions`, `role_permissions`, dan `user_roles`.
  - Composite unique: `role_id + permission_id`.
  - Acceptance: outlet dapat membuat role gabungan seperti Barista Cashier.

- [ ] **IAM-005 Terapkan authorization middleware dan policies** `P0 / L`
  - Urutan: authentication, tenant scope, outlet scope, permission.
  - Acceptance: setiap protected endpoint memiliki allowed, denied, dan cross-tenant test.

- [ ] **IAM-006 Buat UI pengelolaan staff dan role** `P1 / L`
  - Gunakan shadcn/ui dan permission matrix yang dapat dioperasikan dengan keyboard.
  - Acceptance: role dapat dibuat, diedit, ditugaskan, dan validasi error terlihat.

## Shared domain foundation

- [ ] **DOM-001 Tetapkan ID, money, timezone, dan timestamp conventions** `P0 / S`
  - Rupiah disimpan sebagai integer, bukan floating point.
  - Acceptance: convention tercatat dan dipakai oleh migration awal.

- [ ] **DOM-002 Buat audit event foundation** `P0 / M`
  - Siapkan actor, tenant, outlet, entity, action, before/after, request ID, dan timestamp.
  - Acceptance: login dan perubahan settings menghasilkan audit entry.

- [ ] **DOM-003 Buat idempotency foundation** `P0 / M`
  - Siapkan penyimpanan dan lifecycle `Idempotency-Key`.
  - Acceptance: request identik dapat mengembalikan hasil sebelumnya tanpa duplikasi side effect.

- [ ] **DOM-004 Buat error contract API** `P0 / S`
  - Standarkan validation, authorization, conflict, not found, dan retryable error.
  - Acceptance: frontend dapat memetakan error tanpa parsing string bebas.

## Phase gate

- [ ] Staff dapat login dan hanya melihat outlet yang diberikan.
- [ ] Role dan permission dapat dikonfigurasi tanpa hard-coded system role.
- [ ] Settings outlet tersimpan dan terisolasi antar tenant.
- [ ] Protected endpoint telah memiliki cross-tenant denial test.
- [ ] Frontend build dan backend test lulus dari fresh checkout.

