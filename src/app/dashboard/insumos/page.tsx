"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  PlusCircle, 
  Filter, 
  Package2, 
  AlertTriangle, 
  ShoppingCart, 
  Barcode, 
  Edit, 
  Trash2, 
  ChevronDown, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  PieChart, 
  Download, 
  Upload
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Insumos() {
  const [search, setSearch] = useState("");
  const [filtros, setFiltros] = useState({
    nome: "",
    categoria: "",
    fornecedor: "",
    homologado: "",
    estoque: ""
  });
  const [openModal, setOpenModal] = useState(false);

  // Dados simulados de insumos
  const insumos = [
    {
      id: 1,
      codigo: "123456789",
      nome: "Queijo Muçarela",
      categoria: "Laticínios",
      unidade: "Kg",
      estoqueAtual: 15,
      estoqueMinimo: 5,
      fornecedor: "Laticínios Boa Vista",
      homologado: true,
      preco: 32.50
    },
    {
      id: 2,
      codigo: "987654321",
      nome: "Presunto",
      categoria: "Frios",
      unidade: "Kg",
      estoqueAtual: 8,
      estoqueMinimo: 10,
      fornecedor: "Frigorífico Sul",
      homologado: true,
      preco: 28.75
    },
    {
      id: 3,
      codigo: "456789123",
      nome: "Farinha de Trigo",
      categoria: "Secos",
      unidade: "Kg",
      estoqueAtual: 25,
      estoqueMinimo: 20,
      fornecedor: "Distribuidora Alimentos",
      homologado: false,
      preco: 5.90
    },
    {
      id: 4,
      codigo: "321654987",
      nome: "Tomate",
      categoria: "Hortifruti",
      unidade: "Kg",
      estoqueAtual: 3,
      estoqueMinimo: 10,
      fornecedor: "Hortifruti Produtos Frescos",
      homologado: false,
      preco: 8.50
    },
    {
      id: 5,
      codigo: "789123456",
      nome: "Óleo de Soja",
      categoria: "Óleos",
      unidade: "L",
      estoqueAtual: 12,
      estoqueMinimo: 8,
      fornecedor: "Distribuidora Alimentos",
      homologado: true,
      preco: 7.90
    }
  ];

  // Categorias disponíveis
  const categorias = ["Laticínios", "Frios", "Secos", "Hortifruti", "Óleos", "Carnes", "Bebidas", "Embalagens"];
  
  // Fornecedores disponíveis
  const fornecedores = ["Laticínios Boa Vista", "Frigorífico Sul", "Distribuidora Alimentos", "Hortifruti Produtos Frescos"];

  // Dados simulados para estatísticas
  const estatisticas = {
    totalInsumos: 124,
    insumosHomologados: 87,
    insumosEmEstoque: 105,
    insumosEstoqueBaixo: 19,
    itensSemMovimento: 8
  };

  // Dados simulados para insumos mais utilizados
  const insumosUtilizados = [
    { nome: "Farinha de Trigo", usos: 42 },
    { nome: "Queijo Muçarela", usos: 38 },
    { nome: "Tomate", usos: 35 },
    { nome: "Óleo de Soja", usos: 28 },
    { nome: "Presunto", usos: 25 }
  ];

  // Dados simulados para alertas
  const alertasEstoque = [
    { id: 1, nome: "Tomate", estoqueAtual: 3, estoqueMinimo: 10 },
    { id: 2, nome: "Presunto", estoqueAtual: 8, estoqueMinimo: 10 },
    { id: 3, nome: "Cebola", estoqueAtual: 2, estoqueMinimo: 8 },
    { id: 4, nome: "Pimentão", estoqueAtual: 1, estoqueMinimo: 5 }
  ];

  const insumosFiltered = insumos.filter(insumo => 
    insumo.nome.toLowerCase().includes(search.toLowerCase()) ||
    insumo.codigo.includes(search)
  );

  // Função para determinar a cor do indicador de estoque
  const getEstoqueColor = (atual: number, minimo: number) => {
    if (atual < minimo) return "bg-red-500";
    if (atual < minimo * 1.2) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Função para determinar o status do estoque
  const getEstoqueStatus = (atual: number, minimo: number) => {
    if (atual < minimo) return "Crítico";
    if (atual < minimo * 1.2) return "Insuficiente";
    return "Disponível";
  };

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Insumos</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou código"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Insumo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Insumo</DialogTitle>
                <DialogDescription>
                  Preencha os dados do insumo para cadastrá-lo no sistema.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código de Barras</Label>
                  <div className="flex">
                    <Input id="codigo" placeholder="Digite ou escaneie o código" />
                    <Button variant="outline" className="ml-2">
                      <Barcode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Produto</Label>
                  <Input id="nome" placeholder="Nome do insumo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unidade">Unidade de Medida</Label>
                  <Select>
                    <SelectTrigger id="unidade">
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kg">Kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="Un">Un</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estoque-atual">Estoque Atual</Label>
                  <Input id="estoque-atual" type="number" min="0" placeholder="0" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estoque-minimo">Estoque Mínimo</Label>
                  <Input id="estoque-minimo" type="number" min="0" placeholder="0" />
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="homologado">Produto Homologado</Label>
                    <Switch id="homologado" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Se habilitado, apenas um fornecedor poderá ser selecionado.
                  </p>
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="fornecedor">Fornecedor</Label>
                  <Select>
                    <SelectTrigger id="fornecedor">
                      <SelectValue placeholder="Selecione o fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {fornecedores.map((fornecedor) => (
                        <SelectItem key={fornecedor} value={fornecedor}>{fornecedor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenModal(false)}>Cancelar</Button>
                <Button onClick={() => setOpenModal(false)}>Salvar Insumo</Button>
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
                <div className="space-y-2 mb-2">
                  <Label htmlFor="filtro-categoria">Categoria</Label>
                  <Select value={filtros.categoria} onValueChange={(value) => setFiltros({...filtros, categoria: value})}>
                    <SelectTrigger id="filtro-categoria">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 mb-2">
                  <Label htmlFor="filtro-fornecedor">Fornecedor</Label>
                  <Select value={filtros.fornecedor} onValueChange={(value) => setFiltros({...filtros, fornecedor: value})}>
                    <SelectTrigger id="filtro-fornecedor">
                      <SelectValue placeholder="Todos os fornecedores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os fornecedores</SelectItem>
                      {fornecedores.map((fornecedor) => (
                        <SelectItem key={fornecedor} value={fornecedor}>{fornecedor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 mb-2">
                  <Label htmlFor="filtro-homologado">Status de Homologação</Label>
                  <Select value={filtros.homologado} onValueChange={(value) => setFiltros({...filtros, homologado: value})}>
                    <SelectTrigger id="filtro-homologado">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os status</SelectItem>
                      <SelectItem value="true">Homologado</SelectItem>
                      <SelectItem value="false">Não homologado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filtro-estoque">Status de Estoque</Label>
                  <Select value={filtros.estoque} onValueChange={(value) => setFiltros({...filtros, estoque: value})}>
                    <SelectTrigger id="filtro-estoque">
                      <SelectValue placeholder="Todos os níveis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os níveis</SelectItem>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="insuficiente">Insuficiente</SelectItem>
                      <SelectItem value="critico">Crítico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setFiltros({
                  nome: "",
                  categoria: "",
                  fornecedor: "",
                  homologado: "",
                  estoque: ""
                })}>
                  Limpar Filtros
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Insumos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalInsumos}</div>
            <p className="text-xs text-muted-foreground">
              Insumos cadastrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Insumos Homologados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.insumosHomologados}</div>
            <p className="text-xs text-muted-foreground">
              {((estatisticas.insumosHomologados / estatisticas.totalInsumos) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Insumos em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.insumosEmEstoque}</div>
            <p className="text-xs text-muted-foreground">
              {((estatisticas.insumosEmEstoque / estatisticas.totalInsumos) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{estatisticas.insumosEstoqueBaixo}</div>
            <p className="text-xs text-muted-foreground">
              Abaixo do estoque mínimo
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sem Movimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{estatisticas.itensSemMovimento}</div>
            <p className="text-xs text-muted-foreground">
              Mais de 30 dias sem uso
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="todos">Todos os Insumos</TabsTrigger>
              <TabsTrigger value="homologados">Homologados</TabsTrigger>
              <TabsTrigger value="estoque-baixo">Estoque Baixo</TabsTrigger>
            </TabsList>
            <TabsContent value="todos" className="border rounded-md">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Un.</TableHead>
                      <TableHead>Estoque Atual</TableHead>
                      <TableHead>Estoque Mínimo</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Homologado</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insumosFiltered.map((insumo) => (
                      <TableRow key={insumo.id}>
                        <TableCell className="font-mono text-sm">{insumo.codigo}</TableCell>
                        <TableCell className="font-medium">{insumo.nome}</TableCell>
                        <TableCell>{insumo.categoria}</TableCell>
                        <TableCell>{insumo.unidade}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-2 w-2 rounded-full mr-2 ${getEstoqueColor(insumo.estoqueAtual, insumo.estoqueMinimo)}`}></div>
                            {insumo.estoqueAtual}
                          </div>
                        </TableCell>
                        <TableCell>{insumo.estoqueMinimo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{insumo.fornecedor}</Badge>
                        </TableCell>
                        <TableCell>
                          {insumo.homologado ? (
                            <div className="flex items-center text-green-600">
                              <Lock className="h-4 w-4 mr-1" />
                              <span className="text-xs">Sim</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-500">
                              <Unlock className="h-4 w-4 mr-1" />
                              <span className="text-xs">Não</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="homologados" className="border rounded-md">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Un.</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insumosFiltered.filter(i => i.homologado).map((insumo) => (
                      <TableRow key={insumo.id}>
                        <TableCell className="font-mono text-sm">{insumo.codigo}</TableCell>
                        <TableCell className="font-medium">{insumo.nome}</TableCell>
                        <TableCell>{insumo.categoria}</TableCell>
                        <TableCell>{insumo.unidade}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-2 w-2 rounded-full mr-2 ${getEstoqueColor(insumo.estoqueAtual, insumo.estoqueMinimo)}`}></div>
                            {insumo.estoqueAtual}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{insumo.fornecedor}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="estoque-baixo" className="border rounded-md">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Estoque Atual</TableHead>
                      <TableHead>Estoque Mínimo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insumosFiltered.filter(i => i.estoqueAtual < i.estoqueMinimo).map((insumo) => (
                      <TableRow key={insumo.id}>
                        <TableCell className="font-mono text-sm">{insumo.codigo}</TableCell>
                        <TableCell className="font-medium">{insumo.nome}</TableCell>
                        <TableCell>{insumo.categoria}</TableCell>
                        <TableCell className="text-red-500 font-semibold">{insumo.estoqueAtual}</TableCell>
                        <TableCell>{insumo.estoqueMinimo}</TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="bg-red-100 hover:bg-red-100 text-red-800 border-red-200">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Crítico
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm" className="h-8">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Comprar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Itens Mais Utilizados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {insumosUtilizados.map((insumo, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{insumo.nome}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary">{insumo.usos} usos</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Estoque Insuficiente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alertasEstoque.map((alerta) => (
                  <div key={alerta.id} className="pb-2 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{alerta.nome}</span>
                      <Badge variant="destructive" className="bg-red-100 hover:bg-red-100 text-red-800 border-red-200">
                        {alerta.estoqueAtual} de {alerta.estoqueMinimo}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-red-500 h-1.5 rounded-full" 
                        style={{ width: `${(alerta.estoqueAtual / alerta.estoqueMinimo) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Pedido
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-500" />
                Insumos por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <div className="text-center text-muted-foreground text-sm">
                  Gráfico de distribuição por categoria
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Importação/Exportação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Insumos
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Insumos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 