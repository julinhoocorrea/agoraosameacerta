export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'revendedor';
  avatar?: string;
}

export interface Revendedor {
  id: string;
  name: string;
  phone: string;
  cpf?: string;
  commission: number; // percentual
  totalSold: number;
  commissionPaid: number;
  active: boolean;
  createdAt: Date;
}

export interface Venda {
  id: string;
  date: Date;
  revendedorId: string;
  revendedorName: string;
  diamondQuantity: number;
  totalValue: number;
  cost: number;
  profit: number;
  commission: number;
  netProfit: number;
  status: 'pago' | 'pendente';
  deliveryStatus: 'pendente' | 'enviado' | 'entregue';
  deliveredAt?: Date;
  deliveredBy?: string;
  kwaiId?: string;
  kwaiLink?: string;
}

export interface EstoqueItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number; // Preço por diamante em reais
  category: 'diamonds' | 'packages' | 'special';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EstoqueMovimentacao {
  id: string;
  itemId: string;
  itemName: string;
  type: 'entrada' | 'saida' | 'ajuste';
  quantity: number;
  reason: string;
  date: Date;
  userId: string;
  unitPrice?: number;
  totalValue?: number;
}

export interface Estoque {
  items: EstoqueItem[];
  movimentacoes: EstoqueMovimentacao[];
}

export interface DashboardMetrics {
  receitaBruta: number;
  lucroLiquido: number;
  diamantesVendidos: number;
  comissaoPaga: number;
  saldoConta: number;
}

export interface DashboardChartData {
  date: string;
  receita: number;
  lucro: number;
  comissao: number;
}

export interface IAConfig {
  id: string;
  command: string;
  response: string;
  active: boolean;
}

export interface DREReport {
  period: string;
  receitaBruta: number;
  cmv: number;
  lucroBruto: number;
  imposto: number; // 33%
  lucroLiquido: number;
  comissaoTotal: number;
  margemBruta: number; // %
}

// Constantes de negócio
export const BUSINESS_CONSTANTS = {
  DIAMOND_PRICE_REAL: 6.89, // R$ por 100 diamantes
  VET_COST: 0.07, // R$ por dólar
  COMMISSION_RATE: 1.5, // % comissão revendedor
  TAX_RATE: 33, // % imposto sobre lucro
  USD_DIAMONDS: 98, // diamantes por 1 USD
} as const;

export interface PaymentWebhook {
  id: string;
  status: 'pending' | 'paid' | 'cancelled' | 'expired';
  value: number;
  description: string;
  externalReference: string;
  paidAt?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
}

export interface PendingPayment {
  id: string;
  paymentId: string;
  kwaiId: string;
  diamondQuantity: number;
  totalValue: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCPF: string;
  status: 'pending' | 'paid' | 'processing' | 'cancelled';
  createdAt: Date;
  paidAt?: Date;
  paymentUrl: string;
  qrCode: string;
}
