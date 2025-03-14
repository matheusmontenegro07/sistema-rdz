"use client";

import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  Package2,
  Building,
  ChevronDown,
  Edit,
  Trash2,
  Download,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dados simulados
const ordens = [
  {
    id: "OC-2024-001",
    data: "2024-03-14",
    status: "pendente",
    fornecedor: "Distribuidora Alimentos",
    itens: 12,
    valorEstimado: 2500.50,
    prazo: "2024-03-20",
    responsavel: "João Silva"
  },
  {
    id: "OC-2024-002",
    data: "2024-03-13",
    status: "enviada",
    fornecedor: "Frigorífico Sul",
    itens: 8,
    valorEstimado: 1800.75,
    prazo: "2024-03-19",
    responsavel: "Maria Santos"
  },
  {
    id: "OC-2024-003",
    data: "2024-03-12",
    status: "respondida",
    fornecedor: "Hortifruti Produtos Frescos",
    itens: 15,
    valorEstimado: 3200.00,
    prazo: "2024-03-18",
    responsavel: "Pedro Costa"
  }
];

const estatisticas = {
  totalOrdens: 45,
  ordensAbertas: 12,
  ordensRespondidas: 28,
  ordensConcluidas: 5,
  economiaTotal: 12500.75
};

export default function OrdemCotacao() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  // Função para formatar datas
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  // Função para retornar a cor do status
  const getStatusColor = (status: string) => {
    const colors = {
      pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      enviada: "bg-blue-100 text-blue-800 border-blue-200",
      respondida: "bg-green-100 text-green-800 border-green-200",
      concluida: "bg-gray-100 text-gray-800 border-gray-200",
      cancelada: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status as keyof typeof colors] || colors.pendente;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Ordens de Cotação</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ordem de cotação"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Nova Ordem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Nova Ordem de Cotação</DialogTitle>
                <DialogDescription>
                  Crie uma nova ordem de cotação para enviar aos fornecedores.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fornecedor">Fornecedor</Label>
                  <Select>
                    <SelectTrigger id="fornecedor">
                      <SelectValue placeholder="Selecione o fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dist-alimentos">Distribuidora Alimentos</SelectItem>
                      <SelectItem value="frig-sul">Frigorífico Sul</SelectItem>
                      <SelectItem value="hortifruti">Hortifruti Produtos Frescos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prazo">Prazo para Resposta</Label>
                  <Input type="date" id="prazo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Input id="responsavel" placeholder="Nome do responsável" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Input id="observacoes" placeholder="Observações adicionais" />
                </div>
              </div>

              <div className="mt-4">
                <Label>Itens para Cotação</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Observação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="item1">Queijo Muçarela</SelectItem>
                            <SelectItem value="item2">Presunto</SelectItem>
                            <SelectItem value="item3">Farinha de Trigo</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0" className="w-20" />
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Un." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kg</SelectItem>
                            <SelectItem value="un">Un</SelectItem>
                            <SelectItem value="cx">Cx</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Observação do item" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button variant="outline" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setOpenModal(false)}>
                  Criar Ordem
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="enviada">Enviada</SelectItem>
                      <SelectItem value="respondida">Respondida</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Ordens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalOrdens}</div>
            <p className="text-xs text-muted-foreground">
              Ordens criadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ordens Abertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{estatisticas.ordensAbertas}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando envio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Respondidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estatisticas.ordensRespondidas}</div>
            <p className="text-xs text-muted-foreground">
              Com cotações recebidas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.ordensConcluidas}</div>
            <p className="text-xs text-muted-foreground">
              Processo finalizado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(estatisticas.economiaTotal)}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor economizado
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="enviadas">Enviadas</TabsTrigger>
          <TabsTrigger value="respondidas">Respondidas</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº da Ordem</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Valor Estimado</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordens.map((ordem) => (
                <TableRow key={ordem.id}>
                  <TableCell className="font-medium">{ordem.id}</TableCell>
                  <TableCell>{formatDate(ordem.data)}</TableCell>
                  <TableCell>{ordem.fornecedor}</TableCell>
                  <TableCell>{ordem.itens}</TableCell>
                  <TableCell>{formatCurrency(ordem.valorEstimado)}</TableCell>
                  <TableCell>{formatDate(ordem.prazo)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ordem.status)}>
                      {ordem.status.charAt(0).toUpperCase() + ordem.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{ordem.responsavel}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="pendentes">
          {/* Conteúdo similar para ordens pendentes */}
        </TabsContent>

        <TabsContent value="enviadas">
          {/* Conteúdo similar para ordens enviadas */}
        </TabsContent>

        <TabsContent value="respondidas">
          {/* Conteúdo similar para ordens respondidas */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 