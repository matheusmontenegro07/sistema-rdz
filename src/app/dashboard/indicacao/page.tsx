"use client";

import { useState } from "react";
import { 
  Gift, 
  Share2, 
  Users, 
  TrendingUp,
  Copy, 
  Mail, 
  Check, 
  ChevronRight,
  Clock,
  Star,
  UserPlus,
  CreditCard
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

// Tipo para indicações
interface Indicacao {
  id: string;
  nome: string;
  email: string;
  dataEnvio: string;
  status: "pendente" | "aceita" | "convertida";
  valor?: number;
}

// Tipo para recompensas
interface Recompensa {
  id: string;
  tipo: "desconto" | "cashback" | "produto";
  descricao: string;
  valor: number;
  dataResgate?: string;
  status: "disponivel" | "resgatada" | "expirada";
}

// Componente de Status da Indicação
function StatusIndicacao({ status }: { status: Indicacao["status"] }) {
  const statusConfig = {
    pendente: {
      label: "Pendente",
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
    aceita: {
      label: "Aceita",
      icon: Check,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    },
    convertida: {
      label: "Convertida",
      icon: Star,
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}

// Componente de Status da Recompensa
function StatusRecompensa({ status }: { status: Recompensa["status"] }) {
  const statusConfig = {
    disponivel: {
      label: "Disponível",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    },
    resgatada: {
      label: "Resgatada",
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    },
    expirada: {
      label: "Expirada",
      className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

// Componente para métrica
function MetricaCard({ 
  titulo, 
  valor, 
  descricao, 
  icone: Icone, 
}: { 
  titulo: string;
  valor: string;
  descricao: string;
  icone: any;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{titulo}</p>
            <h3 className="text-2xl font-bold mt-1">{valor}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {descricao}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            <Icone className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProgramaIndicacao() {
  const [copiado, setCopiado] = useState(false);
  const [email, setEmail] = useState("");
  const [linkIndicacao] = useState("https://reduzo.com.br/indicado-por/seu-codigo");

  // Dados de exemplo
  const indicacoes: Indicacao[] = [
    { 
      id: "1", 
      nome: "Restaurante Silva", 
      email: "contato@restaurantesilva.com.br", 
      dataEnvio: "2023-11-15", 
      status: "convertida",
      valor: 450
    },
    { 
      id: "2", 
      nome: "Padaria Harmonia", 
      email: "contato@padariaharmonia.com.br", 
      dataEnvio: "2023-11-20", 
      status: "aceita" 
    },
    { 
      id: "3", 
      nome: "Açougue Central", 
      email: "financeiro@acouguecentral.com.br", 
      dataEnvio: "2023-11-22", 
      status: "pendente" 
    },
    { 
      id: "4", 
      nome: "Mercado Bom Preço", 
      email: "compras@mercadobompreco.com.br", 
      dataEnvio: "2023-11-24", 
      status: "pendente" 
    }
  ];

  const recompensas: Recompensa[] = [
    {
      id: "1",
      tipo: "desconto",
      descricao: "10% de desconto na próxima mensalidade",
      valor: 59.90,
      status: "disponivel"
    },
    {
      id: "2",
      tipo: "cashback",
      descricao: "R$ 100 em crédito para próxima compra",
      valor: 100,
      dataResgate: "2023-11-10",
      status: "resgatada"
    },
    {
      id: "3",
      tipo: "produto",
      descricao: "Licença de módulo adicional por 3 meses",
      valor: 150,
      status: "disponivel"
    }
  ];

  // Métricas
  const metricas = [
    {
      titulo: "Total de Indicações",
      valor: "12",
      descricao: "Enviadas até o momento",
      icone: Share2
    },
    {
      titulo: "Indicações Convertidas",
      valor: "3",
      descricao: "25% de taxa de conversão",
      icone: Users
    },
    {
      titulo: "Recompensas Disponíveis",
      valor: formatCurrency(209.90),
      descricao: "Para resgate",
      icone: Gift
    },
    {
      titulo: "Total Acumulado",
      valor: formatCurrency(650),
      descricao: "Em recompensas",
      icone: TrendingUp
    }
  ];

  // Função para copiar o link
  const handleCopiarLink = () => {
    navigator.clipboard.writeText(linkIndicacao);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Função para enviar convite
  const handleEnviarEmail = () => {
    if (!email) return;
    // Lógica para enviar email
    alert(`Convite enviado para ${email}`);
    setEmail("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Programa de Indicação</h1>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Como Funciona */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
            <CardDescription>
              Indique empresas para usar o Reduzo e ganhe recompensas quando elas se tornarem clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">1. Compartilhe seu link único</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Envie seu link de indicação para outras empresas que poderiam se beneficiar do Reduzo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">2. A empresa se cadastra</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quando uma empresa se cadastra através do seu link, ela é vinculada à sua conta
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">3. A empresa se torna cliente</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quando a empresa assina um plano, você recebe a sua recompensa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">4. Receba suas recompensas</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ganhe descontos, cashback ou meses gratuitos como recompensa pelas suas indicações
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seu Link de Indicação */}
        <Card>
          <CardHeader>
            <CardTitle>Seu Link de Indicação</CardTitle>
            <CardDescription>
              Compartilhe este link com outras empresas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex-1 truncate">
                {linkIndicacao}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleCopiarLink}
                className="flex-shrink-0"
              >
                {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copiar link</span>
              </Button>
            </div>

            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium">Enviar convite por e-mail</p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Email do convidado" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  variant="default" 
                  size="icon" 
                  onClick={handleEnviarEmail}
                  className="flex-shrink-0"
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Enviar email</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas para Indicações e Recompensas */}
      <Tabs defaultValue="indicacoes" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="indicacoes">Minhas Indicações</TabsTrigger>
          <TabsTrigger value="recompensas">Minhas Recompensas</TabsTrigger>
        </TabsList>
        
        {/* Conteúdo de Indicações */}
        <TabsContent value="indicacoes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Indicações Enviadas</CardTitle>
              <CardDescription>
                Histórico de todas as suas indicações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {indicacoes.map((indicacao, index) => (
                  <motion.div
                    key={indicacao.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{indicacao.nome.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{indicacao.nome}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{indicacao.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enviada em {formatDate(indicacao.dataEnvio)}
                          </p>
                          <StatusIndicacao status={indicacao.status} />
                        </div>
                        {indicacao.valor && (
                          <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-md">
                            <p className="text-green-700 dark:text-green-400 font-medium">
                              +{formatCurrency(indicacao.valor)}
                            </p>
                          </div>
                        )}
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver Todas as Indicações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Conteúdo de Recompensas */}
        <TabsContent value="recompensas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Suas Recompensas</CardTitle>
              <CardDescription>
                Recompensas disponíveis e histórico de resgates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recompensas.map((recompensa, index) => (
                  <motion.div
                    key={recompensa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${
                          recompensa.tipo === "desconto" 
                            ? "bg-blue-100 dark:bg-blue-900/20"
                            : recompensa.tipo === "cashback"
                              ? "bg-green-100 dark:bg-green-900/20"
                              : "bg-purple-100 dark:bg-purple-900/20"
                        }`}>
                          {recompensa.tipo === "desconto" && (
                            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          )}
                          {recompensa.tipo === "cashback" && (
                            <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                          )}
                          {recompensa.tipo === "produto" && (
                            <Gift className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{recompensa.descricao}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Valor: {formatCurrency(recompensa.valor)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <StatusRecompensa status={recompensa.status} />
                        {recompensa.dataResgate && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Resgatada em {formatDate(recompensa.dataResgate)}
                          </p>
                        )}
                        {recompensa.status === "disponivel" && (
                          <Button size="sm" variant="default">
                            Resgatar
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm font-medium">
                Total disponível para resgate: <span className="text-primary">{formatCurrency(209.90)}</span>
              </p>
              <Button variant="outline">Ver Histórico</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Termos do Programa */}
      <Card>
        <CardHeader>
          <CardTitle>Termos do Programa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <p>• As recompensas são oferecidas apenas quando a empresa indicada se torna cliente pago do Reduzo.</p>
            <p>• O valor da recompensa é baseado no plano escolhido pela empresa indicada.</p>
            <p>• As recompensas podem ser utilizadas como desconto em mensalidades, cashback ou para adquirir módulos adicionais.</p>
            <p>• As recompensas disponíveis têm validade de 6 meses após serem creditadas.</p>
            <p>• A Reduzo se reserva o direito de modificar os termos do programa de indicação a qualquer momento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 