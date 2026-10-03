import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
    AlertTriangle,
    BarChart3,
    Banknote,
    Bell,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ClipboardList,
    Clock3,
    Coffee,
    CookingPot,
    CreditCard,
    Download,
    FileClock,
    Grid3X3,
    LayoutDashboard,
    Menu,
    Minus,
    Network,
    Package,
    Plus,
    Printer,
    QrCode,
    ReceiptText,
    RotateCcw,
    ScanLine,
    Search,
    Settings,
    ShieldCheck,
    ShoppingCart,
    SlidersHorizontal,
    Store,
    KeyRound,
    Tags,
    UserCog,
    Users,
    Utensils,
    WalletCards,
    type LucideIcon,
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AccessPage,
    AreasPage,
    AuthPreviewPage,
    AuditPage,
    CatalogConfigPage,
    CoverageSummaryPage,
    FinancialActionPage,
    PrintingPage,
    QrTablesPage,
    StationsPage,
    TenantOutletPage,
    WaiterPage,
} from '@/components/advanced-pages';
import {
    formatRupiah,
    initialOrders,
    initialTickets,
    products as initialProducts,
    reservations as initialReservations,
    tables,
    type DemoOrder,
    type Product,
    type TableData,
    type Ticket,
} from '@/data/demo';

type View =
    | 'overview'
    | 'pos'
    | 'orders'
    | 'tables'
    | 'areas'
    | 'kitchen'
    | 'waiter'
    | 'printing'
    | 'payments'
    | 'refunds'
    | 'voids'
    | 'shifts'
    | 'products'
    | 'categories'
    | 'options'
    | 'reservations'
    | 'reports'
    | 'audit'
    | 'users'
    | 'roles'
    | 'stations'
    | 'qr-tables'
    | 'outlet'
    | 'auth'
    | 'scope'
    | 'customer'
    | 'settings';

type CartItem = Product & {
    quantity: number;
    options?: string[];
    note?: string;
};

const navigation: {
    label: string;
    items: { id: View; label: string; icon: LucideIcon }[];
}[] = [
    {
        label: 'Operasional',
        items: [
            { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
            { id: 'pos', label: 'POS', icon: ShoppingCart },
            { id: 'orders', label: 'Order', icon: ReceiptText },
            { id: 'tables', label: 'Meja', icon: Grid3X3 },
            { id: 'areas', label: 'Areas', icon: LayoutDashboard },
            { id: 'kitchen', label: 'Kitchen', icon: CookingPot },
            { id: 'waiter', label: 'Waiter', icon: Users },
            { id: 'printing', label: 'Printing', icon: Printer },
        ],
    },
    {
        label: 'Transaksi',
        items: [
            { id: 'payments', label: 'Pembayaran', icon: CreditCard },
            { id: 'refunds', label: 'Refund', icon: RotateCcw },
            { id: 'voids', label: 'Void', icon: AlertTriangle },
            { id: 'shifts', label: 'Shift Kas', icon: WalletCards },
        ],
    },
    {
        label: 'Pengelolaan',
        items: [
            { id: 'products', label: 'Produk', icon: Package },
            { id: 'categories', label: 'Kategori', icon: Tags },
            {
                id: 'options',
                label: 'Variant & Modifier',
                icon: SlidersHorizontal,
            },
            { id: 'reservations', label: 'Reservasi', icon: CalendarDays },
            { id: 'reports', label: 'Laporan', icon: BarChart3 },
            { id: 'audit', label: 'Audit Log', icon: FileClock },
        ],
    },
    {
        label: 'Management',
        items: [
            { id: 'users', label: 'Users', icon: UserCog },
            { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
            { id: 'stations', label: 'Stations', icon: Network },
            { id: 'qr-tables', label: 'QR Tables', icon: ScanLine },
            { id: 'outlet', label: 'Business & Outlet', icon: Store },
            { id: 'auth', label: 'Auth Preview', icon: KeyRound },
            { id: 'settings', label: 'Pengaturan', icon: Settings },
            { id: 'scope', label: 'Frontend Scope', icon: ClipboardList },
        ],
    },
];

const viewNames: Record<View, string> = {
    overview: 'Ringkasan operasional',
    pos: 'Point of sale',
    orders: 'Order',
    tables: 'Meja dan sesi',
    areas: 'Areas',
    kitchen: 'Kitchen display',
    waiter: 'Waiter operations',
    printing: 'Printing',
    payments: 'Pembayaran',
    refunds: 'Refund',
    voids: 'Void',
    shifts: 'Shift kas',
    products: 'Produk dan menu',
    categories: 'Categories',
    options: 'Variants dan modifiers',
    reservations: 'Reservasi',
    reports: 'Laporan',
    audit: 'Audit log',
    users: 'Users',
    roles: 'Roles dan permissions',
    stations: 'Preparation stations',
    'qr-tables': 'QR tables',
    outlet: 'Business dan outlet',
    auth: 'Staff sign in',
    scope: 'Frontend scope',
    customer: 'Customer QR ordering',
    settings: 'Pengaturan outlet',
};

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        AVAILABLE: 'border-sage-200 bg-sage-50 text-sage-800',
        OCCUPIED: 'border-clay-200 bg-clay-50 text-clay-800',
        RESERVED: 'border-amber-200 bg-amber-50 text-amber-800',
        READY: 'border-sage-200 bg-sage-50 text-sage-800',
        PAID: 'border-sage-200 bg-sage-50 text-sage-800',
        CONFIRMED: 'border-blue-200 bg-blue-50 text-blue-800',
        PREPARING: 'border-amber-200 bg-amber-50 text-amber-800',
        NEW: 'border-stone-300 bg-white text-stone-700',
        CASH_DUE: 'border-red-200 bg-red-50 text-red-800',
        PENDING: 'border-amber-200 bg-amber-50 text-amber-800',
        WAITING_PAYMENT: 'border-amber-200 bg-amber-50 text-amber-800',
        SERVED: 'border-stone-200 bg-stone-100 text-stone-700',
    };

    const labels: Record<string, string> = {
        AVAILABLE: 'Tersedia',
        OCCUPIED: 'Terisi',
        RESERVED: 'Dipesan',
        READY: 'Siap',
        PAID: 'Lunas',
        CONFIRMED: 'Dikonfirmasi',
        PREPARING: 'Disiapkan',
        NEW: 'Baru',
        CASH_DUE: 'Cash belum ditagih',
        PENDING: 'Menunggu',
        WAITING_PAYMENT: 'Menunggu pembayaran',
        SERVED: 'Selesai',
    };

    return (
        <Badge
            variant="outline"
            className={
                styles[status] ?? 'border-stone-200 bg-stone-100 text-stone-700'
            }
        >
            {labels[status] ?? status}
        </Badge>
    );
}

function PageIntro({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
                <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {title}
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    {description}
                </p>
            </div>
            {action}
        </div>
    );
}

function EmptyState({
    icon: Icon,
    title,
    description,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
}) {
    return (
        <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-stone-300 bg-white px-6 text-center">
            <Icon aria-hidden="true" className="mb-3 size-6 text-stone-500" />
            <p className="font-medium text-ink">{title}</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

function Sidebar({
    activeView,
    onNavigate,
}: {
    activeView: View;
    onNavigate: (view: View) => void;
}) {
    return (
        <div className="flex h-full flex-col bg-ink text-stone-100">
            <div className="flex min-h-20 items-center gap-3 border-b border-white/10 px-5">
                <div className="grid size-9 place-items-center rounded-md bg-clay text-white">
                    <Coffee
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={2.25}
                    />
                </div>
                <div>
                    <p className="text-base font-semibold leading-none">
                        Atmar POS
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                        Atmar Coffee, Majalengka
                    </p>
                </div>
            </div>

            <nav
                aria-label="Navigasi utama"
                className="flex-1 overflow-y-auto px-3 py-5"
            >
                {navigation.map((group) => (
                    <div key={group.label} className="mb-6">
                        <p className="mb-2 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-stone-500">
                            {group.label}
                        </p>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const active = activeView === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => onNavigate(item.id)}
                                        className={`flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay ${
                                            active
                                                ? 'bg-white text-ink'
                                                : 'text-stone-300 hover:bg-white/8 hover:text-white'
                                        }`}
                                    >
                                        <Icon
                                            aria-hidden="true"
                                            className="size-4"
                                            strokeWidth={active ? 2.25 : 1.8}
                                        />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="border-t border-white/10 p-3">
                <button
                    type="button"
                    onClick={() => onNavigate('customer')}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay ${
                        activeView === 'customer'
                            ? 'bg-white text-ink'
                            : 'text-stone-300 hover:bg-white/8 hover:text-white'
                    }`}
                >
                    <QrCode aria-hidden="true" className="size-4" />
                    Preview customer
                </button>
            </div>
        </div>
    );
}

function OverviewPage({
    orders,
    onNavigate,
}: {
    orders: DemoOrder[];
    onNavigate: (view: View) => void;
}) {
    const ready = orders.filter((order) => order.status === 'READY');
    const due = orders.filter((order) => order.paymentStatus === 'CASH_DUE');
    const active = orders.filter(
        (order) => !['SERVED', 'WAITING_PAYMENT'].includes(order.status)
    );

    return (
        <div className="space-y-8">
            <PageIntro
                title="Fokus operasional sekarang"
                description="Prioritaskan pesanan siap, tagihan cash, dan hambatan station. Semua isi di layar ini adalah data demo."
                action={
                    <Button
                        onClick={() => onNavigate('pos')}
                        className="min-h-11 bg-clay text-white hover:bg-clay/90"
                    >
                        <Plus /> Buat order POS
                    </Button>
                }
            />

            <section
                aria-labelledby="attention-title"
                className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]"
            >
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader className="border-b border-stone-200">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle
                                    id="attention-title"
                                    className="text-lg"
                                >
                                    Perlu tindakan
                                </CardTitle>
                                <CardDescription>
                                    Urutan berdasarkan dampak ke customer.
                                </CardDescription>
                            </div>
                            <Badge
                                variant="outline"
                                className="border-red-200 bg-red-50 text-red-800"
                            >
                                Data demo
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="divide-y divide-stone-200 p-0">
                        {due.map((order) => (
                            <button
                                key={order.id}
                                type="button"
                                onClick={() => onNavigate('payments')}
                                className="flex min-h-20 w-full items-center gap-4 px-5 text-left hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clay"
                            >
                                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-700">
                                    <Banknote className="size-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-ink">
                                        Tagih cash {order.table}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {order.id}, {formatRupiah(order.total)},
                                        siap diantar
                                    </p>
                                </div>
                                <span className="text-xs font-medium text-red-700">
                                    {order.age}
                                </span>
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => onNavigate('kitchen')}
                            className="flex min-h-20 w-full items-center gap-4 px-5 text-left hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clay"
                        >
                            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-700">
                                <Clock3 className="size-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-ink">
                                    Ticket kitchen melewati target
                                </p>
                                <p className="truncate text-sm text-muted-foreground">
                                    KIT-052, French Fries untuk T07
                                </p>
                            </div>
                            <span className="text-xs font-medium text-amber-800">
                                11 min
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onNavigate('tables')}
                            className="flex min-h-20 w-full items-center gap-4 px-5 text-left hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clay"
                        >
                            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                                <Bell className="size-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-ink">
                                    Customer memanggil waiter
                                </p>
                                <p className="truncate text-sm text-muted-foreground">
                                    T05, permintaan bantuan umum
                                </p>
                            </div>
                            <span className="text-xs font-medium text-blue-800">
                                2 min
                            </span>
                        </button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <Card className="rounded-xl border-stone-300 bg-ink text-white shadow-none">
                        <CardHeader>
                            <CardDescription className="text-stone-400">
                                Simulasi penjualan hari ini
                            </CardDescription>
                            <CardTitle className="text-3xl">
                                Rp2.480.000
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-stone-400">QRIS</span>
                                <span>Rp1.620.000</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-stone-400">Cash</span>
                                <span>Rp860.000</span>
                            </div>
                            <Separator className="bg-white/10" />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-stone-400">
                                    Cash belum ditagih
                                </span>
                                <span className="text-red-300">Rp86.000</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border-stone-300 shadow-none">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                                Alur order aktif
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span>Dikonfirmasi</span>
                                <strong>
                                    {
                                        active.filter(
                                            (o) => o.status === 'CONFIRMED'
                                        ).length
                                    }
                                </strong>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>Disiapkan</span>
                                <strong>
                                    {
                                        active.filter(
                                            (o) => o.status === 'PREPARING'
                                        ).length
                                    }
                                </strong>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>Siap diantar</span>
                                <strong>{ready.length}</strong>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section aria-labelledby="station-title">
                <div className="mb-4 flex items-center justify-between">
                    <h2
                        id="station-title"
                        className="text-lg font-semibold text-ink"
                    >
                        Beban station
                    </h2>
                    <Button
                        variant="ghost"
                        onClick={() => onNavigate('kitchen')}
                    >
                        Buka KDS
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        {
                            name: 'BAR',
                            value: 68,
                            note: '3 ticket aktif, tertua 8 min',
                        },
                        {
                            name: 'KITCHEN',
                            value: 42,
                            note: '2 ticket aktif, tertua 11 min',
                        },
                    ].map((station) => (
                        <Card
                            key={station.name}
                            className="rounded-xl border-stone-300 shadow-none"
                        >
                            <CardContent className="pt-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-ink">
                                            {station.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {station.note}
                                        </p>
                                    </div>
                                    <span className="text-sm font-medium">
                                        {station.value}%
                                    </span>
                                </div>
                                <Progress value={station.value} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}

function PosPage({
    onCreateOrder,
}: {
    onCreateOrder: (payment: 'QRIS' | 'CASH', total: number) => void;
}) {
    const [category, setCategory] = useState('Coffee');
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [payment, setPayment] = useState<'QRIS' | 'CASH'>('QRIS');
    const [table, setTable] = useState('Counter');
    const [submitted, setSubmitted] = useState(false);
    const [lastTotal, setLastTotal] = useState(0);
    const visibleProducts = initialProducts.filter(
        (product) =>
            product.category === category &&
            product.name.toLowerCase().includes(search.toLowerCase())
    );
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const service = Math.round(subtotal * 0.05);
    const tax = Math.round((subtotal + service) * 0.1);
    const total = subtotal + service + tax;

    const addItem = (product: Product) => {
        setSubmitted(false);
        setCart((current) => {
            const existing = current.find((item) => item.id === product.id);
            return existing
                ? current.map((item) =>
                      item.id === product.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                  )
                : [...current, { ...product, quantity: 1 }];
        });
    };

    const changeQuantity = (id: string, amount: number) => {
        setCart((current) =>
            current
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + amount }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const submit = () => {
        if (total === 0) return;
        onCreateOrder(payment, total);
        setLastTotal(total);
        setCart([]);
        setSubmitted(true);
    };

    return (
        <div className="space-y-6">
            <PageIntro
                title="Point of sale"
                description="Buat order staff dengan price engine dan alur yang sama seperti customer QR."
                action={
                    <Badge
                        variant="outline"
                        className="border-stone-300 bg-white"
                    >
                        Data demo
                    </Badge>
                }
            />
            {submitted && (
                <div
                    role="status"
                    className="flex flex-col gap-3 border border-sage-200 bg-sage-50 p-4 text-sm text-sage-900 sm:flex-row sm:items-center"
                >
                    <div className="flex flex-1 items-center gap-3">
                        <CheckCircle2 className="size-5" /> Order demo berhasil
                        dibuat dan masuk ke antrean.
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Lihat receipt</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Receipt ORD-DEMO</DialogTitle>
                                <DialogDescription>
                                    Snapshot transaksi staff-created order.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 border border-dashed border-stone-400 p-5 text-sm">
                                <div className="text-center">
                                    <strong>Atmar Coffee Majalengka</strong>
                                    <p>{table}</p>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span>Total</span>
                                    <strong>{formatRupiah(lastTotal)}</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span>Payment</span>
                                    <span>{payment}</span>
                                </div>
                                <p className="text-center font-medium">
                                    {payment === 'QRIS'
                                        ? 'WAITING PAYMENT'
                                        : 'CASH DUE'}
                                </p>
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={() => window.print()}
                                    variant="outline"
                                >
                                    <Printer /> Print receipt
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            <div className="grid min-h-155 gap-5 xl:grid-cols-[1fr_380px]">
                <section className="space-y-4" aria-label="Daftar produk">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Tabs value={category} onValueChange={setCategory}>
                            <TabsList>
                                {['Coffee', 'Non Coffee', 'Food'].map(
                                    (item) => (
                                        <TabsTrigger key={item} value={item}>
                                            {item}
                                        </TabsTrigger>
                                    )
                                )}
                            </TabsList>
                        </Tabs>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Select value={table} onValueChange={setTable}>
                                <SelectTrigger
                                    aria-label="Pilih meja"
                                    className="min-h-11 bg-white sm:w-36"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Counter">
                                        Counter
                                    </SelectItem>
                                    <SelectItem value="T01">T01</SelectItem>
                                    <SelectItem value="T05">T05</SelectItem>
                                    <SelectItem value="T08">T08</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-500" />
                                <Input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    aria-label="Cari produk"
                                    placeholder="Cari produk"
                                    className="min-h-11 bg-white pl-9 sm:w-56"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProducts.map((product) => (
                            <button
                                key={product.id}
                                type="button"
                                disabled={!product.available}
                                onClick={() => addItem(product)}
                                className="group min-h-36 border border-stone-300 bg-white p-4 text-left transition-colors hover:border-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:cursor-not-allowed disabled:bg-stone-100 disabled:opacity-60"
                            >
                                <div className="flex h-full flex-col justify-between gap-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-ink">
                                                {product.name}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {product.station}
                                            </p>
                                        </div>
                                        {!product.available && (
                                            <Badge variant="outline">
                                                Sold out
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <span className="font-medium text-ink">
                                            {formatRupiah(product.price)}
                                        </span>
                                        {product.available && (
                                            <Plus className="size-5 text-clay" />
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <Card className="h-fit rounded-xl border-stone-300 shadow-none xl:sticky xl:top-24">
                    <CardHeader className="border-b border-stone-200">
                        <CardTitle className="text-lg">Order baru</CardTitle>
                        <CardDescription>{table}, 1 tamu</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {cart.length === 0 ? (
                            <EmptyState
                                icon={ShoppingCart}
                                title="Cart masih kosong"
                                description="Pilih produk untuk memulai order POS."
                            />
                        ) : (
                            <div className="divide-y divide-stone-200">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 p-4"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-ink">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatRupiah(item.price)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                size="icon-sm"
                                                variant="outline"
                                                onClick={() =>
                                                    changeQuantity(item.id, -1)
                                                }
                                                aria-label={`Kurangi ${item.name}`}
                                            >
                                                <Minus />
                                            </Button>
                                            <span className="w-7 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                size="icon-sm"
                                                variant="outline"
                                                onClick={() =>
                                                    changeQuantity(item.id, 1)
                                                }
                                                aria-label={`Tambah ${item.name}`}
                                            >
                                                <Plus />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="space-y-3 border-t border-stone-200 p-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span>{formatRupiah(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Service 5%
                                </span>
                                <span>{formatRupiah(service)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Pajak 10%
                                </span>
                                <span>{formatRupiah(tax)}</span>
                            </div>
                            <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-semibold">
                                <span>Total</span>
                                <span>{formatRupiah(total)}</span>
                            </div>
                            <Select
                                value={payment}
                                onValueChange={(value) =>
                                    setPayment(value as 'QRIS' | 'CASH')
                                }
                            >
                                <SelectTrigger className="min-h-11 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="QRIS">QRIS</SelectItem>
                                    <SelectItem value="CASH">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                disabled={cart.length === 0}
                                onClick={submit}
                                className="min-h-12 w-full bg-clay text-white hover:bg-clay/90"
                            >
                                Buat order {payment}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function OrdersPage({
    orders,
    setOrders,
}: {
    orders: DemoOrder[];
    setOrders: (orders: DemoOrder[]) => void;
}) {
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const visible = orders.filter(
        (order) =>
            (filter === 'ALL' || order.status === filter) &&
            `${order.id} ${order.table}`
                .toLowerCase()
                .includes(search.toLowerCase())
    );
    return (
        <div className="space-y-6">
            <PageIntro
                title="Order"
                description="Pantau order customer QR dan POS dalam satu alur operasional."
                action={<Badge variant="outline">Data demo</Badge>}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-sm flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-500" />
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        aria-label="Cari order"
                        placeholder="Cari order atau meja"
                        className="min-h-11 bg-white pl-9"
                    />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="min-h-11 w-full bg-white sm:w-52">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Semua status</SelectItem>
                        <SelectItem value="WAITING_PAYMENT">
                            Menunggu pembayaran
                        </SelectItem>
                        <SelectItem value="PREPARING">Disiapkan</SelectItem>
                        <SelectItem value="READY">Siap diantar</SelectItem>
                        <SelectItem value="SERVED">Selesai</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {visible.length === 0 ? (
                <EmptyState
                    icon={ReceiptText}
                    title="Tidak ada order pada status ini"
                    description="Ubah pencarian atau filter untuk melihat order lain."
                />
            ) : (
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Meja</TableHead>
                                <TableHead>Isi</TableHead>
                                <TableHead>Pembayaran</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                                <TableHead className="text-right">
                                    Detail
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visible.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <p className="font-medium text-ink">
                                            {order.id}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {order.source}, {order.age}
                                        </p>
                                    </TableCell>
                                    <TableCell>{order.table}</TableCell>
                                    <TableCell>
                                        <p className="max-w-60 truncate text-sm">
                                            {order.items.join(', ')}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{order.payment}</p>
                                        <StatusBadge
                                            status={order.paymentStatus}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={order.status} />
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {formatRupiah(order.total)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">
                                                    Buka
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        {order.id},{' '}
                                                        {order.table}
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Source {order.source},
                                                        table session TS-00218,
                                                        dibuat {order.age} lalu.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <div className="border border-stone-200 p-4">
                                                        <p className="text-sm font-medium">
                                                            Order items
                                                        </p>
                                                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                            {order.items.map(
                                                                (item) => (
                                                                    <li
                                                                        key={
                                                                            item
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="border border-stone-200 p-3">
                                                            <p className="text-xs text-muted-foreground">
                                                                Payment
                                                            </p>
                                                            <StatusBadge
                                                                status={
                                                                    order.paymentStatus
                                                                }
                                                            />
                                                        </div>
                                                        <div className="border border-stone-200 p-3">
                                                            <p className="text-xs text-muted-foreground">
                                                                Order
                                                            </p>
                                                            <StatusBadge
                                                                status={
                                                                    order.status
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            Timeline
                                                        </p>
                                                        <p className="mt-2 text-sm text-muted-foreground">
                                                            Created →{' '}
                                                            {order.paymentStatus ===
                                                            'PAID'
                                                                ? 'Paid → '
                                                                : ''}
                                                            Confirmed →{' '}
                                                            {order.status}
                                                        </p>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    {order.status === 'READY' &&
                                                        order.paymentStatus ===
                                                            'PAID' && (
                                                            <Button
                                                                onClick={() =>
                                                                    setOrders(
                                                                        orders.map(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.id ===
                                                                                order.id
                                                                                    ? {
                                                                                          ...item,
                                                                                          status: 'SERVED',
                                                                                      }
                                                                                    : item
                                                                        )
                                                                    )
                                                                }
                                                                className="bg-clay text-white hover:bg-clay/90"
                                                            >
                                                                Tandai served
                                                            </Button>
                                                        )}
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    );
}

function TablesPage() {
    const [area, setArea] = useState('Indoor');
    const [items, setItems] = useState<TableData[]>(tables);
    const [selectedId, setSelectedId] = useState(tables[1].id);
    const [feedback, setFeedback] = useState('');
    const [transferTarget, setTransferTarget] = useState('');
    const selected = items.find((table) => table.id === selectedId) ?? items[0];
    const filtered = items.filter((table) => table.area === area);
    const openSession = () => {
        setItems((current) =>
            current.map((table) =>
                table.id === selected.id
                    ? { ...table, status: 'OCCUPIED', note: 'Sesi demo baru' }
                    : table
            )
        );
        setFeedback(`Sesi demo ${selected.id} dibuka.`);
    };
    const closeSession = () => {
        setItems((current) =>
            current.map((table) =>
                table.id === selected.id
                    ? { ...table, status: 'AVAILABLE', note: undefined }
                    : table
            )
        );
        setFeedback(`Session ${selected.id} ditutup. Meja kembali available.`);
    };
    const transferSession = () => {
        if (!transferTarget) return;
        setItems((current) =>
            current.map((table) =>
                table.id === selected.id
                    ? { ...table, status: 'AVAILABLE', note: undefined }
                    : table.id === transferTarget
                      ? {
                            ...table,
                            status: 'OCCUPIED',
                            note: `Transfer dari ${selected.id}`,
                        }
                      : table
            )
        );
        setFeedback(
            `Session dipindahkan dari ${selected.id} ke ${transferTarget}.`
        );
        setSelectedId(transferTarget);
        setTransferTarget('');
    };
    return (
        <div className="space-y-6">
            <PageIntro
                title="Meja dan sesi"
                description="Status utama meja tetap sederhana. Cash due dan order ready muncul sebagai indikator operasional."
                action={
                    <Button
                        onClick={() =>
                            setFeedback(
                                `QR demo ${selected.id} siap dicetak saat layanan printer terhubung.`
                            )
                        }
                        variant="outline"
                        className="min-h-11 bg-white"
                    >
                        <QrCode /> Siapkan QR meja
                    </Button>
                }
            />
            {feedback && (
                <div
                    role="status"
                    className="border border-sage-200 bg-sage-50 p-3 text-sm text-sage-900"
                >
                    {feedback}
                </div>
            )}
            <Tabs
                value={area}
                onValueChange={(value) => {
                    setArea(value);
                    setSelectedId(
                        items.find((table) => table.area === value)?.id ??
                            selectedId
                    );
                }}
            >
                <TabsList>
                    <TabsTrigger value="Indoor">Indoor</TabsTrigger>
                    <TabsTrigger value="Outdoor">Outdoor</TabsTrigger>
                </TabsList>
                <TabsContent value={area} className="mt-5">
                    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((table) => (
                                <button
                                    key={table.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedId(table.id);
                                        setFeedback('');
                                    }}
                                    className={`min-h-36 border bg-white p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay ${selected.id === table.id ? 'border-clay ring-1 ring-clay' : 'border-stone-300 hover:border-stone-500'}`}
                                >
                                    <div className="flex h-full flex-col justify-between">
                                        <div className="flex items-start justify-between">
                                            <span className="text-2xl font-semibold text-ink">
                                                {table.id}
                                            </span>
                                            <StatusBadge
                                                status={table.status}
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {table.note ??
                                                'Tidak ada sesi aktif'}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <Card className="h-fit rounded-xl border-stone-300 shadow-none">
                            <CardHeader>
                                <CardTitle>{selected.id}</CardTitle>
                                <CardDescription>
                                    {selected.area}, detail data demo
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Status meja
                                    </span>
                                    <StatusBadge status={selected.status} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Table session
                                    </span>
                                    <span className="text-sm font-medium">
                                        {selected.status === 'OCCUPIED'
                                            ? 'TS-00218'
                                            : 'Tidak aktif'}
                                    </span>
                                </div>
                                {selected.status === 'OCCUPIED' && (
                                    <div className="border border-stone-200 p-3 text-sm">
                                        <p className="font-medium">
                                            Session order
                                        </p>
                                        <p className="mt-1 text-muted-foreground">
                                            ORD-1041 paid, ORD-1042 cash due
                                        </p>
                                    </div>
                                )}
                                <Separator />
                                <Button
                                    onClick={openSession}
                                    className="min-h-11 w-full bg-clay text-white hover:bg-clay/90"
                                    disabled={selected.status !== 'AVAILABLE'}
                                >
                                    Buka sesi meja
                                </Button>
                                <Button
                                    onClick={() =>
                                        setFeedback(
                                            `Order aktif ${selected.id} dibuka pada panel demo.`
                                        )
                                    }
                                    variant="outline"
                                    className="min-h-11 w-full"
                                    disabled={selected.status !== 'OCCUPIED'}
                                >
                                    Lihat order aktif
                                </Button>
                                {selected.status === 'OCCUPIED' && (
                                    <>
                                        <Select
                                            value={transferTarget}
                                            onValueChange={setTransferTarget}
                                        >
                                            <SelectTrigger className="min-h-11">
                                                <SelectValue placeholder="Pindah ke meja tersedia" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {items
                                                    .filter(
                                                        (table) =>
                                                            table.status ===
                                                            'AVAILABLE'
                                                    )
                                                    .map((table) => (
                                                        <SelectItem
                                                            key={table.id}
                                                            value={table.id}
                                                        >
                                                            {table.id},{' '}
                                                            {table.area}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            disabled={!transferTarget}
                                            onClick={transferSession}
                                            variant="outline"
                                            className="min-h-11 w-full"
                                        >
                                            Transfer table session
                                        </Button>
                                        <Button
                                            onClick={closeSession}
                                            variant="outline"
                                            className="min-h-11 w-full border-red-200 text-red-800"
                                        >
                                            Tutup session
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function KitchenPage({
    tickets,
    setTickets,
}: {
    tickets: Ticket[];
    setTickets: (tickets: Ticket[]) => void;
}) {
    const [station, setStation] = useState('ALL');
    const [connection, setConnection] = useState('LIVE');
    const filtered =
        station === 'ALL'
            ? tickets
            : tickets.filter((ticket) => ticket.station === station);
    const moveTicket = (ticket: Ticket) => {
        const next =
            ticket.status === 'NEW'
                ? 'PREPARING'
                : ticket.status === 'PREPARING'
                  ? 'READY'
                  : 'READY';
        setTickets(
            tickets.map((item) =>
                item.id === ticket.id ? { ...item, status: next } : item
            )
        );
    };
    return (
        <div className="space-y-6">
            <PageIntro
                title="Kitchen display"
                description="Ticket dipisah per station agar BAR dan KITCHEN dapat bergerak dengan status masing-masing."
                action={
                    <div className="flex flex-col gap-2 sm:flex-row"><Select value={connection} onValueChange={setConnection}><SelectTrigger aria-label="Simulasi koneksi KDS" className="min-h-11 w-44 bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="LIVE">Live</SelectItem><SelectItem value="RECONNECTING">Reconnecting</SelectItem><SelectItem value="ERROR">Error</SelectItem></SelectContent></Select><Tabs value={station} onValueChange={setStation}><TabsList><TabsTrigger value="ALL">Semua</TabsTrigger><TabsTrigger value="BAR">BAR</TabsTrigger><TabsTrigger value="KITCHEN">KITCHEN</TabsTrigger></TabsList></Tabs></div>
                }
            />
            {connection === 'RECONNECTING' && <div role="status" className="border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">Koneksi event terputus. KDS mengambil state terbaru dan mencegah ticket duplikat.</div>}
            {connection === 'ERROR' && <div role="alert" className="flex flex-col gap-3 border border-red-300 bg-red-50 p-4 text-sm text-red-900 sm:flex-row sm:items-center"><p className="flex-1">Ticket tidak dapat diperbarui. Periksa jaringan outlet lalu coba sambungkan lagi.</p><Button onClick={() => setConnection('LIVE')} variant="outline">Sambungkan ulang</Button></div>}
            <div className="grid gap-4 lg:grid-cols-3">
                {(['NEW', 'PREPARING', 'READY'] as const).map((status) => (
                    <section
                        key={status}
                        aria-labelledby={`ticket-${status}`}
                        className="min-w-0"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <h2
                                id={`ticket-${status}`}
                                className="font-semibold text-ink"
                            >
                                {status === 'NEW'
                                    ? 'Baru'
                                    : status === 'PREPARING'
                                      ? 'Disiapkan'
                                      : 'Siap'}
                            </h2>
                            <Badge variant="outline">
                                {
                                    filtered.filter(
                                        (ticket) => ticket.status === status
                                    ).length
                                }
                            </Badge>
                        </div>
                        <div className="space-y-3">
                            {filtered
                                .filter((ticket) => ticket.status === status)
                                .map((ticket) => (
                                    <Card
                                        key={ticket.id}
                                        className={`rounded-xl shadow-none ${ticket.age.includes('11') ? 'border-amber-400' : 'border-stone-300'}`}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <CardTitle className="text-base">
                                                        {ticket.table}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {ticket.id},{' '}
                                                        {ticket.station}
                                                    </CardDescription>
                                                </div>
                                                <span className="flex items-center gap-1 text-xs font-medium text-stone-600">
                                                    <Clock3 className="size-3.5" />
                                                    {ticket.age}
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="mb-5 space-y-2 text-sm">
                                                {ticket.items.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                            {status !== 'READY' ? (
                                                <Button
                                                    className="min-h-11 w-full bg-ink text-white hover:bg-ink/90"
                                                    onClick={() =>
                                                        moveTicket(ticket)
                                                    }
                                                >
                                                    {status === 'NEW'
                                                        ? 'Mulai siapkan'
                                                        : 'Tandai siap'}
                                                </Button>
                                            ) : (
                                                <div className="flex min-h-11 items-center justify-center gap-2 border border-sage-200 bg-sage-50 text-sm font-medium text-sage-900">
                                                    <CheckCircle2 className="size-4" />{' '}
                                                    Menunggu waiter
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

function PaymentsPage({
    orders,
    setOrders,
}: {
    orders: DemoOrder[];
    setOrders: (orders: DemoOrder[]) => void;
}) {
    const outstanding = orders.filter(
        (order) => order.paymentStatus !== 'PAID'
    );
    const [cashOrder, setCashOrder] = useState<DemoOrder | null>(null);
    const [tender, setTender] = useState('');
    const collect = (id: string) =>
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, paymentStatus: 'PAID' } : order
            )
        );
    return (
        <div className="space-y-6">
            <PageIntro
                title="Pembayaran"
                description="QRIS menunggu verifikasi webhook. Cash dikoleksi staff dan selalu terhubung ke order serta shift."
                action={<Badge variant="outline">Data demo</Badge>}
            />
            <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Perlu diselesaikan
                        </CardTitle>
                        <CardDescription>
                            Payment yang belum memiliki status paid.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {outstanding.length === 0 ? (
                            <EmptyState
                                icon={CheckCircle2}
                                title="Semua pembayaran selesai"
                                description="Tidak ada payment demo yang perlu ditindaklanjuti."
                            />
                        ) : (
                            outstanding.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex flex-col gap-4 border border-stone-200 p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-stone-100">
                                        {order.payment === 'CASH' ? (
                                            <Banknote className="size-5" />
                                        ) : (
                                            <QrCode className="size-5" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-medium text-ink">
                                                {order.id}
                                            </p>
                                            <StatusBadge
                                                status={order.paymentStatus}
                                            />
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {order.table}, {order.payment},{' '}
                                            {formatRupiah(order.total)}
                                        </p>
                                    </div>
                                    {order.paymentStatus === 'CASH_DUE' ? (
                                        <Button
                                            onClick={() => {
                                                setCashOrder(order);
                                                setTender('');
                                            }}
                                            className="min-h-11 bg-clay text-white hover:bg-clay/90"
                                        >
                                            Collect cash
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => collect(order.id)}
                                            variant="outline"
                                            className="min-h-11"
                                        >
                                            Simulasikan webhook paid
                                        </Button>
                                    )}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
                <Card className="h-fit rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-base">
                            Rekonsiliasi demo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                QRIS paid
                            </p>
                            <p className="text-2xl font-semibold text-ink">
                                Rp1.620.000
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Cash tercatat
                            </p>
                            <p className="text-2xl font-semibold text-ink">
                                Rp860.000
                            </p>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-2 text-sm text-amber-900">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                            <p>
                                QRIS pending hanya berubah setelah simulasi
                                webhook terverifikasi.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Dialog
                open={Boolean(cashOrder)}
                onOpenChange={(open) => !open && setCashOrder(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Collect cash {cashOrder?.id}</DialogTitle>
                        <DialogDescription>
                            Invoice tidak dapat diubah. Input hanya nominal
                            tender yang diterima.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex justify-between border border-stone-200 p-4">
                            <span>Invoice</span>
                            <strong>
                                {formatRupiah(cashOrder?.total ?? 0)}
                            </strong>
                        </div>
                        <label className="space-y-2 text-sm font-medium">
                            Tender amount
                            <Input
                                value={tender}
                                onChange={(event) =>
                                    setTender(
                                        event.target.value.replace(/\D/g, '')
                                    )
                                }
                                inputMode="numeric"
                                placeholder="100000"
                            />
                        </label>
                        <div className="flex justify-between border-t border-stone-200 pt-4">
                            <span>Change</span>
                            <strong>
                                {formatRupiah(
                                    Math.max(
                                        0,
                                        Number(tender) - (cashOrder?.total ?? 0)
                                    )
                                )}
                            </strong>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Collector: Rina, Shift SFT-089, timestamp dibuat
                            saat konfirmasi.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={
                                !cashOrder || Number(tender) < cashOrder.total
                            }
                            onClick={() => {
                                if (cashOrder) collect(cashOrder.id);
                                setCashOrder(null);
                            }}
                            className="bg-clay text-white hover:bg-clay/90"
                        >
                            Konfirmasi cash diterima
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function ShiftsPage() {
    const [closed, setClosed] = useState(false);
    const [movements, setMovements] = useState([
        { type: 'CASH_IN', amount: 100000, reason: 'Tambah pecahan kasir' },
        { type: 'CASH_OUT', amount: 75000, reason: 'Belanja kebutuhan outlet' },
    ]);
    const [movementType, setMovementType] = useState('CASH_IN');
    const [movementAmount, setMovementAmount] = useState('');
    const [movementReason, setMovementReason] = useState('');
    const [actual, setActual] = useState('');
    const opening = 500000;
    const sales = 860000;
    const cashIn = movements
        .filter((item) => item.type === 'CASH_IN')
        .reduce((sum, item) => sum + item.amount, 0);
    const cashOut = movements
        .filter((item) => item.type === 'CASH_OUT')
        .reduce((sum, item) => sum + item.amount, 0);
    const expected = opening + sales + cashIn - cashOut;
    const addMovement = () => {
        if (!movementAmount || !movementReason) return;
        setMovements((items) => [
            ...items,
            {
                type: movementType,
                amount: Number(movementAmount),
                reason: movementReason,
            },
        ]);
        setMovementAmount('');
        setMovementReason('');
    };
    return (
        <div className="space-y-6">
            <PageIntro
                title="Shift kas"
                description="Open shift, cash movement, outstanding cash, expected cash, actual cash, dan variance berada dalam satu kontrol."
                action={
                    <StatusBadge status={closed ? 'SERVED' : 'CONFIRMED'} />
                }
            />
            <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
                <div className="space-y-4">
                    <Card className="rounded-xl border-stone-300 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Shift SFT-089, Rina
                            </CardTitle>
                            <CardDescription>
                                Dibuka 08:02, Atmar Coffee Majalengka
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Komponen</TableHead>
                                        <TableHead className="text-right">
                                            Nilai
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Opening cash</TableCell>
                                        <TableCell className="text-right">
                                            {formatRupiah(opening)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Cash sales</TableCell>
                                        <TableCell className="text-right">
                                            {formatRupiah(sales)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Cash in</TableCell>
                                        <TableCell className="text-right">
                                            {formatRupiah(cashIn)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Cash out</TableCell>
                                        <TableCell className="text-right">
                                            -{formatRupiah(cashOut)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="font-semibold">
                                        <TableCell>Expected cash</TableCell>
                                        <TableCell className="text-right">
                                            {formatRupiah(expected)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border-stone-300 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Cash movements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {movements.map((item, index) => (
                                <div
                                    key={`${item.type}-${index}`}
                                    className="flex items-center justify-between border-b border-stone-200 pb-3 text-sm"
                                >
                                    <div>
                                        <strong>{item.type}</strong>
                                        <p className="text-muted-foreground">
                                            {item.reason}
                                        </p>
                                    </div>
                                    <span>
                                        {item.type === 'CASH_OUT' ? '-' : '+'}
                                        {formatRupiah(item.amount)}
                                    </span>
                                </div>
                            ))}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="min-h-11"
                                    >
                                        <Plus /> Tambah movement
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Cash in atau cash out
                                        </DialogTitle>
                                        <DialogDescription>
                                            Nominal dan reason wajib disimpan
                                            bersama actor serta shift.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Select
                                            value={movementType}
                                            onValueChange={setMovementType}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CASH_IN">
                                                    Cash in
                                                </SelectItem>
                                                <SelectItem value="CASH_OUT">
                                                    Cash out
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            value={movementAmount}
                                            onChange={(event) =>
                                                setMovementAmount(
                                                    event.target.value.replace(
                                                        /\D/g,
                                                        ''
                                                    )
                                                )
                                            }
                                            placeholder="Nominal"
                                            inputMode="numeric"
                                        />
                                        <Input
                                            value={movementReason}
                                            onChange={(event) =>
                                                setMovementReason(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Reason"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            disabled={
                                                !movementAmount ||
                                                !movementReason
                                            }
                                            onClick={addMovement}
                                            className="bg-clay text-white hover:bg-clay/90"
                                        >
                                            Simpan movement
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
                <Card className="h-fit rounded-xl border-stone-300 bg-ink text-white shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg text-white">
                            Tutup shift
                        </CardTitle>
                        <CardDescription className="text-stone-400">
                            Cash due memunculkan warning sebelum close.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {closed ? (
                            <div
                                role="status"
                                className="border border-sage-700 bg-sage-950/50 p-4"
                            >
                                <p className="font-medium">Shift ditutup</p>
                                <p className="mt-1 text-sm text-stone-300">
                                    Actual {formatRupiah(Number(actual))}.
                                    Variance{' '}
                                    {formatRupiah(Number(actual) - expected)}.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-400">
                                        Cash belum ditagih
                                    </span>
                                    <span className="text-red-300">
                                        Rp86.000
                                    </span>
                                </div>
                                <label className="space-y-2 text-sm">
                                    Actual cash
                                    <Input
                                        value={actual}
                                        onChange={(event) =>
                                            setActual(
                                                event.target.value.replace(
                                                    /\D/g,
                                                    ''
                                                )
                                            )
                                        }
                                        inputMode="numeric"
                                        placeholder="Hitung fisik kas"
                                        className="bg-white text-ink"
                                    />
                                </label>
                                <div className="flex justify-between border-t border-white/10 pt-3 text-sm">
                                    <span className="text-stone-400">
                                        Variance
                                    </span>
                                    <span>
                                        {actual
                                            ? formatRupiah(
                                                  Number(actual) - expected
                                              )
                                            : '-'}
                                    </span>
                                </div>
                                <Button
                                    disabled={!actual}
                                    onClick={() => setClosed(true)}
                                    className="min-h-11 w-full bg-clay text-white hover:bg-clay/90"
                                >
                                    Konfirmasi tutup shift
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function ProductsPage({
    products,
    setProducts,
}: {
    products: Product[];
    setProducts: (products: Product[]) => void;
}) {
    const toggle = (id: string) =>
        setProducts(
            products.map((product) =>
                product.id === id
                    ? { ...product, available: !product.available }
                    : product
            )
        );
    const addProduct = () =>
        setProducts([
            ...products,
            {
                id: `p${products.length + 1}`,
                name: `Menu demo ${products.length + 1}`,
                category: 'Food',
                price: 25000,
                station: 'KITCHEN',
                available: true,
            },
        ]);
    return (
        <div className="space-y-6">
            <PageIntro
                title="Produk dan menu"
                description="Kelola harga, station routing, dan availability. MVP tidak memakai foto produk."
                action={
                    <Button
                        onClick={addProduct}
                        className="min-h-11 bg-clay text-white hover:bg-clay/90"
                    >
                        <Plus /> Tambah produk demo
                    </Button>
                }
            />
            <Card className="rounded-xl border-stone-300 shadow-none">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produk</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Station</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium text-ink">
                                    {product.name}
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.station}</TableCell>
                                <TableCell>
                                    {formatRupiah(product.price)}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge
                                        status={
                                            product.available
                                                ? 'AVAILABLE'
                                                : 'SERVED'
                                        }
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        onClick={() => toggle(product.id)}
                                    >
                                        {product.available
                                            ? 'Tandai sold out'
                                            : 'Aktifkan'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

function ReservationsPage() {
    const [items, setItems] = useState(initialReservations);
    const [filter, setFilter] = useState('ALL');
    const [feedback, setFeedback] = useState('');
    const update = (id: string, status: string) =>
        setItems(
            items.map((item) => (item.id === id ? { ...item, status } : item))
        );
    const addReservation = () =>
        setItems([
            ...items,
            {
                id: `RSV-0${21 + items.length}`,
                time: '18:30',
                name: `Tamu demo ${items.length + 1}`,
                guests: 2,
                table: 'Belum dipilih',
                status: 'PENDING',
            },
        ]);
    const visible =
        filter === 'ALL'
            ? items
            : items.filter((item) => item.status === filter);
    return (
        <div className="space-y-6">
            <PageIntro
                title="Reservasi"
                description="List, assignment meja, arrival, cancel, no-show, completion, dan pembukaan table session."
                action={
                    <Button
                        onClick={addReservation}
                        className="min-h-11 bg-clay text-white hover:bg-clay/90"
                    >
                        <Plus /> Buat reservasi demo
                    </Button>
                }
            />
            {feedback && (
                <div
                    role="status"
                    className="border border-sage-200 bg-sage-50 p-3 text-sm text-sage-900"
                >
                    {feedback}
                </div>
            )}
            <Tabs value={filter} onValueChange={setFilter}>
                <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="ALL">Semua</TabsTrigger>
                    <TabsTrigger value="PENDING">Upcoming</TabsTrigger>
                    <TabsTrigger value="ARRIVED">Arrived</TabsTrigger>
                    <TabsTrigger value="NO_SHOW">No show</TabsTrigger>
                    <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
                    <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardContent className="divide-y divide-stone-200 p-0">
                        {visible.length === 0 ? (
                            <EmptyState
                                icon={CalendarDays}
                                title="Tidak ada reservasi pada status ini"
                                description="Ubah filter atau buat reservasi demo baru."
                            />
                        ) : (
                            visible.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-4 p-5"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <div className="grid size-12 shrink-0 place-items-center border border-stone-300 bg-stone-50 font-semibold text-ink">
                                            {item.time}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-ink">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.id}, {item.guests} tamu,
                                                meja {item.table}
                                            </p>
                                        </div>
                                        <StatusBadge status={item.status} />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.status === 'PENDING' && (
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    update(item.id, 'CONFIRMED')
                                                }
                                            >
                                                Konfirmasi
                                            </Button>
                                        )}
                                        {item.status === 'CONFIRMED' && (
                                            <>
                                                <Button
                                                    onClick={() => {
                                                        update(
                                                            item.id,
                                                            'ARRIVED'
                                                        );
                                                        setFeedback(
                                                            `${item.id} arrived dan table session dibuka pada ${item.table}.`
                                                        );
                                                    }}
                                                    className="bg-clay text-white hover:bg-clay/90"
                                                >
                                                    Arrived, buka session
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        update(
                                                            item.id,
                                                            'NO_SHOW'
                                                        )
                                                    }
                                                >
                                                    No show
                                                </Button>
                                            </>
                                        )}
                                        {item.status === 'ARRIVED' && (
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    update(item.id, 'COMPLETED')
                                                }
                                            >
                                                Complete
                                            </Button>
                                        )}
                                        {![
                                            'CANCELLED',
                                            'COMPLETED',
                                            'NO_SHOW',
                                        ].includes(item.status) && (
                                            <Button
                                                variant="outline"
                                                className="border-red-200 text-red-800"
                                                onClick={() =>
                                                    update(item.id, 'CANCELLED')
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
                <Card className="h-fit rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-base">
                            Availability malam ini
                        </CardTitle>
                        <CardDescription>
                            Conflict pada meja dan waktu yang sama harus ditolak
                            backend.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            ['19:00', 70],
                            ['20:30', 45],
                            ['21:00', 30],
                        ].map(([time, value]) => (
                            <div key={time}>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>{time}</span>
                                    <span>{value}%</span>
                                </div>
                                <Progress value={Number(value)} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function ReportsPage() {
    const bars = [32, 44, 58, 76, 92, 68, 54];
    const [reportTab, setReportTab] = useState('products');
    const [reportState, setReportState] = useState('READY');
    const reportRows: Record<string, string[][]> = {
        products: [
            ['Cafe Latte', '42 unit', 'Rp1.176.000'],
            ['Americano', '31 unit', 'Rp682.000'],
        ],
        payment: [
            ['QRIS paid', 'Rp1.620.000', '65%'],
            ['Cash due', 'Rp86.000', '1 order'],
        ],
        staff: [
            ['Rina', 'Rp860.000 cash', '18 order'],
            ['Dimas', '1 void', '12 served'],
        ],
        cash: [
            ['SFT-089', 'Rp1.385.000 expected', 'Aktif'],
            ['SFT-088', 'Rp1.210.000 actual', '-Rp5.000'],
        ],
        audit: [
            ['payment.collect_cash', 'ORD-1042', 'Rina'],
            ['table.transfer', 'TS-00215', 'Dimas'],
        ],
    };
    const exportCsv = () => {
        const csv = reportRows[reportTab]
            .map((row) => row.join(','))
            .join('\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
        link.download = `atmar-${reportTab}-demo.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };
    return (
        <div className="space-y-6">
            <PageIntro
                title="Laporan"
                description="Semua angka di halaman ini adalah simulasi untuk menguji hierarchy dan filter frontend."
                action={
                    <div className="flex flex-col gap-2 sm:flex-row"><Select value={reportState} onValueChange={setReportState}><SelectTrigger aria-label="Preview report state" className="min-h-11 w-48 bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="READY">Data ready</SelectItem><SelectItem value="LOADING">Loading</SelectItem><SelectItem value="EMPTY">No result</SelectItem><SelectItem value="ERROR">Error</SelectItem><SelectItem value="DENIED">Permission denied</SelectItem></SelectContent></Select><Select defaultValue="today"><SelectTrigger className="min-h-11 w-48 bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="today">Hari ini</SelectItem><SelectItem value="week">7 hari terakhir</SelectItem><SelectItem value="month">Bulan ini</SelectItem></SelectContent></Select></div>
                }
            />
            {reportState !== 'READY' && <div role={reportState === 'ERROR' || reportState === 'DENIED' ? 'alert' : 'status'} className={`border p-4 text-sm ${reportState === 'ERROR' || reportState === 'DENIED' ? 'border-red-300 bg-red-50 text-red-900' : 'border-amber-300 bg-amber-50 text-amber-950'}`}>{reportState === 'LOADING' && 'Memuat laporan sesuai periode dan timezone outlet...'}{reportState === 'EMPTY' && 'Tidak ada transaksi pada filter ini. Ubah periode untuk melihat hasil lain.'}{reportState === 'ERROR' && 'Laporan gagal dimuat. Coba ulang atau periksa koneksi outlet.'}{reportState === 'DENIED' && 'Role aktif tidak memiliki permission report.view.'}</div>}
            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Penjualan per jam, data demo hari ini
                        </CardTitle>
                        <CardDescription>
                            Jam tersibuk terlihat pada 17:00 sampai 19:00.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-64 items-end gap-3 border-b border-stone-300 px-2">
                            {bars.map((height, index) => (
                                <div
                                    key={index}
                                    className="flex h-full flex-1 flex-col justify-end gap-2"
                                >
                                    <div
                                        className="w-full bg-clay"
                                        style={{ height: `${height}%` }}
                                        aria-label={`${height}% dari nilai maksimum`}
                                    />
                                    <span className="text-center text-xs text-muted-foreground">
                                        {13 + index}:00
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-stone-300 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Pembayaran demo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span>QRIS</span>
                                <span>65%</span>
                            </div>
                            <Progress value={65} />
                        </div>
                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span>Cash</span>
                                <span>35%</span>
                            </div>
                            <Progress value={35} />
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                                Refund demo
                            </span>
                            <span className="font-medium">Rp45.000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                                Void demo
                            </span>
                            <span className="font-medium">Rp28.000</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="rounded-xl border-stone-300 shadow-none">
                <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-lg">Report detail</CardTitle>
                        <CardDescription>
                            Product, payment, staff, cash, dan audit dengan
                            export sesuai filter.
                        </CardDescription>
                    </div>
                    <Button
                        onClick={exportCsv}
                        variant="outline"
                        className="min-h-11"
                    >
                        <Download /> Export CSV
                    </Button>
                </CardHeader>
                <CardContent>
                    <Tabs value={reportTab} onValueChange={setReportTab}>
                        <TabsList className="w-full justify-start overflow-x-auto">
                            <TabsTrigger value="products">Products</TabsTrigger>
                            <TabsTrigger value="payment">Payment</TabsTrigger>
                            <TabsTrigger value="staff">Staff</TabsTrigger>
                            <TabsTrigger value="cash">Cash</TabsTrigger>
                            <TabsTrigger value="audit">Audit</TabsTrigger>
                        </TabsList>
                        {Object.entries(reportRows).map(([key, rows]) => (
                            <TabsContent key={key} value={key} className="mt-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Dimension</TableHead>
                                            <TableHead>Value</TableHead>
                                            <TableHead>Detail</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.join('-')}>
                                                {row.map((cell) => (
                                                    <TableCell key={cell}>
                                                        {cell}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

function SettingsPage() {
    const [saved, setSaved] = useState(false);
    return (
        <div className="space-y-6">
            <PageIntro
                title="Pengaturan outlet"
                description="Konfigurasi yang berbeda antar cafe disimpan sebagai settings, bukan custom code."
            />
            <Card className="max-w-3xl rounded-xl border-stone-300 shadow-none">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Atmar Coffee Majalengka
                    </CardTitle>
                    <CardDescription>
                        Konfigurasi demo untuk outlet aktif.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm font-medium">
                            Pajak
                            <Select defaultValue="10">
                                <SelectTrigger className="min-h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">
                                        Tidak aktif
                                    </SelectItem>
                                    <SelectItem value="10">10%</SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            Service charge
                            <Select defaultValue="5">
                                <SelectTrigger className="min-h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">
                                        Tidak aktif
                                    </SelectItem>
                                    <SelectItem value="5">5%</SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            Output BAR
                            <Select defaultValue="display">
                                <SelectTrigger className="min-h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="display">KDS</SelectItem>
                                    <SelectItem value="printer">
                                        Printer
                                    </SelectItem>
                                    <SelectItem value="both">
                                        KDS dan printer
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            Output KITCHEN
                            <Select defaultValue="printer">
                                <SelectTrigger className="min-h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="display">KDS</SelectItem>
                                    <SelectItem value="printer">
                                        Printer
                                    </SelectItem>
                                    <SelectItem value="both">
                                        KDS dan printer
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            Tax calculation
                            <Select defaultValue="exclusive"><SelectTrigger className="min-h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="exclusive">Exclusive</SelectItem><SelectItem value="inclusive">Inclusive</SelectItem></SelectContent></Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            Midtrans environment
                            <Select defaultValue="sandbox"><SelectTrigger className="min-h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="sandbox">Sandbox</SelectItem><SelectItem value="production">Production, belum terhubung</SelectItem></SelectContent></Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            QRIS
                            <Select defaultValue="enabled"><SelectTrigger className="min-h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="enabled">Enabled</SelectItem><SelectItem value="disabled">Disabled</SelectItem></SelectContent></Select>
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            Outstanding cash saat close
                            <Select defaultValue="warn"><SelectTrigger className="min-h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="block">Block close</SelectItem><SelectItem value="warn">Warn dan approval</SelectItem><SelectItem value="handover">Controlled handover</SelectItem></SelectContent></Select>
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => setSaved(true)}
                            className="min-h-11 bg-clay text-white hover:bg-clay/90"
                        >
                            Simpan pengaturan demo
                        </Button>
                        {saved && (
                            <span
                                role="status"
                                className="flex items-center gap-2 text-sm text-sage-800"
                            >
                                <CheckCircle2 className="size-4" /> Tersimpan
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function CustomerPage() {
    const [category, setCategory] = useState('Coffee');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selected, setSelected] = useState<Product | null>(null);
    const [temperature, setTemperature] = useState('Hot');
    const [size, setSize] = useState('Regular');
    const [addons, setAddons] = useState<string[]>([]);
    const [note, setNote] = useState('');
    const [payment, setPayment] = useState<'QRIS' | 'CASH'>('CASH');
    const [stage, setStage] = useState<'MENU' | 'WAITING_PAYMENT' | 'RECEIVED'>(
        'MENU'
    );
    const [waiterCalled, setWaiterCalled] = useState(false);
    const visible = initialProducts.filter(
        (product) => product.category === category
    );
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const service = Math.round(subtotal * 0.05);
    const tax = Math.round((subtotal + service) * 0.1);
    const total = subtotal + service + tax;
    const toggleAddon = (value: string) =>
        setAddons((current) =>
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value]
        );
    const addConfigured = () => {
        if (!selected) return;
        const price =
            selected.price +
            (size === 'Large' ? 5000 : 0) +
            (temperature === 'Ice' ? 3000 : 0) +
            (addons.includes('Extra Shot') ? 5000 : 0) +
            (addons.includes('Oat Milk') ? 7000 : 0);
        setCart((current) => [
            ...current,
            {
                ...selected,
                id: `${selected.id}-${current.length}`,
                price,
                quantity: 1,
                options: [temperature, size, ...addons],
                note,
            },
        ]);
        setSelected(null);
        setTemperature('Hot');
        setSize('Regular');
        setAddons([]);
        setNote('');
    };
    const changeCustomerQuantity = (id: string, amount: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
    const startAdditionalOrder = () => {
        setCart([]);
        setStage('MENU');
    };
    return (
        <div className="mx-auto max-w-lg overflow-hidden border border-stone-300 bg-paper shadow-sm">
            <header className="sticky top-0 z-10 border-b border-stone-200 bg-paper/95 px-4 py-4 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium text-clay">
                            Atmar Coffee
                        </p>
                        <h1 className="text-xl font-semibold text-ink">
                            Meja T07
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Session TS-00218
                        </p>
                    </div>
                    <Button
                        disabled={waiterCalled}
                        onClick={() => setWaiterCalled(true)}
                        variant="outline"
                        className="min-h-11"
                    >
                        {waiterCalled ? 'Waiter dipanggil' : 'Panggil waiter'}
                    </Button>
                </div>
            </header>
            {waiterCalled && (
                <div
                    role="status"
                    className="border-b border-sage-200 bg-sage-50 px-4 py-3 text-sm text-sage-900"
                >
                    Permintaan REQ-015 terkirim. Tombol dikunci untuk mencegah
                    request ganda.
                </div>
            )}
            {stage !== 'MENU' ? (
                <main className="min-h-170 px-5 py-10">
                    <div
                        className={`mb-8 grid size-12 place-items-center rounded-full ${stage === 'WAITING_PAYMENT' ? 'bg-amber-100 text-amber-800' : 'bg-sage-100 text-sage-800'}`}
                    >
                        {stage === 'WAITING_PAYMENT' ? (
                            <Clock3 />
                        ) : (
                            <CheckCircle2 />
                        )}
                    </div>
                    <h2 className="text-2xl font-semibold text-ink">
                        {stage === 'WAITING_PAYMENT'
                            ? 'Menunggu pembayaran'
                            : 'Order diterima'}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {stage === 'WAITING_PAYMENT'
                            ? 'Order ORD-1043 belum masuk station. Backend harus menerima webhook Midtrans terverifikasi lebih dahulu.'
                            : payment === 'CASH'
                              ? 'Order ORD-1043 sudah masuk station. Cash akan ditagih staff saat pesanan diantar.'
                              : 'Pembayaran terverifikasi. Bar dan kitchen menerima ticket.'}
                    </p>
                    {stage === 'WAITING_PAYMENT' && (
                        <Button
                            onClick={() => setStage('RECEIVED')}
                            className="mt-6 min-h-12 w-full bg-clay text-white hover:bg-clay/90"
                        >
                            Simulasikan webhook paid
                        </Button>
                    )}
                    <div className="mt-8 space-y-6 border-l-2 border-stone-300 pl-5">
                        <div>
                            <p className="font-medium text-ink">
                                {stage === 'WAITING_PAYMENT'
                                    ? 'Menunggu pembayaran'
                                    : 'Order diterima'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {stage === 'WAITING_PAYMENT'
                                    ? 'QRIS belum terverifikasi.'
                                    : 'Ticket sudah dibuat per station.'}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-stone-500">
                                Disiapkan
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-stone-500">
                                Siap diantar
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-stone-500">Served</p>
                        </div>
                    </div>
                    {stage === 'RECEIVED' && (
                        <Button
                            onClick={startAdditionalOrder}
                            variant="outline"
                            className="mt-10 min-h-12 w-full"
                        >
                            Tambah order pada session yang sama
                        </Button>
                    )}
                </main>
            ) : (
                <>
                    <main className="min-h-155 px-4 py-5">
                        <div className="mb-5">
                            <h2 className="text-2xl font-semibold tracking-tight text-ink">
                                Mau pesan apa?
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Pilih menu, atur variant dan add-on, lalu
                                checkout tanpa login.
                            </p>
                        </div>
                        <Tabs value={category} onValueChange={setCategory}>
                            <TabsList className="mb-5 w-full justify-start overflow-x-auto">
                                {['Coffee', 'Non Coffee', 'Food'].map(
                                    (item) => (
                                        <TabsTrigger key={item} value={item}>
                                            {item}
                                        </TabsTrigger>
                                    )
                                )}
                            </TabsList>
                        </Tabs>
                        <div className="space-y-3">
                            {visible.map((product) => (
                                <button
                                    key={product.id}
                                    type="button"
                                    disabled={!product.available}
                                    onClick={() => setSelected(product)}
                                    className="flex min-h-24 w-full items-center gap-4 border border-stone-300 bg-white p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:opacity-50"
                                >
                                    <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-stone-100 text-ink">
                                        {product.station === 'BAR' ? (
                                            <Coffee />
                                        ) : (
                                            <Utensils />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-ink">
                                            {product.name}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {product.available
                                                ? formatRupiah(product.price)
                                                : 'Sold out'}
                                        </p>
                                    </div>
                                    {product.available && (
                                        <Plus className="size-5 text-clay" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </main>
                    <div className="sticky bottom-0 border-t border-stone-300 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    disabled={count === 0}
                                    className="min-h-12 w-full justify-between bg-clay px-4 text-white hover:bg-clay/90"
                                >
                                    <span>{count} item</span>
                                    <span>Checkout, {formatRupiah(total)}</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="bottom"
                                className="max-h-[85svh] overflow-y-auto"
                            >
                                <SheetHeader>
                                    <SheetTitle>Checkout meja T07</SheetTitle>
                                    <SheetDescription>
                                        Backend akan menghitung ulang harga,
                                        tax, service, dan total.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="space-y-3 px-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border-b border-stone-200 py-3"
                                        >
                                            <div className="flex justify-between gap-4">
                                                <div><p className="font-medium text-ink">{item.name}</p><div className="mt-2 flex items-center gap-2"><Button size="icon-sm" variant="outline" onClick={() => changeCustomerQuantity(item.id, -1)} aria-label={`Kurangi ${item.name}`}><Minus /></Button><span className="w-6 text-center text-sm">{item.quantity}</span><Button size="icon-sm" variant="outline" onClick={() => changeCustomerQuantity(item.id, 1)} aria-label={`Tambah ${item.name}`}><Plus /></Button></div></div>
                                                <p>{formatRupiah(item.price * item.quantity)}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {item.options?.join(', ')}
                                                {item.note
                                                    ? `, Catatan: ${item.note}`
                                                    : ''}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="space-y-2 py-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>
                                                {formatRupiah(subtotal)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Service 5%</span>
                                            <span>{formatRupiah(service)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Pajak 10%</span>
                                            <span>{formatRupiah(tax)}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 font-semibold">
                                            <span>Total</span>
                                            <span>{formatRupiah(total)}</span>
                                        </div>
                                    </div>
                                    <Select
                                        value={payment}
                                        onValueChange={(value) =>
                                            setPayment(value as 'QRIS' | 'CASH')
                                        }
                                    >
                                        <SelectTrigger className="min-h-12 w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="QRIS">
                                                QRIS via Midtrans
                                            </SelectItem>
                                            <SelectItem value="CASH">
                                                Cash, ditagih staff
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        onClick={() =>
                                            setStage(
                                                payment === 'QRIS'
                                                    ? 'WAITING_PAYMENT'
                                                    : 'RECEIVED'
                                            )
                                        }
                                        className="min-h-12 w-full bg-clay text-white hover:bg-clay/90"
                                    >
                                        Place order {payment}
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </>
            )}
            <Dialog
                open={Boolean(selected)}
                onOpenChange={(open) => !open && setSelected(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selected?.name}</DialogTitle>
                        <DialogDescription>
                            {selected && formatRupiah(selected.price)}. Harga
                            akhir berubah mengikuti pilihan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5">
                        <fieldset>
                            <legend className="mb-2 text-sm font-medium">
                                Temperature *
                            </legend>
                            <div className="grid grid-cols-2 gap-2">
                                {['Hot', 'Ice'].map((value) => (
                                    <label
                                        key={value}
                                        className="flex min-h-12 items-center gap-3 border border-stone-300 p-3"
                                    >
                                        <input
                                            type="radio"
                                            name="temperature"
                                            value={value}
                                            checked={temperature === value}
                                            onChange={() =>
                                                setTemperature(value)
                                            }
                                            className="size-5 accent-clay"
                                        />
                                        {value}
                                        {value === 'Ice' && ' +3k'}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="mb-2 text-sm font-medium">
                                Size *
                            </legend>
                            <div className="grid grid-cols-2 gap-2">
                                {['Regular', 'Large'].map((value) => (
                                    <label
                                        key={value}
                                        className="flex min-h-12 items-center gap-3 border border-stone-300 p-3"
                                    >
                                        <input
                                            type="radio"
                                            name="size"
                                            value={value}
                                            checked={size === value}
                                            onChange={() => setSize(value)}
                                            className="size-5 accent-clay"
                                        />
                                        {value}
                                        {value === 'Large' && ' +5k'}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="mb-2 text-sm font-medium">
                                Add-ons
                            </legend>
                            <div className="space-y-2">
                                {[
                                    ['Extra Shot', '+5k'],
                                    ['Oat Milk', '+7k'],
                                ].map(([value, price]) => (
                                    <label
                                        key={value}
                                        className="flex min-h-12 items-center gap-3 border border-stone-300 p-3"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={addons.includes(value)}
                                            onChange={() => toggleAddon(value)}
                                            className="size-5 accent-clay"
                                        />
                                        <span className="flex-1">{value}</span>
                                        <span>{price}</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <label className="space-y-2 text-sm font-medium">
                            Catatan
                            <textarea
                                value={note}
                                onChange={(event) =>
                                    setNote(event.target.value)
                                }
                                placeholder="Contoh: less sugar"
                                className="min-h-20 w-full border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-clay"
                            />
                        </label>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={addConfigured}
                            className="min-h-12 bg-clay text-white hover:bg-clay/90"
                        >
                            Add to cart
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function App() {
    const [activeView, setActiveView] = useState<View>('overview');
    const [navOpen, setNavOpen] = useState(false);
    const [orders, setOrders] = useState(initialOrders);
    const [tickets, setTickets] = useState(initialTickets);
    const [products, setProducts] = useState(initialProducts);
    const [notificationsSeen, setNotificationsSeen] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const navigate = (view: View) => {
        setActiveView(view);
        setNavOpen(false);
    };
    const createOrder = (payment: 'QRIS' | 'CASH', total: number) => {
        setOrders((current) => [
            {
                id: `ORD-${1043 + current.length}`,
                table: 'Counter',
                source: 'POS',
                total,
                payment,
                paymentStatus: payment === 'CASH' ? 'CASH_DUE' : 'PENDING',
                status: payment === 'CASH' ? 'CONFIRMED' : 'WAITING_PAYMENT',
                age: 'baru',
                items: ['Order POS demo'],
            },
            ...current,
        ]);
    };
    const collectCash = (id: string) =>
        setOrders((current) =>
            current.map((order) =>
                order.id === id ? { ...order, paymentStatus: 'PAID' } : order
            )
        );
    const markServed = (id: string) =>
        setOrders((current) =>
            current.map((order) =>
                order.id === id ? { ...order, status: 'SERVED' } : order
            )
        );

    const page = (() => {
        switch (activeView) {
            case 'overview':
                return <OverviewPage orders={orders} onNavigate={navigate} />;
            case 'pos':
                return <PosPage onCreateOrder={createOrder} />;
            case 'orders':
                return <OrdersPage orders={orders} setOrders={setOrders} />;
            case 'tables':
                return <TablesPage />;
            case 'areas':
                return <AreasPage />;
            case 'kitchen':
                return (
                    <KitchenPage tickets={tickets} setTickets={setTickets} />
                );
            case 'waiter':
                return (
                    <WaiterPage
                        orders={orders}
                        onCollect={collectCash}
                        onServe={markServed}
                    />
                );
            case 'printing':
                return <PrintingPage />;
            case 'payments':
                return <PaymentsPage orders={orders} setOrders={setOrders} />;
            case 'refunds':
                return <FinancialActionPage kind="refund" />;
            case 'voids':
                return <FinancialActionPage kind="void" />;
            case 'shifts':
                return <ShiftsPage />;
            case 'products':
                return (
                    <ProductsPage
                        products={products}
                        setProducts={setProducts}
                    />
                );
            case 'categories':
                return <CatalogConfigPage mode="categories" />;
            case 'options':
                return <CatalogConfigPage mode="options" />;
            case 'reservations':
                return <ReservationsPage />;
            case 'reports':
                return <ReportsPage />;
            case 'audit':
                return <AuditPage />;
            case 'users':
                return <AccessPage mode="users" />;
            case 'roles':
                return <AccessPage mode="roles" />;
            case 'stations':
                return <StationsPage />;
            case 'qr-tables':
                return <QrTablesPage />;
            case 'outlet':
                return <TenantOutletPage />;
            case 'auth':
                return <AuthPreviewPage />;
            case 'scope':
                return <CoverageSummaryPage />;
            case 'customer':
                return <CustomerPage />;
            case 'settings':
                return <SettingsPage />;
        }
    })();

    return (
        <div className="min-h-svh bg-paper text-foreground lg:grid lg:grid-cols-[250px_1fr]">
            <aside className="hidden h-svh lg:sticky lg:top-0 lg:block">
                <Sidebar activeView={activeView} onNavigate={navigate} />
            </aside>
            <div className="min-w-0">
                <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-stone-300 bg-paper/95 px-4 backdrop-blur sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <Sheet open={navOpen} onOpenChange={setNavOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    size="icon-lg"
                                    variant="outline"
                                    className="min-h-11 min-w-11 lg:hidden"
                                    aria-label="Buka navigasi"
                                >
                                    <Menu />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-72.5 border-0 p-0"
                            >
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigasi Atmar POS</SheetTitle>
                                    <SheetDescription>
                                        Pilih halaman operasional.
                                    </SheetDescription>
                                </SheetHeader>
                                <Sidebar
                                    activeView={activeView}
                                    onNavigate={navigate}
                                />
                            </SheetContent>
                        </Sheet>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-ink">
                                {viewNames[activeView]}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                Atmar Coffee, Majalengka
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="hidden border-amber-200 bg-amber-50 text-amber-900 sm:inline-flex"
                        >
                            Prototype, data demo
                        </Badge>
                        <Button
                            onClick={() =>
                                setNotificationsSeen((current) => !current)
                            }
                            size="icon-lg"
                            variant="ghost"
                            className="relative min-h-11 min-w-11"
                            aria-label={
                                notificationsSeen
                                    ? 'Tandai notifikasi belum dibaca'
                                    : 'Tandai notifikasi sudah dibaca'
                            }
                        >
                            <Bell />
                            {!notificationsSeen && (
                                <span
                                    className="absolute right-2 top-2 size-2 rounded-full bg-clay"
                                    aria-hidden="true"
                                />
                            )}
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="min-h-11">
                                    <span className="hidden sm:inline">
                                        Rina, Kasir
                                    </span>
                                    <Users className="sm:hidden" />
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Account demo
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => navigate('settings')}
                                >
                                    Pengaturan outlet
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigate('customer')}
                                >
                                    Preview customer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <motion.main
                    key={activeView}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="mx-auto w-full max-w-375 p-4 pb-12 sm:p-6 lg:p-8"
                >
                    {page}
                </motion.main>
            </div>
        </div>
    );
}

export default App;
