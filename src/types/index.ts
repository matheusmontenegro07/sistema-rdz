// Tipos de usuário
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

// Tipos de fornecedor
export type FornecedorTipo = 'Fabricante' | 'Distribuidor' | 'Atacadista' | 'E-commerce';

export interface Fornecedor {
  id: string;
  empresa: string;
  categoria: string;
  tipo: FornecedorTipo;
  pedido_minimo: number | null;
  vendedor?: string;
  whatsapp?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  site?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Tipos de insumo
export interface Insumo {
  id: string;
  produto: string;
  codigo_barras: string;
  categoria: string;
  unidade_medida: string;
  estoque_minimo: number;
  estoque_atual: number;
  homologado: boolean;
  fornecedor_id: string | null;
  fornecedores: string[]; // IDs dos fornecedores
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Tipos de movimentação de estoque
export type TipoMovimentacao = 'entrada' | 'saida';

export interface MovimentacaoEstoque {
  id: string;
  insumo_id: string;
  quantidade: number;
  tipo: TipoMovimentacao;
  data: string;
  origem: 'manual' | 'pedido' | 'venda' | 'desperdicio';
  pedido_id?: string;
  venda_id?: string;
  user_id: string;
  created_at: string;
}

// Tipos de cotação
export interface OrdemCotacao {
  id: string;
  fornecedor_id: string;
  prazo_resposta: string;
  status: 'aberto' | 'respondido' | 'nao_respondido';
  itens: ItemCotacao[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ItemCotacao {
  id: string;
  ordem_cotacao_id: string;
  insumo_id: string;
  quantidade: number;
  preco_unitario?: number;
  observacao?: string;
  created_at: string;
  updated_at: string;
}

// Tipos de lista de compras
export interface ListaCompra {
  id: string;
  data: string;
  atacadistas: AtacadistaCompra[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface AtacadistaCompra {
  id: string;
  fornecedor_id: string;
  lista_compra_id: string;
  ordem: number;
  itens: ItemCompra[];
  created_at: string;
  updated_at: string;
}

export interface ItemCompra {
  id: string;
  atacadista_compra_id: string;
  insumo_id: string;
  quantidade: number;
  secao?: string;
  preco_unitario?: number;
  preco_total?: number;
  created_at: string;
  updated_at: string;
}

// Tipos de planilha de cotação
export interface PlanilhaCotacao {
  id: string;
  itens: ItemPlanilha[];
  valor_total: number;
  economia_estimada: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ItemPlanilha {
  id: string;
  planilha_cotacao_id: string;
  insumo_id: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  observacao?: string;
  ultima_cotacao?: number;
  variacao_preco?: number;
  status: 'mais_barato' | 'mais_caro' | 'mesmo_preco';
  melhor_preco_fornecedor_id?: string;
  fornecedor_selecionado_id?: string;
  fornecedores_cotacao: FornecedorCotacao[];
  created_at: string;
  updated_at: string;
}

export interface FornecedorCotacao {
  id: string;
  item_planilha_id: string;
  fornecedor_id: string;
  preco: number;
  created_at: string;
  updated_at: string;
}

// Tipos de ordem de compra
export interface OrdemCompra {
  id: string;
  fornecedor_id: string;
  valor_total: number;
  status: 'aberto' | 'enviado' | 'cancelado';
  tipo: 'automatica' | 'manual';
  itens: ItemOrdemCompra[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ItemOrdemCompra {
  id: string;
  ordem_compra_id: string;
  insumo_id: string;
  quantidade: number;
  preco_unitario: number;
  preco_total: number;
  created_at: string;
  updated_at: string;
}

// Tipos de pedido
export interface Pedido {
  id: string;
  ordem_compra_id: string;
  status: 'aguardando_confirmacao' | 'confirmado' | 'recebido' | 'cancelado';
  itens: ItemPedido[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ItemPedido {
  id: string;
  pedido_id: string;
  insumo_id: string;
  quantidade_solicitada: number;
  quantidade_recebida?: number;
  preco_unitario: number;
  preco_total: number;
  created_at: string;
  updated_at: string;
}

// Tipos de ficha técnica
export type TipoFichaTecnica = 'produto_pronto' | 'produto_intermediario';

export interface FichaTecnica {
  id: string;
  nome: string;
  categoria: string;
  imagem_url?: string;
  tipo: TipoFichaTecnica;
  rendimento_peso: number;
  rendimento_peso_unidade: string;
  rendimento_porcoes: number;
  custo_total: number;
  custo_porcao: number;
  custo_kg: number;
  margem_lucro?: number;
  preco_venda_praticado?: number;
  preco_venda_sugerido?: number;
  cmv_percentual?: number;
  ingredientes: Ingrediente[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Ingrediente {
  id: string;
  ficha_tecnica_id: string;
  insumo_id: string;
  quantidade_bruta: number;
  unidade_medida: string;
  preco_bruto: number;
  percentual_rendimento: number;
  quantidade_liquida: number;
  preco_liquido: number;
  substitutos?: string[]; // IDs dos insumos substitutos
  created_at: string;
  updated_at: string;
}

// Tipos de registro de vendas
export interface RegistroVenda {
  id: string;
  data: string;
  faturamento_total: number;
  custo_total: number;
  cmv_medio: number;
  itens: ItemVenda[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ItemVenda {
  id: string;
  registro_venda_id: string;
  ficha_tecnica_id: string;
  quantidade: number;
  faturamento: number;
  custo: number;
  cmv: number;
  created_at: string;
  updated_at: string;
}

// Tipos para relatórios
export interface RelatoriosCMV {
  cmv_teorico: number;
  cmv_real: number;
  diferenca_percentual: number;
  evolucao: {
    periodo: string;
    cmv_teorico: number;
    cmv_real: number;
  }[];
  por_categoria: {
    categoria: string;
    cmv_teorico: number;
    cmv_real: number;
  }[];
  por_produto: {
    produto: string;
    cmv_teorico: number;
    cmv_real: number;
  }[];
  por_fornecedor: {
    fornecedor: string;
    valor: number;
  }[];
}

export interface RelatorioVariacaoPrecos {
  insumos: {
    insumo_id: string;
    nome: string;
    evolucao: {
      data: string;
      preco: number;
    }[];
  }[];
  fornecedores: {
    fornecedor_id: string;
    nome: string;
    total_compras: number;
  }[];
}

export interface RelatorioProjecaoDemanda {
  insumos_necessarios: {
    insumo_id: string;
    nome: string;
    quantidade: number;
  }[];
  faturamento_projetado: number;
  insights: string[];
}

// Tipos para programa de indicação
export interface ProgramaIndicacao {
  codigo: string;
  niveis_beneficio: {
    nivel: number;
    descricao: string;
    beneficio: string;
  }[];
  indicacoes: {
    id: string;
    email: string;
    status: 'pendente' | 'ativo' | 'inativo';
    data: string;
  }[];
  total_indicacoes: number;
  total_ativos: number;
}

// Tipos para planos
export interface Plano {
  id: string;
  nome: string;
  preco: number;
  periodo: 'mensal' | 'anual';
  recursos: string[];
  destaque: boolean;
}

// Tipos para configurações
export interface Configuracao {
  id: string;
  user_id: string;
  tema: 'claro' | 'escuro' | 'sistema';
  registro_automatico: boolean;
  prazo_cotacao: string;
  frequencia_contagem: 'semanal' | 'quinzenal' | 'mensal';
  notificacoes: boolean;
  created_at: string;
  updated_at: string;
}

// Tipos para ações
export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}; 