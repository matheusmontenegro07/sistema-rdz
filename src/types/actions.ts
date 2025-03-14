import { z } from 'zod';

// Tipo genérico para respostas de ações
export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
};

// Schemas para validação de fornecedores
export const fornecedorSchema = z.object({
  empresa: z.string().min(1, 'Nome da empresa é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  tipo: z.enum(['Fabricante', 'Distribuidor', 'Atacadista', 'E-commerce'], {
    errorMap: () => ({ message: 'Tipo inválido' }),
  }),
  pedido_minimo: z.number().nullable().optional(),
  vendedor: z.string().optional(),
  whatsapp: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  site: z.string().url('URL inválida').optional(),
});

// Schemas para validação de insumos
export const insumoSchema = z.object({
  produto: z.string().min(1, 'Nome do produto é obrigatório'),
  codigo_barras: z.string().min(1, 'Código de barras é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  unidade_medida: z.string().min(1, 'Unidade de medida é obrigatória'),
  estoque_minimo: z.number().min(0, 'Estoque mínimo deve ser maior ou igual a zero'),
  estoque_atual: z.number().min(0, 'Estoque atual deve ser maior ou igual a zero'),
  homologado: z.boolean(),
  fornecedor_id: z.string().nullable().optional(),
  fornecedores: z.array(z.string()),
});

// Schemas para validação de movimentações de estoque
export const movimentacaoEstoqueSchema = z.object({
  insumo_id: z.string().min(1, 'Insumo é obrigatório'),
  quantidade: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
  tipo: z.enum(['entrada', 'saida'], {
    errorMap: () => ({ message: 'Tipo inválido' }),
  }),
  data: z.string().min(1, 'Data é obrigatória'),
  origem: z.enum(['manual', 'pedido', 'venda', 'desperdicio'], {
    errorMap: () => ({ message: 'Origem inválida' }),
  }),
  pedido_id: z.string().optional(),
  venda_id: z.string().optional(),
});

// Schemas para validação de cotações
export const ordemCotacaoSchema = z.object({
  fornecedor_id: z.string().min(1, 'Fornecedor é obrigatório'),
  prazo_resposta: z.string().min(1, 'Prazo de resposta é obrigatório'),
  itens: z.array(
    z.object({
      insumo_id: z.string().min(1, 'Insumo é obrigatório'),
      quantidade: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
    })
  ).min(1, 'Pelo menos um item é obrigatório'),
});

// Schemas para validação de listas de compras
export const listaCompraSchema = z.object({
  data: z.string().min(1, 'Data é obrigatória'),
  atacadistas: z.array(
    z.object({
      fornecedor_id: z.string().min(1, 'Fornecedor é obrigatório'),
      ordem: z.number().min(0),
      itens: z.array(
        z.object({
          insumo_id: z.string().min(1, 'Insumo é obrigatório'),
          quantidade: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
          secao: z.string().optional(),
          preco_unitario: z.number().optional(),
          preco_total: z.number().optional(),
        })
      ),
    })
  ),
});

// Schemas para validação de ordens de compra
export const ordemCompraSchema = z.object({
  fornecedor_id: z.string().min(1, 'Fornecedor é obrigatório'),
  tipo: z.enum(['automatica', 'manual'], {
    errorMap: () => ({ message: 'Tipo inválido' }),
  }),
  itens: z.array(
    z.object({
      insumo_id: z.string().min(1, 'Insumo é obrigatório'),
      quantidade: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
      preco_unitario: z.number().min(0, 'Preço unitário deve ser maior ou igual a zero'),
    })
  ).min(1, 'Pelo menos um item é obrigatório'),
});

// Schemas para validação de pedidos
export const pedidoSchema = z.object({
  ordem_compra_id: z.string().min(1, 'Ordem de compra é obrigatória'),
  status: z.enum(['aguardando_confirmacao', 'confirmado', 'recebido', 'cancelado'], {
    errorMap: () => ({ message: 'Status inválido' }),
  }),
  itens: z.array(
    z.object({
      insumo_id: z.string().min(1, 'Insumo é obrigatório'),
      quantidade_solicitada: z.number().min(0.01, 'Quantidade solicitada deve ser maior que zero'),
      quantidade_recebida: z.number().optional(),
      preco_unitario: z.number().min(0, 'Preço unitário deve ser maior ou igual a zero'),
    })
  ),
});

// Schemas para validação de fichas técnicas
export const fichaTecnicaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  imagem_url: z.string().optional(),
  tipo: z.enum(['produto_pronto', 'produto_intermediario'], {
    errorMap: () => ({ message: 'Tipo inválido' }),
  }),
  rendimento_peso: z.number().min(0.01, 'Rendimento em peso deve ser maior que zero'),
  rendimento_peso_unidade: z.string().min(1, 'Unidade de rendimento é obrigatória'),
  rendimento_porcoes: z.number().min(1, 'Rendimento em porções deve ser maior ou igual a um'),
  margem_lucro: z.number().optional(),
  preco_venda_praticado: z.number().optional(),
  ingredientes: z.array(
    z.object({
      insumo_id: z.string().min(1, 'Insumo é obrigatório'),
      quantidade_bruta: z.number().min(0.01, 'Quantidade bruta deve ser maior que zero'),
      unidade_medida: z.string().min(1, 'Unidade de medida é obrigatória'),
      percentual_rendimento: z.number().min(1).max(100, 'Percentual de rendimento deve estar entre 1 e 100'),
      substitutos: z.array(z.string()).optional(),
    })
  ).min(1, 'Pelo menos um ingrediente é obrigatório'),
});

// Schemas para validação de registros de vendas
export const registroVendaSchema = z.object({
  data: z.string().min(1, 'Data é obrigatória'),
  itens: z.array(
    z.object({
      ficha_tecnica_id: z.string().min(1, 'Ficha técnica é obrigatória'),
      quantidade: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
    })
  ).min(1, 'Pelo menos um item é obrigatório'),
});

// Schemas para validação de configurações
export const configuracaoSchema = z.object({
  tema: z.enum(['claro', 'escuro', 'sistema'], {
    errorMap: () => ({ message: 'Tema inválido' }),
  }),
  registro_automatico: z.boolean(),
  prazo_cotacao: z.string().min(1, 'Prazo de cotação é obrigatório'),
  frequencia_contagem: z.enum(['semanal', 'quinzenal', 'mensal'], {
    errorMap: () => ({ message: 'Frequência inválida' }),
  }),
  notificacoes: z.boolean(),
}); 