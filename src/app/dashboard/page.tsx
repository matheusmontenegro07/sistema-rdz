"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Users, 
  ArrowRight,
  Bell,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

// Componente de Card para estatísticas
function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType 
}: { 
  title: string; 
  value: string; 
  icon: any; 
  change: string; 
  changeType: "up" | "down" | "neutral" 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-[#FFF032]/20 dark:bg-[#FFF032]/10 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-[#090909] dark:text-[#FFF032]" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {changeType === "up" && (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        )}
        {changeType === "down" && (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span 
          className={`text-sm ${
            changeType === "up" 
              ? "text-green-500" 
              : changeType === "down" 
                ? "text-red-500" 
                : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

// Componente de Alerta
function Alert({ 
  title, 
  description, 
  type 
}: { 
  title: string; 
  description: string; 
  type: "warning" | "info" 
}) {
  return (
    <div className={`p-4 rounded-lg mb-3 flex items-start ${
      type === "warning" 
        ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" 
        : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
    }`}>
      <div className={`p-2 rounded-lg mr-3 ${
        type === "warning" 
          ? "bg-red-100 dark:bg-red-800/30" 
          : "bg-blue-100 dark:bg-blue-800/30"
      }`}>
        {type === "warning" ? (
          <AlertTriangle className={`h-5 w-5 text-red-500 dark:text-red-400`} />
        ) : (
          <Info className={`h-5 w-5 text-blue-500 dark:text-blue-400`} />
        )}
      </div>
      <div>
        <h4 className={`font-medium text-sm ${
          type === "warning" 
            ? "text-red-800 dark:text-red-300" 
            : "text-blue-800 dark:text-blue-300"
        }`}>
          {title}
        </h4>
        <p className={`text-xs mt-1 ${
          type === "warning" 
            ? "text-red-600 dark:text-red-400" 
            : "text-blue-600 dark:text-blue-400"
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}

// Componente de Insight
function Insight({ 
  title, 
  description, 
  icon: Icon, 
  actionText 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  actionText: string 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700 mb-4">
      <div className="flex items-start">
        <div className="bg-[#FFF032]/20 dark:bg-[#FFF032]/10 p-2 rounded-lg mr-4">
          <Icon className="h-5 w-5 text-[#090909] dark:text-[#FFF032]" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          <Button variant="link" className="text-xs px-0 mt-2 h-auto">
            {actionText} <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  // Dados mockados para o dashboard
  const stats = [
    { 
      title: "Faturamento Mensal", 
      value: formatCurrency(45678.90), 
      icon: DollarSign, 
      change: "12% em relação ao mês anterior", 
      changeType: "up" as const
    },
    { 
      title: "CMV", 
      value: "32%", 
      icon: BarChart3, 
      change: "2% em relação ao mês anterior", 
      changeType: "down" as const
    },
    { 
      title: "Pedidos em Aberto", 
      value: "8", 
      icon: ShoppingCart, 
      change: "3 novos pedidos hoje", 
      changeType: "neutral" as const
    },
    { 
      title: "Itens com Estoque Baixo", 
      value: "12", 
      icon: Package, 
      change: "5 itens críticos", 
      changeType: "up" as const
    },
  ];

  const alerts = [
    {
      title: "Estoque crítico de Farinha de Trigo",
      description: "O estoque atual está 70% abaixo do mínimo definido.",
      type: "warning" as const
    },
    {
      title: "Cotação pendente para 5 fornecedores",
      description: "Cotações enviadas há 2 dias sem resposta.",
      type: "warning" as const
    },
    {
      title: "Contagem de estoque programada",
      description: "A próxima contagem está agendada para amanhã.",
      type: "info" as const
    }
  ];

  const insights = [
    {
      title: "Otimização de Compras",
      description: "Consolidar pedidos do fornecedor 'Distribuidora ABC' pode reduzir custos em 8%.",
      icon: TrendingDown,
      actionText: "Ver análise"
    },
    {
      title: "Produtos mais Vendidos",
      description: "Pão Francês, Bolo de Chocolate e Croissant representam 45% das vendas.",
      icon: TrendingUp,
      actionText: "Ver relatório"
    },
    {
      title: "Fornecedores em Destaque",
      description: "O fornecedor 'Laticínios XYZ' oferece os melhores preços para 7 insumos.",
      icon: Users,
      actionText: "Comparar preços"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Última atualização: hoje às 10:45</span>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </Button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de CMV */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Evolução do CMV</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Gráfico de CMV será exibido aqui</p>
          </div>
        </div>

        {/* Alertas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Alertas</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              Ver todos
            </Button>
          </div>
          
          <div>
            {alerts.map((alert, index) => (
              <Alert key={index} {...alert} />
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Insights</h2>
          <Button variant="ghost" size="sm" className="text-xs">
            Ver todos
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            >
              <Insight {...insight} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 