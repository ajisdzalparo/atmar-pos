export type Product = {
  id: string
  name: string
  category: 'Coffee' | 'Non Coffee' | 'Food'
  price: number
  station: 'BAR' | 'KITCHEN'
  available: boolean
}

export type OrderStatus = 'WAITING_PAYMENT' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'SERVED'

export type DemoOrder = {
  id: string
  table: string
  source: 'QR' | 'POS'
  total: number
  payment: 'QRIS' | 'CASH'
  paymentStatus: 'PENDING' | 'CASH_DUE' | 'PAID'
  status: OrderStatus
  age: string
  items: string[]
}

export type TableData = {
  id: string
  area: 'Indoor' | 'Outdoor'
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED'
  note?: string
}

export type Ticket = {
  id: string
  station: 'BAR' | 'KITCHEN'
  table: string
  age: string
  status: 'NEW' | 'PREPARING' | 'READY'
  items: string[]
}

export const products: Product[] = [
  { id: 'p1', name: 'Espresso', category: 'Coffee', price: 18000, station: 'BAR', available: true },
  { id: 'p2', name: 'Americano', category: 'Coffee', price: 22000, station: 'BAR', available: true },
  { id: 'p3', name: 'Cafe Latte', category: 'Coffee', price: 28000, station: 'BAR', available: true },
  { id: 'p4', name: 'Caramel Macchiato', category: 'Coffee', price: 33000, station: 'BAR', available: false },
  { id: 'p5', name: 'Chocolate', category: 'Non Coffee', price: 28000, station: 'BAR', available: true },
  { id: 'p6', name: 'Matcha Latte', category: 'Non Coffee', price: 30000, station: 'BAR', available: true },
  { id: 'p7', name: 'French Fries', category: 'Food', price: 24000, station: 'KITCHEN', available: true },
  { id: 'p8', name: 'Chicken Rice Bowl', category: 'Food', price: 38000, station: 'KITCHEN', available: true },
]

export const initialOrders: DemoOrder[] = [
  { id: 'ORD-1042', table: 'T07', source: 'QR', total: 86000, payment: 'CASH', paymentStatus: 'CASH_DUE', status: 'READY', age: '12 min', items: ['2x Cafe Latte', '1x French Fries'] },
  { id: 'ORD-1041', table: 'T03', source: 'QR', total: 50000, payment: 'QRIS', paymentStatus: 'PAID', status: 'PREPARING', age: '8 min', items: ['1x Americano', '1x Matcha Latte'] },
  { id: 'ORD-1040', table: 'Counter', source: 'POS', total: 38000, payment: 'CASH', paymentStatus: 'PAID', status: 'CONFIRMED', age: '5 min', items: ['1x Chicken Rice Bowl'] },
  { id: 'ORD-1039', table: 'T11', source: 'QR', total: 28000, payment: 'QRIS', paymentStatus: 'PENDING', status: 'WAITING_PAYMENT', age: '3 min', items: ['1x Chocolate'] },
  { id: 'ORD-1038', table: 'T02', source: 'QR', total: 44000, payment: 'QRIS', paymentStatus: 'PAID', status: 'SERVED', age: '28 min', items: ['2x Americano'] },
]

export const tables: TableData[] = [
  { id: 'T01', area: 'Indoor', status: 'AVAILABLE' },
  { id: 'T02', area: 'Indoor', status: 'OCCUPIED', note: '2 order aktif' },
  { id: 'T03', area: 'Indoor', status: 'OCCUPIED', note: 'Sedang disiapkan' },
  { id: 'T04', area: 'Indoor', status: 'RESERVED', note: '19:00, 4 tamu' },
  { id: 'T05', area: 'Indoor', status: 'AVAILABLE' },
  { id: 'T06', area: 'Outdoor', status: 'AVAILABLE' },
  { id: 'T07', area: 'Outdoor', status: 'OCCUPIED', note: 'Cash due' },
  { id: 'T08', area: 'Outdoor', status: 'AVAILABLE' },
  { id: 'T09', area: 'Outdoor', status: 'RESERVED', note: '20:30, 2 tamu' },
  { id: 'T10', area: 'Outdoor', status: 'AVAILABLE' },
]

export const initialTickets: Ticket[] = [
  { id: 'BAR-118', station: 'BAR', table: 'T03', age: '8 min', status: 'PREPARING', items: ['1x Americano, ice', '1x Matcha Latte'] },
  { id: 'BAR-119', station: 'BAR', table: 'T07', age: '6 min', status: 'READY', items: ['2x Cafe Latte, ice', '+ 1 extra shot'] },
  { id: 'BAR-120', station: 'BAR', table: 'Counter', age: '2 min', status: 'NEW', items: ['1x Espresso'] },
  { id: 'KIT-052', station: 'KITCHEN', table: 'T07', age: '11 min', status: 'READY', items: ['1x French Fries'] },
  { id: 'KIT-053', station: 'KITCHEN', table: 'Counter', age: '5 min', status: 'NEW', items: ['1x Chicken Rice Bowl', 'Tanpa sambal'] },
]

export const reservations = [
  { id: 'RSV-021', time: '19:00', name: 'Tamu demo A', guests: 4, table: 'T04', status: 'CONFIRMED' },
  { id: 'RSV-022', time: '20:30', name: 'Tamu demo B', guests: 2, table: 'T09', status: 'CONFIRMED' },
  { id: 'RSV-023', time: '21:00', name: 'Tamu demo C', guests: 6, table: 'Belum dipilih', status: 'PENDING' },
]

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
