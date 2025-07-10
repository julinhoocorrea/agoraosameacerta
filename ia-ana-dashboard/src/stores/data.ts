import { create } from 'zustand';

interface Venda {
  id: string;
  date: string;
  revendedorName: string;
  totalValue: number;
  status: 'pago' | 'pendente' | 'cancelado';
  revendedorId: string;
}

interface Revendedor {
  id: string;
  name: string;
  isActive: boolean;
  performance?: {
    totalVendas: number;
    receita: number;
  };
}

interface EstoqueItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface DataStore {
  vendas: Venda[];
  revendedores: Revendedor[];
  estoque: {
    items: EstoqueItem[];
  };
}

// Mock data
const mockVendas: Venda[] = [
  {
    id: '1',
    date: '2024-01-15',
    revendedorName: 'João Silva',
    totalValue: 250.00,
    status: 'pago',
    revendedorId: 'rev1'
  },
  {
    id: '2',
    date: '2024-01-14',
    revendedorName: 'Maria Santos',
    totalValue: 180.50,
    status: 'pago',
    revendedorId: 'rev2'
  },
  {
    id: '3',
    date: '2024-01-13',
    revendedorName: 'Pedro Costa',
    totalValue: 320.00,
    status: 'pendente',
    revendedorId: 'rev3'
  },
  {
    id: '4',
    date: '2024-01-12',
    revendedorName: 'Ana Lima',
    totalValue: 95.75,
    status: 'pago',
    revendedorId: 'rev4'
  },
  {
    id: '5',
    date: '2024-01-11',
    revendedorName: 'Carlos Oliveira',
    totalValue: 440.20,
    status: 'pago',
    revendedorId: 'rev5'
  }
];

const mockRevendedores: Revendedor[] = [
  {
    id: 'rev1',
    name: 'João Silva',
    isActive: true,
    performance: {
      totalVendas: 15,
      receita: 3750.00
    }
  },
  {
    id: 'rev2',
    name: 'Maria Santos',
    isActive: true,
    performance: {
      totalVendas: 12,
      receita: 2160.50
    }
  },
  {
    id: 'rev3',
    name: 'Pedro Costa',
    isActive: true,
    performance: {
      totalVendas: 8,
      receita: 2560.00
    }
  },
  {
    id: 'rev4',
    name: 'Ana Lima',
    isActive: false,
    performance: {
      totalVendas: 4,
      receita: 383.00
    }
  },
  {
    id: 'rev5',
    name: 'Carlos Oliveira',
    isActive: true,
    performance: {
      totalVendas: 20,
      receita: 8804.00
    }
  }
];

const mockEstoque: EstoqueItem[] = [
  {
    id: 'item1',
    name: 'Diamantes Kwai 100',
    quantity: 50,
    price: 10.00
  },
  {
    id: 'item2',
    name: 'Diamantes Kwai 500',
    quantity: 25,
    price: 45.00
  },
  {
    id: 'item3',
    name: 'Diamantes Kwai 1000',
    quantity: 8,
    price: 85.00
  },
  {
    id: 'item4',
    name: 'Diamantes Kwai 2000',
    quantity: 15,
    price: 160.00
  },
  {
    id: 'item5',
    name: 'Diamantes Kwai 5000',
    quantity: 3,
    price: 380.00
  }
];

export const useDataStore = create<DataStore>(() => ({
  vendas: mockVendas,
  revendedores: mockRevendedores,
  estoque: {
    items: mockEstoque
  }
}));
