"use client";

import { useState } from "react";
import { 
  User, 
  Bell, 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Save,
  Moon,
  Sun,
  FileText,
  Mail,
  Phone,
  Building,
  Image,
  Upload,
  ChevronDown,
  Check
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Configuracoes() {
  // Estados para os diferentes formulários
  const [perfilForm, setPerfilForm] = useState({
    nome: "João Silva",
    email: "joao.silva@reduzo.com.br",
    telefone: "(11) 98765-4321",
    cargo: "Gerente de Compras"
  });
  
  const handleSave = () => {
    console.log("Salvando configurações...");
    // Aqui seria implementada a lógica de salvamento das configurações
  };

  // Configurações mockadas de notificações
  const [notificacoes, setNotificacoes] = useState({
    estoqueMinimo: true,
    novoPedido: true,
    pedidoAprovado: true,
    pedidoEntregue: true,
    produtoVencimento: true,
    relatorioPronto: false,
    emailPedido: true,
    emailEstoque: false
  });

  // Configurações mockadas de empresa
  const [empresa, setEmpresa] = useState({
    nome: "Padaria Modelo Ltda.",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua das Flores, 123 - Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    telefone: "(11) 1234-5678",
    email: "contato@padariamodelo.com.br",
    site: "www.padariamodelo.com.br"
  });

  // Configurações mockadas de aparência
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState("medio");
  const [corPrimaria, setCorPrimaria] = useState("amarelo");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="perfil" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="empresa" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="aparencia" className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="sistema" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Sistema</span>
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da aba Perfil */}
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Alterar Foto
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome" 
                    value={perfilForm.nome}
                    onChange={(e) => setPerfilForm({...perfilForm, nome: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={perfilForm.email}
                    onChange={(e) => setPerfilForm({...perfilForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone" 
                    value={perfilForm.telefone}
                    onChange={(e) => setPerfilForm({...perfilForm, telefone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input 
                    id="cargo" 
                    value={perfilForm.cargo}
                    onChange={(e) => setPerfilForm({...perfilForm, cargo: e.target.value})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Alterar Senha</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input id="senha-atual" type="password" placeholder="Senha atual" />
                  <Input id="nova-senha" type="password" placeholder="Nova senha" />
                  <Input id="confirmar-senha" type="password" placeholder="Confirmar nova senha" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Perfil</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Notificações */}
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>
                Configure como e quando deseja receber alertas e notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações do Sistema</h3>
                
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="estoque-minimo">Alerta de Estoque Mínimo</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba alertas quando itens atingirem o estoque mínimo
                      </p>
                    </div>
                    <Switch 
                      id="estoque-minimo" 
                      checked={notificacoes.estoqueMinimo}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, estoqueMinimo: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="novo-pedido">Novo Pedido</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba alertas quando um novo pedido for cadastrado
                      </p>
                    </div>
                    <Switch 
                      id="novo-pedido" 
                      checked={notificacoes.novoPedido}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, novoPedido: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pedido-aprovado">Pedido Aprovado</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba alertas quando um pedido for aprovado
                      </p>
                    </div>
                    <Switch 
                      id="pedido-aprovado" 
                      checked={notificacoes.pedidoAprovado}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, pedidoAprovado: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pedido-entregue">Pedido Entregue</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba alertas quando um pedido for entregue
                      </p>
                    </div>
                    <Switch 
                      id="pedido-entregue" 
                      checked={notificacoes.pedidoEntregue}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, pedidoEntregue: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="produto-vencimento">Produtos próximos ao vencimento</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba alertas sobre produtos prestes a vencer
                      </p>
                    </div>
                    <Switch 
                      id="produto-vencimento" 
                      checked={notificacoes.produtoVencimento}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, produtoVencimento: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="relatorio-pronto">Relatório Pronto</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba alertas quando um relatório solicitado estiver pronto
                      </p>
                    </div>
                    <Switch 
                      id="relatorio-pronto" 
                      checked={notificacoes.relatorioPronto}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, relatorioPronto: checked})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações por Email</h3>
                
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-pedido">Resumo de Pedidos</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba um resumo diário dos pedidos realizados
                      </p>
                    </div>
                    <Switch 
                      id="email-pedido" 
                      checked={notificacoes.emailPedido}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, emailPedido: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-estoque">Relatório de Estoque</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba um relatório semanal do status do estoque
                      </p>
                    </div>
                    <Switch 
                      id="email-estoque" 
                      checked={notificacoes.emailEstoque}
                      onCheckedChange={(checked) => setNotificacoes({...notificacoes, emailEstoque: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Empresa */}
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>
                Configure as informações da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="h-32 w-32 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Image className="h-12 w-12 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Alterar Logo
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa-nome">Nome da Empresa</Label>
                  <Input 
                    id="empresa-nome" 
                    value={empresa.nome}
                    onChange={(e) => setEmpresa({...empresa, nome: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa-cnpj">CNPJ</Label>
                  <Input 
                    id="empresa-cnpj" 
                    value={empresa.cnpj}
                    onChange={(e) => setEmpresa({...empresa, cnpj: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa-endereco">Endereço</Label>
                  <Input 
                    id="empresa-endereco" 
                    value={empresa.endereco}
                    onChange={(e) => setEmpresa({...empresa, endereco: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="empresa-cidade">Cidade</Label>
                    <Input 
                      id="empresa-cidade" 
                      value={empresa.cidade}
                      onChange={(e) => setEmpresa({...empresa, cidade: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa-estado">Estado</Label>
                    <Input 
                      id="empresa-estado" 
                      value={empresa.estado}
                      onChange={(e) => setEmpresa({...empresa, estado: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa-cep">CEP</Label>
                  <Input 
                    id="empresa-cep" 
                    value={empresa.cep}
                    onChange={(e) => setEmpresa({...empresa, cep: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa-telefone">Telefone</Label>
                  <Input 
                    id="empresa-telefone" 
                    value={empresa.telefone}
                    onChange={(e) => setEmpresa({...empresa, telefone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa-email">Email</Label>
                  <Input 
                    id="empresa-email" 
                    type="email"
                    value={empresa.email}
                    onChange={(e) => setEmpresa({...empresa, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa-site">Site</Label>
                  <Input 
                    id="empresa-site" 
                    value={empresa.site}
                    onChange={(e) => setEmpresa({...empresa, site: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Dados da Empresa</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Aparência */}
        <TabsContent value="aparencia">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Aparência</CardTitle>
              <CardDescription>
                Personalize a interface do sistema conforme sua preferência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tema</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Escolha entre tema claro ou escuro
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={!temaEscuro ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => setTemaEscuro(false)}
                    >
                      <Sun className="h-4 w-4" />
                      <span>Claro</span>
                      {!temaEscuro && <Check className="h-3 w-3 ml-1" />}
                    </Button>
                    <Button
                      variant={temaEscuro ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => setTemaEscuro(true)}
                    >
                      <Moon className="h-4 w-4" />
                      <span>Escuro</span>
                      {temaEscuro && <Check className="h-3 w-3 ml-1" />}
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="tamanho-fonte">Tamanho da Fonte</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ajuste o tamanho do texto para melhor visualização
                    </p>
                  </div>
                  <Select
                    value={tamanhoFonte}
                    onValueChange={setTamanhoFonte}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pequeno">Pequeno</SelectItem>
                      <SelectItem value="medio">Médio (Padrão)</SelectItem>
                      <SelectItem value="grande">Grande</SelectItem>
                      <SelectItem value="muito-grande">Muito Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cor-primaria">Cor Principal</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Escolha a cor principal da interface
                    </p>
                  </div>
                  <Select
                    value={corPrimaria}
                    onValueChange={setCorPrimaria}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione a cor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amarelo">Amarelo (Padrão)</SelectItem>
                      <SelectItem value="azul">Azul</SelectItem>
                      <SelectItem value="verde">Verde</SelectItem>
                      <SelectItem value="vermelho">Vermelho</SelectItem>
                      <SelectItem value="roxo">Roxo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Previsualização</Label>
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Exemplo de Cabeçalho</h4>
                      <Button size="sm" className={`bg-[#FFF032] hover:bg-[#FFF032]/90 text-black`}>
                        Ação
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Este é um exemplo de como o texto e os elementos ficarão com as configurações atuais.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="bg-[#FFF032] h-4 w-4 rounded-full"></div>
                      <span className="text-sm">Cor primária</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Aplicar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Sistema */}
        <TabsContent value="sistema">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Usuários e Permissões
                </CardTitle>
                <CardDescription>
                  Gerencie usuários e níveis de acesso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gerencie os usuários do sistema e defina níveis de acesso personalizados para cada função.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Gerenciar Usuários
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Configure aspectos de segurança
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação em Duas Etapas</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Requer verificação adicional ao fazer login
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Expiração de Sessão</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Encerrar sessão após período de inatividade
                      </p>
                    </div>
                    <Select defaultValue="30min">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15min">15 minutos</SelectItem>
                        <SelectItem value="30min">30 minutos</SelectItem>
                        <SelectItem value="1h">1 hora</SelectItem>
                        <SelectItem value="4h">4 horas</SelectItem>
                        <SelectItem value="nunca">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configurações Avançadas
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Backup e Restauração
                </CardTitle>
                <CardDescription>
                  Gerencie backups dos dados do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Criar backups automáticos periodicamente
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Frequência de Backup</Label>
                    </div>
                    <Select defaultValue="diario">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">
                  Backup Manual
                </Button>
                <Button variant="outline" className="w-full">
                  Restaurar Backup
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Logs e Histórico
                </CardTitle>
                <CardDescription>
                  Visualize logs e atividades do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Acompanhe as atividades e alterações realizadas no sistema.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    <span>Login - Usuário: João Silva</span>
                    <span className="text-gray-500">Hoje, 10:45</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    <span>Relatório gerado: Vendas Mensais</span>
                    <span className="text-gray-500">Hoje, 09:30</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    <span>Alteração de estoque: Item #1234</span>
                    <span className="text-gray-500">Ontem, 16:20</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver Histórico Completo
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Laptop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
      <line x1="2" x2="22" y1="20" y2="20" />
    </svg>
  );
} 