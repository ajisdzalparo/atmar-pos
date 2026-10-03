import { useState } from 'react';
import {
    AlertTriangle,
    CheckCircle2,
    Copy,
    KeyRound,
    Plus,
    Printer,
    RefreshCw,
    Search,
    ShieldCheck,
    Store,
    Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatRupiah, type DemoOrder } from '@/data/demo';

function Intro({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
            </div>
            {action}
        </div>
    );
}

function Feedback({ children }: { children: React.ReactNode }) {
    return (
        <div
            role="status"
            className="flex items-start gap-2 border border-sage-200 bg-sage-50 p-3 text-sm text-sage-900"
        >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            {children}
        </div>
    );
}

type WaiterRequest = {
    id: string;
    table: string;
    type: string;
    detail: string;
    state: 'OPEN' | 'ACKNOWLEDGED' | 'COMPLETED';
    age: string;
};

export function WaiterPage({
    orders,
    onCollect,
    onServe,
}: {
    orders: DemoOrder[];
    onCollect: (id: string) => void;
    onServe: (id: string) => void;
}) {
    const [requests, setRequests] = useState<WaiterRequest[]>([
        {
            id: 'REQ-014',
            table: 'T05',
            type: 'GENERAL',
            detail: 'Customer memanggil waiter',
            state: 'OPEN',
            age: '2 min',
        },
        {
            id: 'REQ-013',
            table: 'T09',
            type: 'ASSISTANCE',
            detail: 'Minta tambahan kursi',
            state: 'ACKNOWLEDGED',
            age: '6 min',
        },
    ]);
    const update = (id: string, state: WaiterRequest['state']) =>
        setRequests((items) =>
            items.map((item) => (item.id === id ? { ...item, state } : item))
        );
    const cashDue = orders.filter(
        (order) => order.paymentStatus === 'CASH_DUE'
    );
    const ready = orders.filter((order) => order.status === 'READY');
    return (
        <div className="space-y-6">
            <Intro
                title="Waiter operations"
                description="Satu antrean kerja untuk panggilan customer, order siap diantar, cash due, dan penutupan layanan meja."
                action={<Badge variant="outline">Data demo</Badge>}
            />
            <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle>Permintaan aktif</CardTitle>
                        <CardDescription>
                            Accept sebelum bergerak, complete setelah permintaan
                            selesai.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {requests
                            .filter((item) => item.state !== 'COMPLETED')
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-4 border border-stone-200 p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <strong>{item.table}</strong>
                                            <Badge variant="outline">
                                                {item.type}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {item.age}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            {item.detail}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {item.id}, {item.state}
                                        </p>
                                    </div>
                                    {item.state === 'OPEN' ? (
                                        <Button
                                            onClick={() =>
                                                update(item.id, 'ACKNOWLEDGED')
                                            }
                                            variant="outline"
                                            className="min-h-11"
                                        >
                                            Terima
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                update(item.id, 'COMPLETED')
                                            }
                                            className="min-h-11 bg-clay text-white hover:bg-clay/90"
                                        >
                                            Selesaikan
                                        </Button>
                                    )}
                                </div>
                            ))}
                    </CardContent>
                </Card>
                <div className="space-y-5">
                    <Card className="rounded-xl border-stone-300 shadow-none">
                        <CardHeader>
                            <CardTitle>Siap diantar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {ready.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Tidak ada order siap. Ticket baru akan
                                    muncul di sini.
                                </p>
                            ) : (
                                ready.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border border-stone-200 p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <strong>{order.table}</strong>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.id},{' '}
                                                    {order.items.join(', ')}
                                                </p>
                                            </div>
                                            <Badge variant="outline">
                                                READY
                                            </Badge>
                                        </div>
                                        <Button
                                            onClick={() => onServe(order.id)}
                                            disabled={
                                                order.paymentStatus ===
                                                'CASH_DUE'
                                            }
                                            className="mt-4 min-h-11 w-full bg-ink text-white hover:bg-ink/90"
                                        >
                                            {order.paymentStatus === 'CASH_DUE'
                                                ? 'Tagih cash dahulu'
                                                : 'Tandai served'}
                                        </Button>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border-stone-300 shadow-none">
                        <CardHeader>
                            <CardTitle>Cash belum ditagih</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {cashDue.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Semua cash sudah dikoleksi.
                                </p>
                            ) : (
                                cashDue.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between gap-3 border border-stone-200 p-4"
                                    >
                                        <div>
                                            <strong>{order.table}</strong>
                                            <p className="text-sm text-muted-foreground">
                                                {order.id},{' '}
                                                {formatRupiah(order.total)}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => onCollect(order.id)}
                                            className="min-h-11 bg-clay text-white hover:bg-clay/90"
                                        >
                                            Collect cash
                                        </Button>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

type PrintJob = {
    id: string;
    type: string;
    station: string;
    target: string;
    state: 'QUEUED' | 'PRINTED' | 'FAILED';
    attempts: number;
};

export function PrintingPage() {
    const [jobs, setJobs] = useState<PrintJob[]>([
        {
            id: 'PRN-2401',
            type: 'KITCHEN_TICKET',
            station: 'KITCHEN',
            target: 'Epson-TM-K01',
            state: 'FAILED',
            attempts: 2,
        },
        {
            id: 'PRN-2400',
            type: 'BAR_TICKET',
            station: 'BAR',
            target: 'Epson-TM-B01',
            state: 'PRINTED',
            attempts: 1,
        },
        {
            id: 'PRN-2399',
            type: 'RECEIPT',
            station: 'CASHIER',
            target: 'Epson-TM-C01',
            state: 'PRINTED',
            attempts: 1,
        },
    ]);
    const retry = (id: string) =>
        setJobs((items) =>
            items.map((job) =>
                job.id === id
                    ? { ...job, state: 'PRINTED', attempts: job.attempts + 1 }
                    : job
            )
        );
    const reprint = (job: PrintJob) =>
        setJobs((items) => [
            {
                ...job,
                id: `PRN-${2401 + items.length}`,
                state: 'QUEUED',
                attempts: 0,
            },
            ...items,
        ]);
    return (
        <div className="space-y-6">
            <Intro
                title="Printing"
                description="Konfigurasi output station, pantau print queue, retry kegagalan, dan reprint dengan jejak operasi."
            />
            <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle>Print job</CardTitle>
                        <CardDescription>
                            Payload historis dianggap snapshot dan tidak berubah
                            saat master data berubah.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job</TableHead>
                                    <TableHead>Target</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Attempts</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell>
                                            <strong>{job.id}</strong>
                                            <p className="text-xs text-muted-foreground">
                                                {job.type}, {job.station}
                                            </p>
                                        </TableCell>
                                        <TableCell>{job.target}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    job.state === 'FAILED'
                                                        ? 'border-red-200 bg-red-50 text-red-800'
                                                        : job.state ===
                                                            'PRINTED'
                                                          ? 'border-sage-200 bg-sage-50 text-sage-900'
                                                          : ''
                                                }
                                            >
                                                {job.state}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{job.attempts}</TableCell>
                                        <TableCell className="text-right">
                                            {job.state === 'FAILED' ? (
                                                <Button
                                                    onClick={() =>
                                                        retry(job.id)
                                                    }
                                                    variant="outline"
                                                >
                                                    <RefreshCw /> Retry
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => reprint(job)}
                                                    variant="outline"
                                                >
                                                    <Printer /> Reprint
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="h-fit rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle>Output station</CardTitle>
                        <CardDescription>
                            Konfigurasi dummy per outlet.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {['BAR', 'KITCHEN', 'CASHIER'].map((station, index) => (
                            <label
                                key={station}
                                className="block space-y-2 text-sm font-medium"
                            >
                                {station}
                                <Select
                                    defaultValue={
                                        index === 0
                                            ? 'DISPLAY'
                                            : index === 1
                                              ? 'DISPLAY_AND_PRINTER'
                                              : 'PRINTER'
                                    }
                                >
                                    <SelectTrigger className="min-h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DISPLAY">
                                            Display
                                        </SelectItem>
                                        <SelectItem value="PRINTER">
                                            Printer
                                        </SelectItem>
                                        <SelectItem value="DISPLAY_AND_PRINTER">
                                            Display dan printer
                                        </SelectItem>
                                        <SelectItem value="NONE">
                                            Tidak ada output
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </label>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

type FinancialRecord = {
    id: string;
    order: string;
    amount: number;
    reason: string;
    state: string;
    actor: string;
};

export function FinancialActionPage({ kind }: { kind: 'refund' | 'void' }) {
    const [records, setRecords] = useState<FinancialRecord[]>(
        kind === 'refund'
            ? [
                  {
                      id: 'REF-008',
                      order: 'ORD-1031',
                      amount: 28000,
                      reason: 'Produk tidak tersedia',
                      state: 'PROCESSED',
                      actor: 'Dimas',
                  },
              ]
            : [
                  {
                      id: 'VOID-004',
                      order: 'ORD-1024',
                      amount: 45000,
                      reason: 'Duplikat input kasir',
                      state: 'APPROVED',
                      actor: 'Rina',
                  },
              ]
    );
    const [order, setOrder] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const add = () => {
        if (!order || !reason || (kind === 'refund' && !amount)) return;
        setRecords((items) => [
            {
                id: `${kind === 'refund' ? 'REF' : 'VOID'}-0${items.length + 9}`,
                order,
                amount: Number(amount || 0),
                reason,
                state: kind === 'refund' ? 'REQUESTED' : 'PENDING_APPROVAL',
                actor: 'Rina',
            },
            ...items,
        ]);
        setOrder('');
        setAmount('');
        setReason('');
    };
    return (
        <div className="space-y-6">
            <Intro
                title={kind === 'refund' ? 'Refund' : 'Void'}
                description={
                    kind === 'refund'
                        ? 'Catat full atau partial refund tanpa mengubah transaksi asli.'
                        : 'Batalkan transaksi secara formal dengan reason dan approval.'
                }
                action={
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="min-h-11 bg-clay text-white hover:bg-clay/90">
                                <Plus /> Buat {kind}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {kind === 'refund'
                                        ? 'Ajukan refund'
                                        : 'Ajukan void'}
                                </DialogTitle>
                                <DialogDescription>
                                    Operasi demo ini membuat record baru dan
                                    mempertahankan transaksi asal.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <label className="space-y-2 text-sm font-medium">
                                    Order ID
                                    <Input
                                        value={order}
                                        onChange={(event) =>
                                            setOrder(event.target.value)
                                        }
                                        placeholder="ORD-1042"
                                    />
                                </label>
                                {kind === 'refund' && (
                                    <label className="space-y-2 text-sm font-medium">
                                        Nominal
                                        <Input
                                            value={amount}
                                            onChange={(event) =>
                                                setAmount(event.target.value)
                                            }
                                            inputMode="numeric"
                                            placeholder="28000"
                                        />
                                    </label>
                                )}
                                <label className="space-y-2 text-sm font-medium">
                                    Alasan
                                    <Input
                                        value={reason}
                                        onChange={(event) =>
                                            setReason(event.target.value)
                                        }
                                        placeholder="Tulis alasan operasional"
                                    />
                                </label>
                            </div>
                            <DialogFooter>
                                <Button
                                    disabled={
                                        !order ||
                                        !reason ||
                                        (kind === 'refund' && !amount)
                                    }
                                    onClick={add}
                                    className="bg-clay text-white hover:bg-clay/90"
                                >
                                    Simpan pengajuan
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                }
            />
            <Card className="rounded-xl border-stone-300 shadow-none">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Order</TableHead>
                                {kind === 'refund' && (
                                    <TableHead>Amount</TableHead>
                                )}
                                <TableHead>Reason</TableHead>
                                <TableHead>Actor</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">
                                        {record.id}
                                    </TableCell>
                                    <TableCell>{record.order}</TableCell>
                                    {kind === 'refund' && (
                                        <TableCell>
                                            {formatRupiah(record.amount)}
                                        </TableCell>
                                    )}
                                    <TableCell>{record.reason}</TableCell>
                                    <TableCell>{record.actor}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {record.state}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export function CatalogConfigPage({
    mode,
}: {
    mode: 'categories' | 'options';
}) {
    const [categories, setCategories] = useState([
        { id: 'CAT-1', name: 'Coffee', active: true },
        { id: 'CAT-2', name: 'Non Coffee', active: true },
        { id: 'CAT-3', name: 'Food', active: true },
    ]);
    const [variants, setVariants] = useState([
        {
            id: 'VAR-1',
            name: 'Size',
            values: 'Regular, Large +5k',
            required: true,
        },
        {
            id: 'VAR-2',
            name: 'Temperature',
            values: 'Hot, Ice +3k',
            required: true,
        },
    ]);
    const [modifiers, setModifiers] = useState([
        { id: 'MOD-1', name: 'Extra Shot', price: 5000, active: true },
        { id: 'MOD-2', name: 'Oat Milk', price: 7000, active: true },
        { id: 'MOD-3', name: 'Caramel', price: 3000, active: true },
    ]);
    if (mode === 'categories')
        return (
            <div className="space-y-6">
                <Intro
                    title="Categories"
                    description="Urutan dan availability kategori yang tampil pada POS dan customer menu."
                    action={
                        <Button
                            onClick={() =>
                                setCategories((items) => [
                                    ...items,
                                    {
                                        id: `CAT-${items.length + 1}`,
                                        name: `Kategori demo ${items.length + 1}`,
                                        active: true,
                                    },
                                ])
                            }
                            className="min-h-11 bg-clay text-white hover:bg-clay/90"
                        >
                            <Plus /> Tambah kategori
                        </Button>
                    }
                />
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardContent className="divide-y divide-stone-200 p-0">
                        {categories.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 p-4"
                            >
                                <span className="grid size-9 place-items-center border border-stone-300 text-sm">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <strong>{item.name}</strong>
                                    <p className="text-xs text-muted-foreground">
                                        {item.id}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setCategories((items) =>
                                            items.map((category) =>
                                                category.id === item.id
                                                    ? {
                                                          ...category,
                                                          active: !category.active,
                                                      }
                                                    : category
                                            )
                                        )
                                    }
                                >
                                    {item.active ? 'Nonaktifkan' : 'Aktifkan'}
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    return (
        <div className="space-y-6">
            <Intro
                title="Variants dan modifiers"
                description="Variant menentukan pilihan produk wajib. Modifier menangani add-on opsional dan tambahan harga."
            />
            <Tabs defaultValue="variants">
                <TabsList>
                    <TabsTrigger value="variants">Variant groups</TabsTrigger>
                    <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
                </TabsList>
                <TabsContent value="variants" className="mt-5">
                    <Card className="rounded-xl border-stone-300 shadow-none">
                        <CardContent className="divide-y divide-stone-200 p-0">
                            {variants.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="flex-1">
                                        <strong>{item.name}</strong>
                                        <p className="text-sm text-muted-foreground">
                                            {item.values}
                                        </p>
                                    </div>
                                    <Badge variant="outline">
                                        {item.required
                                            ? 'Required, pilih 1'
                                            : 'Optional'}
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setVariants((items) =>
                                                items.map((variant) =>
                                                    variant.id === item.id
                                                        ? {
                                                              ...variant,
                                                              required:
                                                                  !variant.required,
                                                          }
                                                        : variant
                                                )
                                            )
                                        }
                                    >
                                        Ubah aturan
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="modifiers" className="mt-5">
                    <Card className="rounded-xl border-stone-300 shadow-none">
                        <CardContent className="divide-y divide-stone-200 p-0">
                            {modifiers.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4"
                                >
                                    <div className="flex-1">
                                        <strong>{item.name}</strong>
                                        <p className="text-sm text-muted-foreground">
                                            {formatRupiah(item.price)}
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setModifiers((items) =>
                                                items.map((modifier) =>
                                                    modifier.id === item.id
                                                        ? {
                                                              ...modifier,
                                                              active: !modifier.active,
                                                          }
                                                        : modifier
                                                )
                                            )
                                        }
                                    >
                                        {item.active
                                            ? 'Tandai unavailable'
                                            : 'Aktifkan'}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export function AccessPage({ mode }: { mode: 'users' | 'roles' }) {
    const [usersData, setUsersData] = useState([
        { name: 'Rina', role: 'Barista Cashier', station: 'BAR', active: true },
        { name: 'Dimas', role: 'Waiter', station: 'Floor', active: true },
        { name: 'Ayu', role: 'Kitchen', station: 'KITCHEN', active: true },
    ]);
    const permissions = [
        'dashboard.view',
        'order.create',
        'payment.collect_cash',
        'payment.refund',
        'table.manage',
        'station.update',
        'report.view',
        'role.manage',
        'void.approve',
    ];
    const [grants, setGrants] = useState<Record<string, boolean>>({
        'dashboard.view': true,
        'order.create': true,
        'payment.collect_cash': true,
        'table.manage': true,
    });
    if (mode === 'users')
        return (
            <div className="space-y-6">
                <Intro
                    title="Users"
                    description="Staff, role dinamis, station assignment, dan status akses outlet."
                    action={
                        <Button
                            onClick={() =>
                                setUsersData((items) => [
                                    ...items,
                                    {
                                        name: `Staff demo ${items.length + 1}`,
                                        role: 'Waiter',
                                        station: 'Floor',
                                        active: true,
                                    },
                                ])
                            }
                            className="min-h-11 bg-clay text-white hover:bg-clay/90"
                        >
                            <Plus /> Tambah staff
                        </Button>
                    }
                />
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Staff</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Station</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usersData.map((user) => (
                                    <TableRow key={user.name}>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.station}</TableCell>
                                        <TableCell>
                                            {user.active ? 'Aktif' : 'Nonaktif'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setUsersData((items) =>
                                                        items.map((item) =>
                                                            item.name ===
                                                            user.name
                                                                ? {
                                                                      ...item,
                                                                      active: !item.active,
                                                                  }
                                                                : item
                                                        )
                                                    )
                                                }
                                            >
                                                {user.active
                                                    ? 'Nonaktifkan'
                                                    : 'Aktifkan'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        );
    return (
        <div className="space-y-6">
            <Intro
                title="Roles dan permissions"
                description="Role dapat dikonfigurasi tanpa mengubah source code. Matrix ini memakai role Barista Cashier sebagai contoh."
            />
            <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle>Role</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <button className="flex min-h-11 w-full items-center gap-3 bg-ink px-3 text-left text-sm text-white">
                            <ShieldCheck className="size-4" /> Barista Cashier
                        </button>
                        <button className="flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm">
                            <Users className="size-4" /> Waiter
                        </button>
                        <button className="flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm">
                            <KeyRound className="size-4" /> Kitchen
                        </button>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle>Permission Barista Cashier</CardTitle>
                        <CardDescription>
                            Perubahan demo tersimpan pada state browser.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        {permissions.map((permission) => (
                            <label
                                key={permission}
                                className="flex min-h-12 items-center gap-3 border border-stone-200 p-3 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={Boolean(grants[permission])}
                                    onChange={(event) =>
                                        setGrants((current) => ({
                                            ...current,
                                            [permission]: event.target.checked,
                                        }))
                                    }
                                    className="size-5 accent-clay"
                                />
                                <span>{permission}</span>
                            </label>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export function StationsPage() {
    const [stations, setStations] = useState([
        { id: 'ST-1', name: 'BAR', output: 'DISPLAY', active: true },
        {
            id: 'ST-2',
            name: 'KITCHEN',
            output: 'DISPLAY_AND_PRINTER',
            active: true,
        },
    ]);
    return (
        <div className="space-y-6">
            <Intro
                title="Preparation stations"
                description="Station bersifat dinamis. Product aktif wajib memiliki station sebelum dapat dijual."
                action={
                    <Button
                        onClick={() =>
                            setStations((items) => [
                                ...items,
                                {
                                    id: `ST-${items.length + 1}`,
                                    name: `STATION ${items.length + 1}`,
                                    output: 'NONE',
                                    active: true,
                                },
                            ])
                        }
                        className="min-h-11 bg-clay text-white hover:bg-clay/90"
                    >
                        <Plus /> Tambah station
                    </Button>
                }
            />
            <div className="grid gap-4 md:grid-cols-2">
                {stations.map((station) => (
                    <Card
                        key={station.id}
                        className="rounded-xl border-stone-300 shadow-none"
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{station.name}</CardTitle>
                                    <CardDescription>
                                        {station.id}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline">
                                    {station.active ? 'ACTIVE' : 'INACTIVE'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <label className="space-y-2 text-sm font-medium">
                                Output mode
                                <Select
                                    value={station.output}
                                    onValueChange={(value) =>
                                        setStations((items) =>
                                            items.map((item) =>
                                                item.id === station.id
                                                    ? { ...item, output: value }
                                                    : item
                                            )
                                        )
                                    }
                                >
                                    <SelectTrigger className="min-h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DISPLAY">
                                            Display
                                        </SelectItem>
                                        <SelectItem value="PRINTER">
                                            Printer
                                        </SelectItem>
                                        <SelectItem value="DISPLAY_AND_PRINTER">
                                            Display dan printer
                                        </SelectItem>
                                        <SelectItem value="NONE">
                                            None
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </label>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setStations((items) =>
                                        items.map((item) =>
                                            item.id === station.id
                                                ? {
                                                      ...item,
                                                      active: !item.active,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            >
                                {station.active
                                    ? 'Nonaktifkan station'
                                    : 'Aktifkan station'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export function AuditPage() {
    const entries = [
        {
            time: '10:42',
            actor: 'Rina',
            action: 'payment.collect_cash',
            entity: 'ORD-1042',
            reason: 'Cash diterima waiter',
            old: 'CASH_DUE',
            next: 'PAID',
        },
        {
            time: '09:18',
            actor: 'Dimas',
            action: 'table.transfer',
            entity: 'TS-00215',
            reason: 'Customer pindah area',
            old: 'T03',
            next: 'T07',
        },
        {
            time: '08:36',
            actor: 'Owner',
            action: 'product.price.update',
            entity: 'Cafe Latte',
            reason: 'Update harga outlet',
            old: '26000',
            next: '28000',
        },
        {
            time: '08:05',
            actor: 'Rina',
            action: 'cash_shift.open',
            entity: 'SFT-089',
            reason: 'Opening shift',
            old: '-',
            next: '500000',
        },
    ];
    const [query, setQuery] = useState('');
    const [action, setAction] = useState('ALL');
    const visible = entries.filter(
        (entry) =>
            `${entry.actor} ${entry.action} ${entry.entity}`
                .toLowerCase()
                .includes(query.toLowerCase()) &&
            (action === 'ALL' || entry.action.startsWith(action))
    );
    return (
        <div className="space-y-6">
            <Intro
                title="Audit log"
                description="Jejak perubahan sensitif mempertahankan actor, entity, nilai lama, nilai baru, reason, dan waktu."
            />
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-500" />
                    <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Cari actor, action, atau entity"
                        className="min-h-11 bg-white pl-9"
                    />
                </div>
                <Select value={action} onValueChange={setAction}>
                    <SelectTrigger className="min-h-11 bg-white sm:w-52">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Semua action</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="cash_shift">Cash shift</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Card className="rounded-xl border-stone-300 shadow-none">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Waktu</TableHead>
                                <TableHead>Actor</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Entity</TableHead>
                                <TableHead>Perubahan</TableHead>
                                <TableHead>Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visible.map((entry) => (
                                <TableRow key={`${entry.time}-${entry.action}`}>
                                    <TableCell>{entry.time}</TableCell>
                                    <TableCell>{entry.actor}</TableCell>
                                    <TableCell className="font-medium">
                                        {entry.action}
                                    </TableCell>
                                    <TableCell>{entry.entity}</TableCell>
                                    <TableCell>
                                        {entry.old} → {entry.next}
                                    </TableCell>
                                    <TableCell>{entry.reason}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export function QrTablesPage() {
    const [tokens, setTokens] = useState([
        { table: 'T01', area: 'Indoor', token: 'atmar-t01-a8f2', scans: 18 },
        { table: 'T02', area: 'Indoor', token: 'atmar-t02-b4d1', scans: 24 },
        { table: 'T07', area: 'Outdoor', token: 'atmar-t07-f9c3', scans: 31 },
    ]);
    const [feedback, setFeedback] = useState('');
    const regenerate = (table: string) =>
        setTokens((items) =>
            items.map((item) =>
                item.table === table
                    ? {
                          ...item,
                          token: `atmar-${table.toLowerCase()}-${Math.random().toString(16).slice(2, 6)}`,
                      }
                    : item
            )
        );
    return (
        <div className="space-y-6">
            <Intro
                title="QR tables"
                description="Token QR bersifat opaque dan terikat pada outlet serta meja. Regenerasi mengganti token lama."
            />
            {feedback && <Feedback>{feedback}</Feedback>}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tokens.map((item) => (
                    <Card
                        key={item.table}
                        className="rounded-xl border-stone-300 shadow-none"
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{item.table}</CardTitle>
                                    <CardDescription>
                                        {item.area}
                                    </CardDescription>
                                </div>
                                <div className="grid size-14 place-items-center border-2 border-ink">
                                    <span className="text-xs font-bold">
                                        QR
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border border-stone-200 bg-stone-50 p-3 font-mono text-xs break-all">
                                {item.token}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {item.scans} scan demo
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() =>
                                        setFeedback(
                                            `Link ${item.table} disalin dalam simulasi.`
                                        )
                                    }
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <Copy /> Salin
                                </Button>
                                <Button
                                    onClick={() => regenerate(item.table)}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <RefreshCw /> Regenerasi
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export function AreasPage() {
  const [areas, setAreas] = useState([{ id: 'AREA-1', name: 'Indoor', tables: 5, active: true }, { id: 'AREA-2', name: 'Outdoor', tables: 5, active: true }])
  const [name, setName] = useState('')
  return <div className="space-y-6"><Intro title="Areas" description="Area bersifat konfigurabel per outlet dan menjadi induk table map, QR table, serta reservation assignment." action={<Dialog><DialogTrigger asChild><Button className="min-h-11 bg-clay text-white hover:bg-clay/90"><Plus /> Tambah area</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Tambah area</DialogTitle><DialogDescription>Contoh area: Smoking, Rooftop, atau VIP.</DialogDescription></DialogHeader><label className="space-y-2 text-sm font-medium">Nama area<Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Rooftop" /></label><DialogFooter><Button disabled={!name.trim()} onClick={() => { setAreas((items) => [...items, { id: `AREA-${items.length + 1}`, name: name.trim(), tables: 0, active: true }]); setName('') }} className="bg-clay text-white hover:bg-clay/90">Simpan area</Button></DialogFooter></DialogContent></Dialog>} /><div className="grid gap-4 md:grid-cols-2">{areas.map((area) => <Card key={area.id} className="rounded-xl border-stone-300 shadow-none"><CardHeader><div className="flex items-start justify-between"><div><CardTitle>{area.name}</CardTitle><CardDescription>{area.id}, {area.tables} meja</CardDescription></div><Badge variant="outline">{area.active ? 'ACTIVE' : 'INACTIVE'}</Badge></div></CardHeader><CardContent><Button variant="outline" onClick={() => setAreas((items) => items.map((item) => item.id === area.id ? { ...item, active: !item.active } : item))}>{area.active ? 'Nonaktifkan area' : 'Aktifkan area'}</Button></CardContent></Card>)}</div></div>
}

export function TenantOutletPage() {
    const [saved, setSaved] = useState(false);
    return (
        <div className="space-y-6">
            <Intro
                title="Business dan outlet"
                description="MVP beroperasi pada satu outlet aktif, tetapi konteks tenant dan outlet tetap terlihat pada konfigurasi."
            />
            <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle>Atmar Coffee</CardTitle>
                        <CardDescription>Tenant demo T-ATMAR</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm font-medium">
                            Nama outlet
                            <Input defaultValue="Atmar Coffee Majalengka" />
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            Timezone
                            <Select defaultValue="Asia/Jakarta">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Asia/Jakarta">
                                        Asia/Jakarta
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium sm:col-span-2">
                            Alamat
                            <Input defaultValue="Majalengka, Jawa Barat" />
                        </label>
                        <div className="sm:col-span-2">
                            <Button
                                onClick={() => setSaved(true)}
                                className="bg-clay text-white hover:bg-clay/90"
                            >
                                Simpan outlet
                            </Button>
                        </div>
                        {saved && (
                            <div className="sm:col-span-2">
                                <Feedback>
                                    Konfigurasi outlet demo tersimpan.
                                </Feedback>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card className="h-fit rounded-xl border-stone-300 bg-ink text-white shadow-none">
                    <CardHeader>
                        <Store className="size-6" />
                        <CardTitle className="text-white">
                            Outlet aktif
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p>Atmar Coffee Majalengka</p>
                        <Separator className="bg-white/10" />
                        <p className="text-stone-300">Tenant scope: T-ATMAR</p>
                        <p className="text-stone-300">
                            Outlet scope: OUTLET-MJL-01
                        </p>
                        <p className="text-stone-300">Status: ACTIVE</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export function AuthPreviewPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    if (signedIn)
        return (
            <div className="mx-auto max-w-lg space-y-6">
                <Intro
                    title="Session aktif"
                    description="Autentikasi demo berhasil. Backend nantinya menerbitkan session dan menyelesaikan tenant serta outlet context."
                />
                <Feedback>
                    Masuk sebagai Owner Demo pada Atmar Coffee Majalengka.
                </Feedback>
                <Button
                    onClick={() => {
                        setSignedIn(false);
                        setPassword('');
                    }}
                    variant="outline"
                    className="min-h-11"
                >
                    Keluar dari session demo
                </Button>
            </div>
        );
    return (
        <div className="mx-auto max-w-lg space-y-6">
            <Intro
                title="Staff sign in"
                description="Customer ordering tidak membutuhkan akun. Login ini hanya untuk owner dan staff outlet."
            />
            <Card className="rounded-xl border-stone-300 shadow-none">
                <CardHeader>
                    <CardTitle>Masuk ke Atmar POS</CardTitle>
                    <CardDescription>
                        Gunakan nilai apa pun untuk mencoba autentikasi
                        frontend.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <label className="space-y-2 text-sm font-medium">
                        Email
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="staff@outlet.example"
                        />
                    </label>
                    <label className="space-y-2 text-sm font-medium">
                        Password
                        <Input
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </label>
                    <Button
                        disabled={!email || !password}
                        onClick={() => setSignedIn(true)}
                        className="min-h-12 w-full bg-clay text-white hover:bg-clay/90"
                    >
                        Masuk
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export function CoverageSummaryPage() {
    return (
        <div className="space-y-6">
            <Intro
                title="Frontend scope"
                description="Ringkasan modul PRD yang tersedia pada prototype dummy-data ini."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[
                    [
                        'Ordering',
                        'Customer QR, cart, variant, modifier, checkout, POS',
                    ],
                    [
                        'Operations',
                        'Tables, sessions, waiter, KDS, station routing, printing',
                    ],
                    [
                        'Payments',
                        'QRIS simulation, cash due, collection, shift',
                    ],
                    ['Financial control', 'Void, refund, audit trail'],
                    [
                        'Management',
                        'Products, categories, options, users, roles, stations',
                    ],
                    [
                        'Visibility',
                        'Dashboard, reports, reservation, outlet settings',
                    ],
                ].map(([title, detail]) => (
                    <Card
                        key={title}
                        className="rounded-xl border-stone-300 shadow-none"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg">{title}</CardTitle>
                            <CardDescription>{detail}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <div className="flex items-start gap-3 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
                <AlertTriangle className="mt-0.5 size-5 shrink-0" />
                <p>
                    Semua transaksi dan identitas pada prototype ini adalah data
                    demo. Backend tetap menjadi authority untuk harga,
                    permission, status, payment verification, dan audit
                    persistence.
                </p>
            </div>
        </div>
    );
}
