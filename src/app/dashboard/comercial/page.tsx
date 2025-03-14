"use client";

import { useState } from "react";
import { 
  BarChart3, 
  LineChart,
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  FilterX,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ArrowUpRight,
  Users
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
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Tipo para vendas
interface Venda {
  id: string;
  numero: string;
  cliente: string;
  data: string;
  valor: number;
  status: "completa" | "parcial" | "cancelada";
  metodoPagamento: "dinheiro" | "cartao" | "pix" | "boleto";
  vendedor: string;
  itens: number;
}

// Componente de Métrica
function MetricaCard({ 
  titulo, 
  valor, 
  descricao, 
  icone: Icone, 
  mudanca, 
  direcao
}: { 
  titulo: string;
  valor: string;
  descricao: string;
  icone: any;
  mudanca: string;
  direcao: "up" | "down" | "neutral";
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{titulo}</p>
            <h3 className="text-2xl font-bold mt-1">{valor}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {descricao}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${
            direcao === "up" 
              ? "bg-green-100 dark:bg-green-900/20" 
              : direcao === "down" 
                ? "bg-red-100 dark:bg-red-900/20"
                : "bg-gray-100 dark:bg-gray-900/20"
          }`}>
            <Icone className={`h-5 w-5 ${
              direcao === "up" 
                ? "text-green-600 dark:text-green-400" 
                : direcao === "down" 
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400"
            }`} />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {direcao === "up" && <TrendingUp className="h-4 w-4 text-green-500 mr-1" />}
          {direcao === "down" && <TrendingDown className="h-4 w-4 text-red-500 mr-1" />}
          <span className={`text-sm ${
            direcao === "up" 
              ? "text-green-500" 
              : direcao === "down" 
                ? "text-red-500" 
                : "text-gray-500 dark:text-gray-400"
          }`}>
            {mudanca}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de Status da venda
function StatusVenda({ status }: { status: Venda["status"] }) {
  const statusConfig = {
    completa: {
      label: "Completa",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    },
    parcial: {
      label: "Parcial",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
    cancelada: {
      label: "Cancelada",
      className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

// Componente de Método de pagamento
function MetodoPagamento({ metodo }: { metodo: Venda["metodoPagamento"] }) {
  const metodosConfig = {
    dinheiro: {
      label: "Dinheiro",
      className: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
    },
    cartao: {
      label: "Cartão",
      className: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
    },
    pix: {
      label: "PIX",
      className: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
    },
    boleto: {
      label: "Boleto",
      className: "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300"
    }
  };

  const config = metodosConfig[metodo];

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}

export default function Comercial() {
  const [periodoFiltro, setPeriodoFiltro] = useState("30dias");
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Venda | null;
    direction: "asc" | "desc";
  }>({ key: "data", direction: "desc" });

  // Dados mockados de vendas
  const vendasMock: Venda[] = [
    {
      id: "1",
      numero: "VND-2023-0001",
      cliente: "Supermercado Central",
      data: "2023-11-22",
      valor: 5280.90,
      status: "completa",
      metodoPagamento: "pix",
      vendedor: "Carlos Oliveira",
      itens: 12
    },
    {
      id: "2",
      numero: "VND-2023-0002",
      cliente: "Padaria Nova",
      data: "2023-11-20",
      valor: 1850.50,
      status: "completa",
      metodoPagamento: "cartao",
      vendedor: "Ana Silva",
      itens: 8
    },
    {
      id: "3",
      numero: "VND-2023-0003",
      cliente: "Restaurante Sabor",
      data: "2023-11-18",
      valor: 3200.00,
      status: "parcial",
      metodoPagamento: "boleto",
      vendedor: "Carlos Oliveira",
      itens: 15
    },
    {
      id: "4",
      numero: "VND-2023-0004",
      cliente: "Hotel Estrela",
      data: "2023-11-15",
      valor: 7500.75,
      status: "completa",
      metodoPagamento: "cartao",
      vendedor: "Mariana Santos",
      itens: 20
    },
    {
      id: "5",
      numero: "VND-2023-0005",
      cliente: "Confeitaria Doce",
      data: "2023-11-10",
      valor: 920.30,
      status: "cancelada",
      metodoPagamento: "pix",
      vendedor: "Pedro Costa",
      itens: 5
    },
    {
      id: "6",
      numero: "VND-2023-0006",
      cliente: "Lanchonete Rápida",
      data: "2023-11-08",
      valor: 1450.00,
      status: "completa",
      metodoPagamento: "dinheiro",
      vendedor: "Ana Silva",
      itens: 10
    },
    {
      id: "7",
      numero: "VND-2023-0007",
      cliente: "Supermercado Central",
      data: "2023-11-05",
      valor: 4800.20,
      status: "completa",
      metodoPagamento: "cartao",
      vendedor: "Carlos Oliveira",
      itens: 18
    }
  ];

  // Métricas de vendas
  const metricas = [
    {
      titulo: "Faturamento",
      valor: formatCurrency(24950.75),
      descricao: "Últimos 30 dias",
      icone: DollarSign,
      mudanca: "+12% em relação ao mês anterior",
      direcao: "up" as const
    },
    {
      titulo: "Ticket Médio",
      valor: formatCurrency(3564.39),
      descricao: "Por venda",
      icone: ShoppingCart,
      mudanca: "+5% em relação ao mês anterior",
      direcao: "up" as const
    },
    {
      titulo: "Taxa de Conversão",
      valor: "68%",
      descricao: "De orçamentos para vendas",
      icone: TrendingUp,
      mudanca: "-3% em relação ao mês anterior",
      direcao: "down" as const
    },
    {
      titulo: "Clientes Ativos",
      valor: "42",
      descricao: "Com compras no período",
      icone: Users,
      mudanca: "Mesmo número do mês anterior",
      direcao: "neutral" as const
    }
  ];

  // Função para ordenar vendas
  const handleSort = (key: keyof Venda) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    
    setSortConfig({ key, direction });
  };

  // Função para renderizar o ícone de ordenação
  const renderSortIcon = (key: keyof Venda) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 opacity-50" />;
    }
    
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Filtragem e ordenação das vendas
  const vendasFiltradas = vendasMock
    .filter((venda) => {
      // Filtro de busca
      const matchesSearch = 
        venda.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venda.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de status
      const matchesStatus = statusFiltro === "todos" || venda.status === statusFiltro;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Para valores numéricos
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Comercial</h1>
        <div className="flex items-center gap-2">
          <Select
            value={periodoFiltro}
            onValueChange={setPeriodoFiltro}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7dias">Últimos 7 dias</SelectItem>
              <SelectItem value="30dias">Últimos 30 dias</SelectItem>
              <SelectItem value="90dias">Últimos 90 dias</SelectItem>
              <SelectItem value="ano">Este ano</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Selecionar Datas
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricas.map((metrica, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MetricaCard {...metrica} />
          </motion.div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-lg mb-4">
              Vendas por Período
              <Button variant="ghost" size="sm" className="float-right">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription className="mb-4">Comparativo de vendas dos últimos 6 meses</CardDescription>
            <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-10 w-10 text-gray-400" />
              <span className="ml-2 text-gray-500">Gráfico de vendas por período</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-lg mb-4">
              Vendas por Categoria
              <Button variant="ghost" size="sm" className="float-right">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription className="mb-4">Distribuição de vendas por categoria de produto</CardDescription>
            <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <LineChart className="h-10 w-10 text-gray-400" />
              <span className="ml-2 text-gray-500">Gráfico de vendas por categoria</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca para a tabela */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por cliente, número da venda ou vendedor..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={statusFiltro}
            onValueChange={setStatusFiltro}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="completa">Completa</SelectItem>
              <SelectItem value="parcial">Parcial</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <FilterX className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabela de vendas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer w-[100px]"
                  onClick={() => handleSort("numero")}
                >
                  <div className="flex items-center">
                    Número
                    {renderSortIcon("numero")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("cliente")}
                >
                  <div className="flex items-center">
                    Cliente
                    {renderSortIcon("cliente")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("data")}
                >
                  <div className="flex items-center">
                    Data
                    {renderSortIcon("data")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("valor")}
                >
                  <div className="flex items-center justify-end">
                    Valor
                    {renderSortIcon("valor")}
                  </div>
                </TableHead>
                <TableHead>Método</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {renderSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendasFiltradas.length > 0 ? (
                vendasFiltradas.map((venda, index) => (
                  <motion.tr
                    key={venda.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <TableCell className="font-medium">{venda.numero}</TableCell>
                    <TableCell>{venda.cliente}</TableCell>
                    <TableCell>{formatDate(venda.data)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(venda.valor)}</TableCell>
                    <TableCell>
                      <MetodoPagamento metodo={venda.metodoPagamento} />
                    </TableCell>
                    <TableCell>
                      <StatusVenda status={venda.status} />
                    </TableCell>
                    <TableCell>{venda.vendedor}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar venda</DropdownMenuItem>
                          <DropdownMenuItem>Gerar duplicata</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Cancelar venda
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Nenhuma venda encontrada com os filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Ranking de Vendedores */}
      <Card>
        <CardContent className="p-6">
          <CardTitle className="text-lg mb-4">
            Top Vendedores
            <Button variant="ghost" size="sm" className="float-right">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription className="mb-4">Desempenho dos vendedores no período selecionado</CardDescription>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-[#FFF032] flex items-center justify-center mr-3 text-black font-bold">1</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Carlos Oliveira</span>
                  <span className="font-medium">{formatCurrency(13280)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-[#FFF032] h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3 text-gray-700 dark:text-gray-300 font-bold">2</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Ana Silva</span>
                  <span className="font-medium">{formatCurrency(9350)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gray-500 dark:bg-gray-400 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3 text-gray-700 dark:text-gray-300 font-bold">3</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Mariana Santos</span>
                  <span className="font-medium">{formatCurrency(7500)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gray-500 dark:bg-gray-400 h-2.5 rounded-full" style={{ width: "56%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3 text-gray-700 dark:text-gray-300 font-bold">4</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Pedro Costa</span>
                  <span className="font-medium">{formatCurrency(920)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gray-500 dark:bg-gray-400 h-2.5 rounded-full" style={{ width: "7%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 