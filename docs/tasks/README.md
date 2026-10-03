# MVP Implementation Backlog

Backlog ini memecah `docs/prd.md` menjadi unit kerja yang dapat diimplementasikan dan diverifikasi. PRD tetap menjadi sumber kebutuhan produk. Jika ada konflik, perbarui PRD atau catat keputusan di ADR sebelum mengubah scope.

## Keputusan teknis awal

- Frontend mengikuti repository aktual: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide, dan Motion.
- Backend mengikuti rekomendasi PRD: Laravel modular monolith.
- Database: PostgreSQL.
- Cache, queue, dan realtime: Redis dan SSE ketika mulai dibutuhkan.
- Semua entity bisnis wajib memiliki tenant dan outlet scope yang diselesaikan oleh server.
- Backend menjadi authority untuk harga, pajak, service charge, status, dan permission.
- Operasi finansial tidak boleh diantrikan secara offline.

## Urutan pengerjaan

| Urutan | Dokumen | Outcome |
|---:|---|---|
| 1 | [Phase 0: Foundation](./phase-0-foundation.md) | Tenant, outlet, auth, RBAC, settings, dan fondasi aplikasi siap |
| 2 | [Phase 1A: Ordering Core](./phase-1a-ordering-core.md) | Customer dapat scan QR dan membuat order dari meja |
| 3 | [Phase 1B: Payment](./phase-1b-payment.md) | QRIS sandbox dan cash berjalan end-to-end |
| 4 | [Phase 1C: Operations](./phase-1c-operations.md) | Order masuk ke station, KDS, waiter, dan printing |
| 5 | [Phase 1D: Financial Control](./phase-1d-financial-control.md) | Shift, void, refund, dan audit dapat dipertanggungjawabkan |
| 6 | [Phase 1E: Reservation & Reporting](./phase-1e-reservation-reporting.md) | Reservation, laporan, dan owner visibility tersedia |
| 7 | [Cross-cutting & Release](./cross-cutting-release.md) | Security, observability, performance, dan pilot readiness lolos |

## Aturan status

- `[ ]` Belum dimulai
- `[>]` Sedang dikerjakan
- `[x]` Selesai dan acceptance criteria sudah diverifikasi
- `[!]` Terblokir, wajib mencatat penyebab dan keputusan yang dibutuhkan

## Definition of Done per task

Sebuah task hanya boleh ditandai selesai ketika:

1. Implementasi dan migration terkait sudah masuk.
2. Authorization, tenant scope, dan outlet scope sudah diuji jika task memiliki endpoint staff.
3. Happy path dan failure path yang relevan memiliki test.
4. UI memiliki loading, empty, error, dan success state jika menampilkan data.
5. Tidak ada data contoh yang tampak nyata tetapi sebenarnya fiktif.
6. Lint, typecheck, dan build lulus.
7. Perubahan kontrak API atau keputusan domain didokumentasikan.

## Milestone validasi utama

Milestone pertama dianggap tercapai ketika alur berikut berhasil pada perangkat nyata:

```text
Scan QR meja
-> buka menu
-> pilih produk
-> checkout
-> bayar dengan QRIS sandbox
-> webhook terverifikasi
-> order tampil pada station BAR
```

