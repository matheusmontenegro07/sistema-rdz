"use client";

import { useState } from "react";
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  Download, 
  Calendar, 
  Filter, 
  FileText,
  Printer,
  Share2,
  ChevronDown,
  ArrowDownToLine,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

// Componente de Card de Relatório
function RelatorioCard({ 
  titulo, 
  descricao, 
  icon: Icon, 
  ultimaGeracao,
  onClick 
}: { 
  titulo: string; 
  descricao: string; 
  icon: any; 
  ultimaGeracao: string;
  onClick: () => void;
}) {
  return (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{titulo}</CardTitle>
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CardDescription>{descricao}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Última geração: {ultimaGeracao}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 px-2">
          <ArrowDownToLine className="h-3 w-3 mr-1" />
          <span>Gerar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Relatorios() {
  const [activeTab, setActiveTab] = useState("vendas");
  const [periodoSelecionado, setPeriodoSelecionado] = useState("30dias");
  const [formatoSelecionado, setFormatoSelecionado] = useState("pdf");

  // Dados mockados para o dashboard de relatórios
  const estatisticas = {
    relatoriosGerados: 24,
    ultimoRelatorio: "Vendas por Produto (hoje às 10:45)",
    relatoriosMaisAcessados: ["Vendas Diárias", "Estoque Crítico", "Lucratividade"]
  };

  // Lista de relatórios por categoria
  const relatorios = {
    vendas: [
      {
        titulo: "Vendas Diárias",
        descricao: "Relatório detalhado de vendas por dia",
        icon: BarChart,
        ultimaGeracao: "Hoje às 08:30"
      },
      {
        titulo: "Vendas por Produto",
        descricao: "Análise de vendas por produto",
        icon: PieChart,
        ultimaGeracao: "Ontem às 17:15"
      },
      {
        titulo: "Tendências de Vendas",
        descricao: "Análise de tendências ao longo do tempo",
        icon: LineChart,
        ultimaGeracao: "15/11/2023"
      },
      {
        titulo: "Vendas por Cliente",
        descricao: "Relatório de vendas agrupadas por cliente",
        icon: FileText,
        ultimaGeracao: "10/11/2023"
      }
    ],
    estoque: [
      {
        titulo: "Estoque Atual",
        descricao: "Situação atual do estoque",
        icon: BarChart,
        ultimaGeracao: "Hoje às 09:45"
      },
      {
        titulo: "Itens Críticos",
        descricao: "Relatório de itens com estoque crítico",
        icon: FileText,
        ultimaGeracao: "Hoje às 09:45"
      },
      {
        titulo: "Movimentação de Estoque",
        descricao: "Entradas e saídas do estoque",
        icon: LineChart,
        ultimaGeracao: "Ontem às 16:30"
      },
      {
        titulo: "Validade de Produtos",
        descricao: "Produtos próximos ao vencimento",
        icon: Calendar,
        ultimaGeracao: "12/11/2023"
      }
    ],
    financeiro: [
      {
        titulo: "Fluxo de Caixa",
        descricao: "Entradas e saídas financeiras",
        icon: LineChart,
        ultimaGeracao: "Hoje às 10:15"
      },
      {
        titulo: "Lucratividade",
        descricao: "Análise de lucros por período",
        icon: BarChart,
        ultimaGeracao: "Ontem às 18:00"
      },
      {
        titulo: "Contas a Pagar",
        descricao: "Relatório de contas a pagar",
        icon: FileText,
        ultimaGeracao: "14/11/2023"
      },
      {
        titulo: "Contas a Receber",
        descricao: "Relatório de contas a receber",
        icon: FileText,
        ultimaGeracao: "14/11/2023"
      }
    ],
    compras: [
      {
        titulo: "Compras por Fornecedor",
        descricao: "Análise de compras por fornecedor",
        icon: PieChart,
        ultimaGeracao: "Ontem às 14:20"
      },
      {
        titulo: "Histórico de Compras",
        descricao: "Histórico completo de compras",
        icon: FileText,
        ultimaGeracao: "13/11/2023"
      },
      {
        titulo: "Análise de Preços",
        descricao: "Comparativo de preços de fornecedores",
        icon: BarChart,
        ultimaGeracao: "10/11/2023"
      },
      {
        titulo: "Pedidos em Aberto",
        descricao: "Relatório de pedidos pendentes",
        icon: FileText,
        ultimaGeracao: "Hoje às 08:45"
      }
    ]
  };

  // Função para lidar com a geração de relatório
  const handleGerarRelatorio = (relatorio: any) => {
    console.log(`Gerando relatório: ${relatorio.titulo}`);
    // Aqui seria implementada a lógica de geração do relatório
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <div className="flex items-center gap-2">
          <Select
            value={periodoSelecionado}
            onValueChange={setPeriodoSelecionado}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7dias">Últimos 7 dias</SelectItem>
              <SelectItem value="30dias">Últimos 30 dias</SelectItem>
              <SelectItem value="90dias">Últimos 90 dias</SelectItem>
              <SelectItem value="ano">Este ano</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={formatoSelecionado}
            onValueChange={setFormatoSelecionado}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.relatoriosGerados}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Nos últimos 30 dias
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Último Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md font-medium">{estatisticas.ultimoRelatorio}</div>
            <div className="flex mt-2">
              <Button variant="outline" size="sm" className="h-7 text-xs mr-2">
                <Printer className="h-3 w-3 mr-1" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Share2 className="h-3 w-3 mr-1" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mais Acessados</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {estatisticas.relatoriosMaisAcessados.map((relatorio, index) => (
                <li key={index} className="text-sm flex items-center">
                  <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
                    {index + 1}
                  </span>
                  {relatorio}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de categorias de relatórios */}
      <Tabs defaultValue="vendas" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="vendas" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Vendas</span>
          </TabsTrigger>
          <TabsTrigger value="estoque" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Estoque</span>
          </TabsTrigger>
          <TabsTrigger value="financeiro" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Financeiro</span>
          </TabsTrigger>
          <TabsTrigger value="compras" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Compras</span>
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo das tabs */}
        {Object.keys(relatorios).map((categoria) => (
          <TabsContent key={categoria} value={categoria} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatorios[categoria as keyof typeof relatorios].map((relatorio, index) => (
                <RelatorioCard
                  key={index}
                  titulo={relatorio.titulo}
                  descricao={relatorio.descricao}
                  icon={relatorio.icon}
                  ultimaGeracao={relatorio.ultimaGeracao}
                  onClick={() => handleGerarRelatorio(relatorio)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Área de visualização do relatório */}
      {activeTab === "vendas" && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Visualização do Relatório</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <BarChart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Selecione um relatório para visualizar</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
                  Clique em um dos relatórios acima para gerar e visualizar os dados aqui.
                </p>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Relatório de Exemplo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 