export interface SearchResult {
  type: 'vendas' | 'revendedores' | 'estoque' | 'clientes' | 'relatorio' | 'ajuda';
  title: string;
  data: any[];
}

interface SearchQuery {
  type: string;
  filters: Record<string, any>;
  keywords: string[];
}

interface SearchData {
  vendas: any[];
  revendedores: any[];
  estoque: any[];
}

export class AnaSearchService {
  private static instance: AnaSearchService;

  public static getInstance(): AnaSearchService {
    if (!AnaSearchService.instance) {
      AnaSearchService.instance = new AnaSearchService();
    }
    return AnaSearchService.instance;
  }

  parseQuery(query: string): SearchQuery {
    const lowerQuery = query.toLowerCase();

    // Palavras-chave para diferentes tipos de busca
    const keywords = {
      vendas: ['venda', 'vendas', 'vender', 'receita', 'faturamento'],
      revendedores: ['revendedor', 'revendedores', 'vendedor', 'vendedores', 'parceiro'],
      estoque: ['estoque', 'produto', 'produtos', 'diamante', 'diamantes', 'item'],
      clientes: ['cliente', 'clientes', 'comprador', 'compradores'],
      relatorio: ['relatório', 'relatorio', 'resumo', 'total', 'geral'],
      ajuda: ['ajuda', 'help', 'como', 'exemplo', 'exemplos']
    };

    let type = 'ajuda';
    let matchedKeywords: string[] = [];

    // Determinar o tipo de busca baseado nas palavras-chave
    for (const [searchType, typeKeywords] of Object.entries(keywords)) {
      const matches = typeKeywords.filter(keyword => lowerQuery.includes(keyword));
      if (matches.length > 0) {
        type = searchType;
        matchedKeywords = matches;
        break;
      }
    }

    return {
      type,
      filters: {},
      keywords: matchedKeywords
    };
  }

  async executeSearch(query: SearchQuery, data: SearchData): Promise<SearchResult> {
    switch (query.type) {
      case 'vendas':
        return this.searchVendas(query, data);
      case 'revendedores':
        return this.searchRevendedores(query, data);
      case 'estoque':
        return this.searchEstoque(query, data);
      case 'clientes':
        return this.searchClientes(query, data);
      case 'relatorio':
        return this.generateRelatorio(data);
      case 'ajuda':
      default:
        return this.getAjuda();
    }
  }

  private searchVendas(query: SearchQuery, data: SearchData): SearchResult {
    return {
      type: 'vendas',
      title: 'Vendas Encontradas',
      data: data.vendas
    };
  }

  private searchRevendedores(query: SearchQuery, data: SearchData): SearchResult {
    return {
      type: 'revendedores',
      title: 'Revendedores',
      data: data.revendedores
    };
  }

  private searchEstoque(query: SearchQuery, data: SearchData): SearchResult {
    return {
      type: 'estoque',
      title: 'Itens em Estoque',
      data: data.estoque
    };
  }

  private searchClientes(query: SearchQuery, data: SearchData): SearchResult {
    // Simular dados de clientes baseados nas vendas
    const clientesMap = new Map();

    data.vendas.forEach(venda => {
      const clientId = `cliente_${venda.id}`;
      if (!clientesMap.has(clientId)) {
        clientesMap.set(clientId, {
          id: clientId,
          totalCompras: 0,
          valorTotal: 0,
          diamantesTotal: 0,
          ultimaCompra: venda.date
        });
      }

      const cliente = clientesMap.get(clientId);
      cliente.totalCompras += 1;
      cliente.valorTotal += venda.totalValue;
      cliente.diamantesTotal += Math.floor(venda.totalValue / 10) * 100; // Simular diamantes

      if (new Date(venda.date) > new Date(cliente.ultimaCompra)) {
        cliente.ultimaCompra = venda.date;
      }
    });

    return {
      type: 'clientes',
      title: 'Top Clientes',
      data: Array.from(clientesMap.values()).sort((a, b) => b.valorTotal - a.valorTotal)
    };
  }

  private generateRelatorio(data: SearchData): SearchResult {
    const totalVendas = data.vendas.length;
    const receitaTotal = data.vendas.reduce((sum, venda) => sum + venda.totalValue, 0);
    const custoEstimado = receitaTotal * 0.7; // 30% de margem
    const lucro = receitaTotal - custoEstimado;
    const margem = (lucro / receitaTotal) * 100;

    return {
      type: 'relatorio',
      title: 'Relatório Geral',
      data: [{
        vendas: totalVendas,
        receita: receitaTotal,
        lucro: lucro,
        margem: margem
      }]
    };
  }

  private getAjuda(): SearchResult {
    const exemplos = [
      { exemplo: 'mostrar vendas' },
      { exemplo: 'lista de revendedores' },
      { exemplo: 'estoque de diamantes' },
      { exemplo: 'top clientes' },
      { exemplo: 'relatório geral' },
      { exemplo: 'vendas do João' },
      { exemplo: 'revendedores ativos' },
      { exemplo: 'produtos em falta' }
    ];

    return {
      type: 'ajuda',
      title: 'Comandos Disponíveis',
      data: exemplos
    };
  }

  generateNaturalResponse(result: SearchResult): string {
    switch (result.type) {
      case 'vendas':
        if (result.data.length === 0) {
          return '📊 Não encontrei vendas com esses critérios. Que tal verificar um período diferente?';
        }
        return `📊 Encontrei ${result.data.length} vendas! Aqui estão os detalhes:`;

      case 'revendedores':
        if (result.data.length === 0) {
          return '👥 Nenhum revendedor encontrado com esses critérios.';
        }
        const ativos = result.data.filter(r => r.isActive).length;
        return `👥 Aqui estão os revendedores encontrados. ${ativos} estão ativos no momento.`;

      case 'estoque':
        if (result.data.length === 0) {
          return '📦 Nenhum item encontrado no estoque.';
        }
        const emFalta = result.data.filter(item => item.quantity < 10).length;
        return `📦 Estoque atual: ${result.data.length} tipos de produtos. ${emFalta > 0 ? `⚠️ ${emFalta} itens com estoque baixo.` : '✅ Todos os itens bem abastecidos.'}`;

      case 'clientes':
        if (result.data.length === 0) {
          return '🎯 Ainda não há dados suficientes de clientes.';
        }
        return `🎯 Análise dos ${result.data.length} principais clientes baseada no histórico de vendas:`;

      case 'relatorio':
        const dados = result.data[0];
        return `📈 Relatório Geral:\n• ${dados.vendas} vendas realizadas\n• Receita: R$ ${dados.receita.toFixed(2)}\n• Margem de lucro: ${dados.margem.toFixed(1)}%`;

      case 'ajuda':
        return '💡 Aqui estão alguns exemplos do que posso fazer por você. Clique em qualquer um deles:';

      default:
        return 'Aqui estão as informações encontradas:';
    }
  }
}
