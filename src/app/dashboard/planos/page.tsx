"use client";

import { useState } from "react";
import { 
  Check, 
  X, 
  CreditCard, 
  Wallet,
  Shield,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Users,
  FileText,
  Truck,
  Package,
  Settings,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

// Tipos para planos
interface RecursoPlano {
  nome: string;
  descricao?: string;
  incluido: boolean | number | string;
}

interface Plano {
  id: string;
  nome: string;
  descricao: string;
  preco: {
    mensal: number;
    anual: number;
  };
  destaque?: boolean;
  recursos: RecursoPlano[];
  maxUsuarios: number;
  maxProdutos: number;
  suporte: "basico" | "prioritario" | "dedicado";
  modulos: string[];
}

export default function PlanosPage() {
  const [faturamentoAnual, setFaturamentoAnual] = useState(true);
  const [planoAtual] = useState<string>("profissional");

  // Dados de exemplo para planos
  const planos: Plano[] = [
    {
      id: "basico",
      nome: "Básico",
      descricao: "Para pequenos negócios começando a organizar seu inventário",
      preco: {
        mensal: 69.90,
        anual: 59.90
      },
      recursos: [
        { nome: "Gestão básica de estoque", incluido: true },
        { nome: "Cadastro de produtos", incluido: 500 },
        { nome: "Controle de movimentação", incluido: true },
        { nome: "Relatórios básicos", incluido: true },
        { nome: "Alertas de estoque baixo", incluido: true },
        { nome: "Gestão de fornecedores", incluido: "Básico" },
        { nome: "Pedidos de compra", incluido: true },
        { nome: "Previsão de demanda", incluido: false },
        { nome: "API de integração", incluido: false },
        { nome: "Controle de lotes", incluido: false }
      ],
      maxUsuarios: 3,
      maxProdutos: 500,
      suporte: "basico",
      modulos: ["Estoque", "Fornecedores", "Pedidos"]
    },
    {
      id: "profissional",
      nome: "Profissional",
      descricao: "Para empresas em crescimento que precisam de recursos avançados",
      preco: {
        mensal: 129.90,
        anual: 109.90
      },
      destaque: true,
      recursos: [
        { nome: "Gestão básica de estoque", incluido: true },
        { nome: "Cadastro de produtos", incluido: 3000 },
        { nome: "Controle de movimentação", incluido: true },
        { nome: "Relatórios básicos", incluido: true },
        { nome: "Alertas de estoque baixo", incluido: true },
        { nome: "Gestão de fornecedores", incluido: "Completo" },
        { nome: "Pedidos de compra", incluido: true },
        { nome: "Previsão de demanda", incluido: true },
        { nome: "API de integração", incluido: true },
        { nome: "Controle de lotes", incluido: true }
      ],
      maxUsuarios: 10,
      maxProdutos: 3000,
      suporte: "prioritario",
      modulos: ["Estoque", "Fornecedores", "Pedidos", "Relatórios", "API", "Indicações"]
    },
    {
      id: "empresarial",
      nome: "Empresarial",
      descricao: "Para operações complexas que exigem máxima eficiência",
      preco: {
        mensal: 249.90,
        anual: 199.90
      },
      recursos: [
        { nome: "Gestão básica de estoque", incluido: true },
        { nome: "Cadastro de produtos", incluido: "Ilimitado" },
        { nome: "Controle de movimentação", incluido: true },
        { nome: "Relatórios básicos", incluido: true },
        { nome: "Alertas de estoque baixo", incluido: true },
        { nome: "Gestão de fornecedores", incluido: "Avançado" },
        { nome: "Pedidos de compra", incluido: true },
        { nome: "Previsão de demanda", incluido: true },
        { nome: "API de integração", incluido: true },
        { nome: "Controle de lotes", incluido: true }
      ],
      maxUsuarios: 30,
      maxProdutos: 10000,
      suporte: "dedicado",
      modulos: ["Estoque", "Fornecedores", "Pedidos", "Relatórios", "API", "Indicações", "Comercial", "Integrações"]
    }
  ];

  // Encontrar plano atual
  const planoAtualObj = planos.find(p => p.id === planoAtual);

  // Mapeamento de tipos de suporte para textos descritivos
  const descricaoSuporte = {
    basico: "Suporte por email com resposta em até 48h úteis",
    prioritario: "Suporte por email e chat com resposta em até 24h úteis",
    dedicado: "Suporte prioritário por email, chat e telefone com resposta em até 4h úteis"
  };

  // Função para verificar se um plano é melhor que o atual
  const isUpgrade = (planoId: string) => {
    const indices = {
      basico: 0,
      profissional: 1,
      empresarial: 2
    };
    
    return (indices as any)[planoId] > (indices as any)[planoAtual];
  };

  // Função para verificar se um plano é pior que o atual
  const isDowngrade = (planoId: string) => {
    const indices = {
      basico: 0,
      profissional: 1,
      empresarial: 2
    };
    
    return (indices as any)[planoId] < (indices as any)[planoAtual];
  };

  // Função para renderizar o status de um recurso
  const renderRecursoStatus = (incluido: boolean | number | string) => {
    if (typeof incluido === "boolean") {
      return incluido ? 
        <Check className="h-5 w-5 text-green-500" /> : 
        <X className="h-5 w-5 text-red-500" />;
    }
    
    if (typeof incluido === "number") {
      return <span className="text-sm font-medium">{incluido}</span>;
    }
    
    return <span className="text-sm font-medium">{incluido}</span>;
  };

  // Componente para tooltip de informação
  function InfoTooltip({ texto }: { texto: string }) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help inline ml-1" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-sm">{texto}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Planos e Assinaturas</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gerencie seu plano atual e explore outras opções
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
          <span className={`text-sm ${!faturamentoAnual ? 'font-medium text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}>
            Mensal
          </span>
          <Switch
            checked={faturamentoAnual}
            onCheckedChange={setFaturamentoAnual}
          />
          <div>
            <span className={`text-sm ${faturamentoAnual ? 'font-medium text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}>
              Anual
            </span>
            <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Economize 15%
            </Badge>
          </div>
        </div>
      </div>

      {/* Resumo do plano atual */}
      {planoAtualObj && (
        <Card className="border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Seu Plano Atual: {planoAtualObj.nome}</CardTitle>
                <CardDescription className="mt-1">
                  {planoAtualObj.descricao}
                </CardDescription>
              </div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Faturamento
                </div>
                <p className="font-medium">
                  {faturamentoAnual ? "Anual" : "Mensal"} - Próxima cobrança em 15/12/2023
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Usuários
                </div>
                <p className="font-medium">
                  7 de {planoAtualObj.maxUsuarios} disponíveis
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Produtos
                </div>
                <p className="font-medium">
                  1423 de {typeof planoAtualObj.maxProdutos === "string" ? planoAtualObj.maxProdutos : `${planoAtualObj.maxProdutos}`} disponíveis
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {planoAtualObj.modulos.map((modulo, index) => (
                <Badge key={index} variant="secondary">
                  {modulo}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-6 gap-4">
            <div>
              <p className="text-2xl font-bold">
                {formatCurrency(faturamentoAnual ? planoAtualObj.preco.anual : planoAtualObj.preco.mensal)}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  /{faturamentoAnual ? 'mês, cobrado anualmente' : 'mês'}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Histórico de Faturas
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Gerenciar Assinatura
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Tabs para diferentes visualizações */}
      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="cards">Cartões</TabsTrigger>
          <TabsTrigger value="tabela">Tabela Comparativa</TabsTrigger>
        </TabsList>
        
        {/* Visualização em cartões */}
        <TabsContent value="cards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planos.map((plano) => (
              <Card 
                key={plano.id} 
                className={`${plano.destaque ? 'border-primary ring-1 ring-primary/30' : ''} relative`}
              >
                {plano.destaque && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-primary">Mais Popular</Badge>
                  </div>
                )}
                
                {plano.id === planoAtual && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Atual
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle>{plano.nome}</CardTitle>
                  <CardDescription className="min-h-[40px]">{plano.descricao}</CardDescription>
                  
                  <div className="mt-4">
                    <p className="text-3xl font-bold">
                      {formatCurrency(faturamentoAnual ? plano.preco.anual : plano.preco.mensal)}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        /mês
                      </span>
                    </p>
                    {faturamentoAnual && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Cobrança anual de {formatCurrency(plano.preco.anual * 12)}
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm font-medium">Inclui:</p>
                  <ul className="space-y-2">
                    {plano.recursos.slice(0, 6).map((recurso, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-0.5">
                          {typeof recurso.incluido === 'boolean' && recurso.incluido ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : typeof recurso.incluido === 'boolean' && !recurso.incluido ? (
                            <X className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                          ) : (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                        </span>
                        <span className="text-sm">
                          {recurso.nome}
                          {typeof recurso.incluido !== 'boolean' && (
                            <span className="font-medium"> ({recurso.incluido})</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-2">
                    <p className="text-sm flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Até {plano.maxUsuarios} usuários</span>
                    </p>
                    <p className="text-sm flex items-center mt-2">
                      <Shield className="h-4 w-4 mr-2" />
                      <span>{(descricaoSuporte as any)[plano.suporte]}</span>
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  {plano.id === planoAtual ? (
                    <Button className="w-full" disabled>
                      Plano Atual
                    </Button>
                  ) : isUpgrade(plano.id) ? (
                    <Button className="w-full">
                      Fazer Upgrade
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      Fazer Downgrade
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
            Precisa de um plano personalizado para sua empresa? 
            <Button variant="link" className="px-1.5 text-primary">Entre em contato com nosso time comercial</Button>
          </p>
        </TabsContent>
        
        {/* Visualização em tabela */}
        <TabsContent value="tabela" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[280px]">Recurso</TableHead>
                      {planos.map((plano) => (
                        <TableHead 
                          key={plano.id} 
                          className={`text-center ${plano.id === planoAtual ? 'bg-primary/5' : ''}`}
                        >
                          <div className="font-medium">{plano.nome}</div>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {formatCurrency(faturamentoAnual ? plano.preco.anual : plano.preco.mensal)}/mês
                          </div>
                          {plano.id === planoAtual && (
                            <Badge variant="outline" className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Plano Atual
                            </Badge>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Recursos principais */}
                    <TableRow>
                      <TableCell className="font-medium" colSpan={4}>
                        Recursos Principais
                      </TableCell>
                    </TableRow>
                    
                    {planos[0].recursos.map((recurso, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {recurso.nome}
                          {recurso.descricao && (
                            <InfoTooltip texto={recurso.descricao} />
                          )}
                        </TableCell>
                        {planos.map((plano) => (
                          <TableCell key={plano.id} className={`text-center ${plano.id === planoAtual ? 'bg-primary/5' : ''}`}>
                            {renderRecursoStatus(plano.recursos[index].incluido)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                    
                    {/* Limites */}
                    <TableRow>
                      <TableCell className="font-medium" colSpan={4}>
                        Limites
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">
                        Usuários
                      </TableCell>
                      {planos.map((plano) => (
                        <TableCell key={plano.id} className={`text-center ${plano.id === planoAtual ? 'bg-primary/5' : ''}`}>
                          <span className="font-medium">{plano.maxUsuarios}</span>
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">
                        Produtos
                      </TableCell>
                      {planos.map((plano) => (
                        <TableCell key={plano.id} className={`text-center ${plano.id === planoAtual ? 'bg-primary/5' : ''}`}>
                          <span className="font-medium">{plano.maxProdutos}</span>
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Suporte */}
                    <TableRow>
                      <TableCell className="font-medium">
                        Suporte
                      </TableCell>
                      {planos.map((plano) => (
                        <TableCell key={plano.id} className={`text-center ${plano.id === planoAtual ? 'bg-primary/5' : ''}`}>
                          <span className="font-medium capitalize">{plano.suporte}</span>
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Ações */}
                    <TableRow>
                      <TableCell className="font-medium">
                        Ação
                      </TableCell>
                      {planos.map((plano) => (
                        <TableCell key={plano.id} className={`text-center ${plano.id === planoAtual ? 'bg-primary/5' : ''}`}>
                          {plano.id === planoAtual ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Plano Atual
                            </Badge>
                          ) : isUpgrade(plano.id) ? (
                            <Button size="sm">
                              Fazer Upgrade
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              Fazer Downgrade
                            </Button>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF Comparativo
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Perguntas Frequentes */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Perguntas Frequentes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Como posso fazer upgrade do meu plano?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Você pode fazer upgrade do seu plano a qualquer momento através desta página. 
                Ao fazer o upgrade, a cobrança será proporcional ao período restante da sua assinatura atual.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Posso fazer downgrade do meu plano?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sim, mas o downgrade será aplicado apenas no próximo ciclo de faturamento. 
                Não há reembolso para períodos pagos antecipadamente ao fazer downgrade.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Como funciona o período de cobrança anual?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No faturamento anual, você recebe um desconto de 15% em comparação ao pagamento mensal.
                O valor é cobrado uma vez por ano, e você pode alterar para faturamento mensal a qualquer 
                momento para o próximo ciclo.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">O que acontece se eu exceder os limites do meu plano?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Se você exceder o limite de usuários ou produtos, receberá notificações recomendando 
                o upgrade. Você poderá continuar usando o sistema, mas recomendamos fazer o upgrade 
                para garantir o melhor desempenho.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 