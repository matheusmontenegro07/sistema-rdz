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
  Star, 
  StarOff,
  ChevronDown,
  ChevronUp,
  Download
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
import { formatDate } from "@/lib/utils";

// Tipo para fornecedor
interface Fornecedor {
  id: string;
  nome: string;
  categoria: string;
  contato: string;
  telefone: string;
  email: string;
  status: "ativo" | "inativo" | "pendente";
  favorito: boolean;
  ultimaCompra: string | null;
  avaliacao: number;
}

// Componente de Ações para cada fornecedor
function AcoesFornecedor({ fornecedor }: { fornecedor: Fornecedor }) {
  const [favorito, setFavorito] = useState(fornecedor.favorito);

  const toggleFavorito = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorito(!favorito);
  };

  return (
    <div className="flex items-center justify-end">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFavorito}
        className="h-8 w-8 mr-1"
        aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {favorito ? (
          <Star className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarOff className="h-4 w-4 text-gray-400" />
        )}
      </Button>
      
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

// Componente de Status do fornecedor
function StatusFornecedor({ status }: { status: Fornecedor["status"] }) {
  const statusConfig = {
    ativo: {
      label: "Ativo",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    },
    inativo: {
      label: "Inativo",
      className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    },
    pendente: {
      label: "Pendente",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

// Componente de Avaliação com estrelas
function Avaliacao({ valor }: { valor: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((estrela) => (
        <Star
          key={estrela}
          className={`h-4 w-4 ${
            estrela <= valor
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export default function Fornecedores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Fornecedor | null;
    direction: "asc" | "desc";
  }>({ key: "nome", direction: "asc" });

  // Dados mockados de fornecedores
  const fornecedoresMock: Fornecedor[] = [
    {
      id: "1",
      nome: "Distribuidora ABC",
      categoria: "Farinhas e Grãos",
      contato: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao@distribuidoraabc.com.br",
      status: "ativo",
      favorito: true,
      ultimaCompra: "2023-11-15",
      avaliacao: 4
    },
    {
      id: "2",
      nome: "Laticínios XYZ",
      categoria: "Laticínios",
      contato: "Maria Oliveira",
      telefone: "(11) 91234-5678",
      email: "maria@laticiniosxyz.com.br",
      status: "ativo",
      favorito: false,
      ultimaCompra: "2023-11-20",
      avaliacao: 5
    },
    {
      id: "3",
      nome: "Açúcar & Cia",
      categoria: "Açúcares e Adoçantes",
      contato: "Pedro Santos",
      telefone: "(11) 92345-6789",
      email: "pedro@acucarecia.com.br",
      status: "inativo",
      favorito: false,
      ultimaCompra: "2023-10-05",
      avaliacao: 3
    },
    {
      id: "4",
      nome: "Embalagens Rápidas",
      categoria: "Embalagens",
      contato: "Ana Costa",
      telefone: "(11) 93456-7890",
      email: "ana@embalagensrapidas.com.br",
      status: "ativo",
      favorito: true,
      ultimaCompra: "2023-11-18",
      avaliacao: 4
    },
    {
      id: "5",
      nome: "Frutas Frescas",
      categoria: "Frutas",
      contato: "Carlos Mendes",
      telefone: "(11) 94567-8901",
      email: "carlos@frutasfrescas.com.br",
      status: "pendente",
      favorito: false,
      ultimaCompra: null,
      avaliacao: 0
    },
    {
      id: "6",
      nome: "Ovos Orgânicos",
      categoria: "Ovos",
      contato: "Fernanda Lima",
      telefone: "(11) 95678-9012",
      email: "fernanda@ovosorganicos.com.br",
      status: "ativo",
      favorito: false,
      ultimaCompra: "2023-11-10",
      avaliacao: 5
    },
    {
      id: "7",
      nome: "Chocolates Premium",
      categoria: "Chocolates",
      contato: "Roberto Alves",
      telefone: "(11) 96789-0123",
      email: "roberto@chocolatespremium.com.br",
      status: "ativo",
      favorito: true,
      ultimaCompra: "2023-11-22",
      avaliacao: 5
    }
  ];

  // Lista de categorias únicas para o filtro
  const categorias = Array.from(
    new Set(fornecedoresMock.map((f) => f.categoria))
  );

  // Função para ordenar fornecedores
  const handleSort = (key: keyof Fornecedor) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    
    setSortConfig({ key, direction });
  };

  // Função para renderizar o ícone de ordenação
  const renderSortIcon = (key: keyof Fornecedor) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 opacity-50" />;
    }
    
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Filtragem e ordenação dos fornecedores
  const fornecedoresFiltrados = fornecedoresMock
    .filter((fornecedor) => {
      // Filtro de busca
      const matchesSearch = fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fornecedor.contato.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de status
      const matchesStatus = statusFilter === "todos" || fornecedor.status === statusFilter;
      
      // Filtro de categoria
      const matchesCategoria = categoriaFilter === "todas" || fornecedor.categoria === categoriaFilter;
      
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Fornecedores</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Fornecedor</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo fornecedor abaixo.
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

      {/* Filtros e busca */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar fornecedor..."
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
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
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
          {fornecedoresFiltrados.length} fornecedores encontrados
        </div>
      </div>

      {/* Tabela de fornecedores */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableHead>Contato</TableHead>
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
                  onClick={() => handleSort("ultimaCompra")}
                >
                  <div className="flex items-center">
                    Última Compra
                    {renderSortIcon("ultimaCompra")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("avaliacao")}
                >
                  <div className="flex items-center">
                    Avaliação
                    {renderSortIcon("avaliacao")}
                  </div>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fornecedoresFiltrados.length > 0 ? (
                fornecedoresFiltrados.map((fornecedor, index) => (
                  <motion.tr
                    key={fornecedor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <TableCell className="font-medium">{fornecedor.nome}</TableCell>
                    <TableCell>{fornecedor.categoria}</TableCell>
                    <TableCell>
                      <div>
                        <div>{fornecedor.contato}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{fornecedor.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusFornecedor status={fornecedor.status} />
                    </TableCell>
                    <TableCell>
                      {fornecedor.ultimaCompra 
                        ? formatDate(fornecedor.ultimaCompra) 
                        : <span className="text-gray-400">Nunca</span>}
                    </TableCell>
                    <TableCell>
                      <Avaliacao valor={fornecedor.avaliacao} />
                    </TableCell>
                    <TableCell>
                      <AcoesFornecedor fornecedor={fornecedor} />
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Nenhum fornecedor encontrado com os filtros aplicados.
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