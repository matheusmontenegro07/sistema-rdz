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
  ChevronDown,
  ChevronUp,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ShoppingBag,
  CalendarClock,
  AlertCircle
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipo para pedido
interface Pedido {
  id: string;
  numero: string;
  fornecedor: string;
  dataPedido: string;
  dataEntrega: string | null;
  valorTotal: number;
  status: "pendente" | "aprovado" | "enviado" | "entregue" | "cancelado";
  formaPagamento: string;
  prazoEntrega: number;
  itens: number;
  observacoes: string | null;
  responsavel: string;
}

// Componente de Ações para cada pedido
function AcoesPedido({ pedido }: { pedido: Pedido }) {
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
            <CheckCircle2 className="mr-2 h-4 w-4" />
            <span>Marcar como entregue</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <XCircle className="mr-2 h-4 w-4" />
            <span>Cancelar pedido</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Componente de Status do pedido
function StatusPedido({ status }: { status: Pedido["status"] }) {
  const statusConfig = {
    pendente: {
      label: "Pendente",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      icon: Clock
    },
    aprovado: {
      label: "Aprovado",
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      icon: CheckCircle2
    },
    enviado: {
      label: "Enviado",
      className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      icon: Truck
    },
    entregue: {
      label: "Entregue",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      icon: ShoppingBag
    },
    cancelado: {
      label: "Cancelado",
      className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      icon: XCircle
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    </div>
  );
}

// Componente para verificar prazo de entrega
function PrazoEntrega({ dataPedido, prazoEntrega, status }: { 
  dataPedido: string; 
  prazoEntrega: number;
  status: Pedido["status"];
}) {
  // Se o pedido já foi entregue ou cancelado, não mostramos o prazo
  if (status === "entregue" || status === "cancelado") {
    return <span className="text-gray-500 dark:text-gray-400">-</span>;
  }

  const dataPedidoObj = new Date(dataPedido);
  const dataLimite = new Date(dataPedidoObj);
  dataLimite.setDate(dataLimite.getDate() + prazoEntrega);
  
  const hoje = new Date();
  const diasRestantes = Math.ceil((dataLimite.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diasRestantes < 0) {
    return (
      <div className="flex items-center text-red-600 dark:text-red-400">
        <AlertCircle className="h-4 w-4 mr-1" />
        <span>{Math.abs(diasRestantes)} dias atrasado</span>
      </div>
    );
  } else if (diasRestantes === 0) {
    return (
      <div className="flex items-center text-yellow-600 dark:text-yellow-400">
        <CalendarClock className="h-4 w-4 mr-1" />
        <span>Hoje</span>
      </div>
    );
  } else if (diasRestantes <= 2) {
    return (
      <div className="flex items-center text-yellow-600 dark:text-yellow-400">
        <CalendarClock className="h-4 w-4 mr-1" />
        <span>{diasRestantes} dias restantes</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center text-gray-600 dark:text-gray-400">
        <CalendarClock className="h-4 w-4 mr-1" />
        <span>{diasRestantes} dias restantes</span>
      </div>
    );
  }
}

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [fornecedorFilter, setFornecedorFilter] = useState<string>("todos");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Pedido | null;
    direction: "asc" | "desc";
  }>({ key: "dataPedido", direction: "desc" });
  const [activeTab, setActiveTab] = useState("todos");

  // Dados mockados de pedidos
  const pedidosMock: Pedido[] = [
    {
      id: "1",
      numero: "PED-001",
      fornecedor: "Distribuidora ABC",
      dataPedido: "2023-11-15",
      dataEntrega: null,
      valorTotal: 1250.75,
      status: "pendente",
      formaPagamento: "Boleto 30 dias",
      prazoEntrega: 7,
      itens: 8,
      observacoes: "Entregar no período da manhã",
      responsavel: "João Silva"
    },
    {
      id: "2",
      numero: "PED-002",
      fornecedor: "Laticínios XYZ",
      dataPedido: "2023-11-10",
      dataEntrega: "2023-11-15",
      valorTotal: 875.30,
      status: "entregue",
      formaPagamento: "À vista",
      prazoEntrega: 5,
      itens: 5,
      observacoes: null,
      responsavel: "Maria Oliveira"
    },
    {
      id: "3",
      numero: "PED-003",
      fornecedor: "Açúcar & Cia",
      dataPedido: "2023-11-18",
      dataEntrega: null,
      valorTotal: 450.00,
      status: "aprovado",
      formaPagamento: "Boleto 15 dias",
      prazoEntrega: 3,
      itens: 2,
      observacoes: null,
      responsavel: "João Silva"
    },
    {
      id: "4",
      numero: "PED-004",
      fornecedor: "Embalagens Rápidas",
      dataPedido: "2023-11-05",
      dataEntrega: null,
      valorTotal: 320.50,
      status: "enviado",
      formaPagamento: "Cartão de Crédito",
      prazoEntrega: 10,
      itens: 4,
      observacoes: "Entregar com nota fiscal",
      responsavel: "Pedro Santos"
    },
    {
      id: "5",
      numero: "PED-005",
      fornecedor: "Chocolates Premium",
      dataPedido: "2023-11-01",
      dataEntrega: null,
      valorTotal: 1800.00,
      status: "cancelado",
      formaPagamento: "Boleto 30 dias",
      prazoEntrega: 7,
      itens: 3,
      observacoes: "Cancelado por indisponibilidade de produto",
      responsavel: "Maria Oliveira"
    },
    {
      id: "6",
      numero: "PED-006",
      fornecedor: "Ovos Orgânicos",
      dataPedido: "2023-11-20",
      dataEntrega: null,
      valorTotal: 560.25,
      status: "pendente",
      formaPagamento: "À vista",
      prazoEntrega: 2,
      itens: 1,
      observacoes: "Urgente",
      responsavel: "Pedro Santos"
    },
    {
      id: "7",
      numero: "PED-007",
      fornecedor: "Distribuidora ABC",
      dataPedido: "2023-11-12",
      dataEntrega: "2023-11-18",
      valorTotal: 980.40,
      status: "entregue",
      formaPagamento: "Boleto 15 dias",
      prazoEntrega: 6,
      itens: 6,
      observacoes: null,
      responsavel: "João Silva"
    }
  ];

  // Lista de fornecedores únicos para o filtro
  const fornecedores = Array.from(
    new Set(pedidosMock.map((pedido) => pedido.fornecedor))
  );

  // Função para ordenar pedidos
  const handleSort = (key: keyof Pedido) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    
    setSortConfig({ key, direction });
  };

  // Função para renderizar o ícone de ordenação
  const renderSortIcon = (key: keyof Pedido) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 opacity-50" />;
    }
    
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Filtragem e ordenação dos pedidos
  const pedidosFiltrados = pedidosMock
    .filter((pedido) => {
      // Filtro de busca
      const matchesSearch = 
        pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de status
      const matchesStatus = statusFilter === "todos" || pedido.status === statusFilter;
      
      // Filtro de fornecedor
      const matchesFornecedor = fornecedorFilter === "todos" || pedido.fornecedor === fornecedorFilter;
      
      // Filtro de tab
      const matchesTab = 
        activeTab === "todos" || 
        (activeTab === "pendentes" && ["pendente", "aprovado", "enviado"].includes(pedido.status)) ||
        (activeTab === "entregues" && pedido.status === "entregue") ||
        (activeTab === "cancelados" && pedido.status === "cancelado");
      
      return matchesSearch && matchesStatus && matchesFornecedor && matchesTab;
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

  // Estatísticas de pedidos
  const estatisticas = {
    total: pedidosMock.length,
    pendentes: pedidosMock.filter(p => p.status === "pendente").length,
    aprovados: pedidosMock.filter(p => p.status === "aprovado").length,
    enviados: pedidosMock.filter(p => p.status === "enviado").length,
    entregues: pedidosMock.filter(p => p.status === "entregue").length,
    cancelados: pedidosMock.filter(p => p.status === "cancelado").length,
    valorTotal: pedidosMock.reduce((acc, p) => acc + p.valorTotal, 0)
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Pedido</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo pedido abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Formulário de pedido será implementado aqui.
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
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total de Pedidos</p>
            <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {estatisticas.total}
            </Badge>
          </div>
          <h3 className="text-2xl font-bold mt-1">{formatCurrency(estatisticas.valorTotal)}</h3>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Pendentes: {estatisticas.pendentes}</span>
            <span>Entregues: {estatisticas.entregues}</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pendentes</p>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
              {estatisticas.pendentes}
            </Badge>
          </div>
          <div className="flex items-center mt-2">
            <Clock className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-yellow-600 dark:text-yellow-400">Aguardando aprovação</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Em Trânsito</p>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {estatisticas.aprovados + estatisticas.enviados}
            </Badge>
          </div>
          <div className="flex items-center mt-2">
            <Truck className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-blue-600 dark:text-blue-400">Aprovados: {estatisticas.aprovados} | Enviados: {estatisticas.enviados}</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Concluídos</p>
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              {estatisticas.entregues}
            </Badge>
          </div>
          <div className="flex items-center mt-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-600 dark:text-green-400">Entregues com sucesso</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="todos" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="entregues">Entregues</TabsTrigger>
          <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filtros e busca */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar pedido..."
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
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="enviado">Enviado</SelectItem>
              <SelectItem value="entregue">Entregue</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Select
            value={fornecedorFilter}
            onValueChange={setFornecedorFilter}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Fornecedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os fornecedores</SelectItem>
              {fornecedores.map((fornecedor) => (
                <SelectItem key={fornecedor} value={fornecedor}>
                  {fornecedor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          {pedidosFiltrados.length} pedidos encontrados
        </div>
      </div>

      {/* Tabela de pedidos */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("numero")}
                >
                  <div className="flex items-center">
                    Número
                    {renderSortIcon("numero")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("fornecedor")}
                >
                  <div className="flex items-center">
                    Fornecedor
                    {renderSortIcon("fornecedor")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("dataPedido")}
                >
                  <div className="flex items-center">
                    Data
                    {renderSortIcon("dataPedido")}
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
                <TableHead>Prazo</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("valorTotal")}
                >
                  <div className="flex items-center">
                    Valor
                    {renderSortIcon("valorTotal")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("itens")}
                >
                  <div className="flex items-center">
                    Itens
                    {renderSortIcon("itens")}
                  </div>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosFiltrados.length > 0 ? (
                pedidosFiltrados.map((pedido, index) => (
                  <motion.tr
                    key={pedido.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <TableCell className="font-medium">{pedido.numero}</TableCell>
                    <TableCell>
                      <div>
                        <div>{pedido.fornecedor}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Resp: {pedido.responsavel}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(pedido.dataPedido)}</TableCell>
                    <TableCell>
                      <StatusPedido status={pedido.status} />
                    </TableCell>
                    <TableCell>
                      <PrazoEntrega 
                        dataPedido={pedido.dataPedido} 
                        prazoEntrega={pedido.prazoEntrega}
                        status={pedido.status}
                      />
                    </TableCell>
                    <TableCell>{formatCurrency(pedido.valorTotal)}</TableCell>
                    <TableCell>{pedido.itens}</TableCell>
                    <TableCell>
                      <AcoesPedido pedido={pedido} />
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Nenhum pedido encontrado com os filtros aplicados.
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