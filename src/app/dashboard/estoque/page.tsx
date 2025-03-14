"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  FileText, 
  Edit, 
  Trash2, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Download,
  BarChart,
  ArrowUpDown,
  History
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

// Tipo para item de estoque
interface ItemEstoque {
  id: string;
  codigo: string;
  nome: string;
  categoria: string;
  unidade: string;
  qtdAtual: number;
  qtdMinima: number;
  qtdIdeal: number;
  custoUnitario: number;
  ultimaCompra: string | null;
  validade: string | null;
  status: "normal" | "baixo" | "critico";
  fornecedor: string;
}

// Componente de Ações para cada item
function AcoesItem({ item }: { item: ItemEstoque }) {
  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Ver detalhes</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Editar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <span>Ajustar estoque</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History className="mr-2 h-4 w-4" />
            <span>Histórico</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Componente de Status do estoque
function StatusEstoque({ status, qtdAtual, qtdMinima }: { 
  status: ItemEstoque["status"]; 
  qtdAtual: number;
  qtdMinima: number;
}) {
  const statusConfig = {
    normal: {
      label: "Normal",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    },
    baixo: {
      label: "Baixo",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
    critico: {
      label: "Crítico",
      className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    }
  };

  const config = statusConfig[status];
  const percentual = qtdMinima > 0 ? Math.round((qtdAtual / qtdMinima) * 100) : 100;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
      {status !== "normal" && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {percentual}% do mínimo
        </span>
      )}
    </div>
  );
}

// Componente de Barra de Progresso
function BarraProgresso({ atual, minimo, ideal }: { 
  atual: number; 
  minimo: number; 
  ideal: number;
}) {
  // Calcula a porcentagem em relação ao ideal (máximo 100%)
  const porcentagem = Math.min(Math.round((atual / ideal) * 100), 100);
  
  // Determina a cor com base na relação com o mínimo
  let corBarra = "bg-green-500";
  if (atual < minimo * 0.5) {
    corBarra = "bg-red-500";
  } else if (atual < minimo) {
    corBarra = "bg-yellow-500";
  }

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>{atual} un</span>
        <span>{ideal} un</span>
      </div>
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${corBarra} rounded-full`} 
          style={{ width: `${porcentagem}%` }}
        />
      </div>
      {minimo > 0 && (
        <div 
          className="h-4 w-0.5 bg-red-400 absolute mt-[-12px]" 
          style={{ 
            left: `${Math.min(Math.round((minimo / ideal) * 100), 100)}%`,
            marginLeft: "8px" 
          }}
        />
      )}
    </div>
  );
}

export default function Estoque() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ItemEstoque | null;
    direction: "asc" | "desc";
  }>({ key: "nome", direction: "asc" });

  // Dados mockados de itens de estoque
  const itensMock: ItemEstoque[] = [
    {
      id: "1",
      codigo: "FT001",
      nome: "Farinha de Trigo",
      categoria: "Farinhas",
      unidade: "kg",
      qtdAtual: 25,
      qtdMinima: 50,
      qtdIdeal: 200,
      custoUnitario: 3.50,
      ultimaCompra: "2023-11-10",
      validade: "2024-05-15",
      status: "critico",
      fornecedor: "Distribuidora ABC"
    },
    {
      id: "2",
      codigo: "AC001",
      nome: "Açúcar Cristal",
      categoria: "Açúcares",
      unidade: "kg",
      qtdAtual: 40,
      qtdMinima: 30,
      qtdIdeal: 100,
      custoUnitario: 4.20,
      ultimaCompra: "2023-11-15",
      validade: "2024-06-20",
      status: "baixo",
      fornecedor: "Açúcar & Cia"
    },
    {
      id: "3",
      codigo: "LT001",
      nome: "Leite Integral",
      categoria: "Laticínios",
      unidade: "L",
      qtdAtual: 60,
      qtdMinima: 40,
      qtdIdeal: 120,
      custoUnitario: 5.80,
      ultimaCompra: "2023-11-18",
      validade: "2023-12-15",
      status: "normal",
      fornecedor: "Laticínios XYZ"
    },
    {
      id: "4",
      codigo: "OV001",
      nome: "Ovos",
      categoria: "Ovos",
      unidade: "dz",
      qtdAtual: 15,
      qtdMinima: 20,
      qtdIdeal: 50,
      custoUnitario: 12.90,
      ultimaCompra: "2023-11-20",
      validade: "2023-12-10",
      status: "baixo",
      fornecedor: "Ovos Orgânicos"
    },
    {
      id: "5",
      codigo: "CH001",
      nome: "Chocolate em Barra",
      categoria: "Chocolates",
      unidade: "kg",
      qtdAtual: 8,
      qtdMinima: 5,
      qtdIdeal: 20,
      custoUnitario: 32.50,
      ultimaCompra: "2023-11-05",
      validade: "2024-03-20",
      status: "normal",
      fornecedor: "Chocolates Premium"
    },
    {
      id: "6",
      codigo: "FR001",
      nome: "Fermento Biológico",
      categoria: "Fermentos",
      unidade: "kg",
      qtdAtual: 2,
      qtdMinima: 5,
      qtdIdeal: 15,
      custoUnitario: 18.90,
      ultimaCompra: "2023-10-25",
      validade: "2024-01-15",
      status: "critico",
      fornecedor: "Distribuidora ABC"
    },
    {
      id: "7",
      codigo: "EM001",
      nome: "Embalagem para Bolo",
      categoria: "Embalagens",
      unidade: "un",
      qtdAtual: 350,
      qtdMinima: 200,
      qtdIdeal: 500,
      custoUnitario: 0.75,
      ultimaCompra: "2023-11-12",
      validade: null,
      status: "normal",
      fornecedor: "Embalagens Rápidas"
    }
  ];

  // Lista de categorias únicas para o filtro
  const categorias = Array.from(
    new Set(itensMock.map((item) => item.categoria))
  );

  // Função para ordenar itens
  const handleSort = (key: keyof ItemEstoque) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    
    setSortConfig({ key, direction });
  };

  // Função para renderizar o ícone de ordenação
  const renderSortIcon = (key: keyof ItemEstoque) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 opacity-50" />;
    }
    
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Filtragem e ordenação dos itens
  const itensFiltrados = itensMock
    .filter((item) => {
      // Filtro de busca
      const matchesSearch = 
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de status
      const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
      
      // Filtro de categoria
      const matchesCategoria = categoriaFilter === "todas" || item.categoria === categoriaFilter;
      
      return matchesSearch && matchesStatus && matchesCategoria;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Para valores numéricos ou booleanos
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      
      return 0;
    });

  // Estatísticas de estoque
  const estatisticas = {
    total: itensMock.length,
    criticos: itensMock.filter(item => item.status === "critico").length,
    baixos: itensMock.filter(item => item.status === "baixo").length,
    valorTotal: itensMock.reduce((acc, item) => acc + (item.qtdAtual * item.custoUnitario), 0)
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Estoque</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <BarChart className="h-4 w-4 mr-2" />
            Relatório
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Item</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo item de estoque abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Formulário de cadastro será implementado aqui.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total de Itens</p>
          <h3 className="text-2xl font-bold mt-1">{estatisticas.total}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Itens Críticos</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">{estatisticas.criticos}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Itens Baixos</p>
          <h3 className="text-2xl font-bold mt-1 text-yellow-600">{estatisticas.baixos}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Valor Total em Estoque</p>
          <h3 className="text-2xl font-bold mt-1">{formatCurrency(estatisticas.valorTotal)}</h3>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar item..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="baixo">Baixo</SelectItem>
              <SelectItem value="critico">Crítico</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Select
            value={categoriaFilter}
            onValueChange={setCategoriaFilter}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as categorias</SelectItem>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          {itensFiltrados.length} itens encontrados
        </div>
      </div>

      {/* Tabela de itens */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("codigo")}
                >
                  <div className="flex items-center">
                    Código
                    {renderSortIcon("codigo")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("nome")}
                >
                  <div className="flex items-center">
                    Nome
                    {renderSortIcon("nome")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("categoria")}
                >
                  <div className="flex items-center">
                    Categoria
                    {renderSortIcon("categoria")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("qtdAtual")}
                >
                  <div className="flex items-center">
                    Estoque
                    {renderSortIcon("qtdAtual")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {renderSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("custoUnitario")}
                >
                  <div className="flex items-center">
                    Custo Unit.
                    {renderSortIcon("custoUnitario")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("validade")}
                >
                  <div className="flex items-center">
                    Validade
                    {renderSortIcon("validade")}
                  </div>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itensFiltrados.length > 0 ? (
                itensFiltrados.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>
                      <div>
                        <div>{item.nome}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.fornecedor}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell>
                      <div className="w-32 relative">
                        <BarraProgresso 
                          atual={item.qtdAtual} 
                          minimo={item.qtdMinima} 
                          ideal={item.qtdIdeal} 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusEstoque 
                        status={item.status} 
                        qtdAtual={item.qtdAtual} 
                        qtdMinima={item.qtdMinima} 
                      />
                    </TableCell>
                    <TableCell>{formatCurrency(item.custoUnitario)}</TableCell>
                    <TableCell>
                      {item.validade 
                        ? formatDate(item.validade) 
                        : <span className="text-gray-400">N/A</span>}
                    </TableCell>
                    <TableCell>
                      <AcoesItem item={item} />
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Nenhum item encontrado com os filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
} 