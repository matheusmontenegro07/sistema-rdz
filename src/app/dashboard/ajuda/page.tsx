"use client";

import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Video,
  FileText,
  Mail,
  Phone,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Play,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Componente de Pergunta Frequente
function FAQ({ 
  pergunta, 
  resposta 
}: { 
  pergunta: string; 
  resposta: string;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-3 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50"
        onClick={() => setAberto(!aberto)}
      >
        <h3 className="font-medium">{pergunta}</h3>
        {aberto ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      {aberto && (
        <div className="p-4 bg-white dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-300">{resposta}</p>
          <div className="flex items-center justify-end mt-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-4">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Útil</span>
              </Button>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsDown className="h-4 w-4 mr-1" />
                <span>Não útil</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de Card de Tutorial
function TutorialCard({ 
  titulo, 
  descricao, 
  tipo, 
  duracao,
  link
}: { 
  titulo: string; 
  descricao: string; 
  tipo: "video" | "artigo"; 
  duracao: string;
  link: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {tipo === "video" ? (
          <>
            <Video className="h-12 w-12 text-gray-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/90 rounded-full p-3 cursor-pointer hover:bg-primary transition-colors">
                <Play className="h-6 w-6 text-white" fill="white" />
              </div>
            </div>
          </>
        ) : (
          <FileText className="h-12 w-12 text-gray-400" />
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{titulo}</CardTitle>
        <CardDescription>{descricao}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {duracao}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <span>Ver {tipo === "video" ? "vídeo" : "artigo"}</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Ajuda() {
  const [termoBusca, setTermoBusca] = useState("");

  // Dados mockados para a página de ajuda
  const perguntasFrequentes = [
    {
      pergunta: "Como cadastrar um novo fornecedor?",
      resposta: "Para cadastrar um novo fornecedor, acesse o menu 'Fornecedores' e clique no botão 'Novo Fornecedor'. Preencha todos os campos obrigatórios marcados com asterisco (*) e clique em 'Salvar'. O novo fornecedor estará disponível imediatamente para uso em pedidos e cotações."
    },
    {
      pergunta: "Como ajustar o estoque manualmente?",
      resposta: "Para ajustar o estoque manualmente, acesse o menu 'Estoque', localize o item que deseja ajustar e clique no ícone de ações (três pontos). Selecione 'Ajustar estoque', informe a nova quantidade e o motivo do ajuste. O sistema registrará a alteração no histórico de movimentações."
    },
    {
      pergunta: "Como gerar relatórios de vendas?",
      resposta: "Para gerar relatórios de vendas, acesse o menu 'Relatórios' e selecione a aba 'Vendas'. Escolha o tipo de relatório desejado, defina o período e o formato de saída (PDF, Excel ou CSV). Clique em 'Gerar' e o relatório será processado e disponibilizado para download."
    },
    {
      pergunta: "Como configurar alertas de estoque mínimo?",
      resposta: "Para configurar alertas de estoque mínimo, acesse o menu 'Estoque', selecione o item desejado e clique em 'Editar'. Defina os valores de 'Estoque Mínimo' e 'Estoque Ideal'. Depois, vá em 'Configurações > Notificações' e ative as notificações de estoque. Você receberá alertas quando os itens atingirem o nível mínimo."
    },
    {
      pergunta: "Como adicionar novos usuários ao sistema?",
      resposta: "Para adicionar novos usuários, acesse 'Configurações > Usuários' e clique em 'Novo Usuário'. Preencha os dados do usuário, defina o nível de acesso e as permissões específicas. Um email de convite será enviado ao novo usuário com instruções para definir a senha e acessar o sistema."
    },
    {
      pergunta: "Como fazer backup dos dados?",
      resposta: "O sistema realiza backups automáticos diariamente. Para fazer um backup manual, acesse 'Configurações > Sistema > Backup' e clique em 'Gerar Backup'. O arquivo será disponibilizado para download imediatamente. Recomendamos armazenar os backups em local seguro, fora do sistema."
    }
  ];

  const tutoriais = [
    {
      titulo: "Primeiros passos com o Reduzo",
      descricao: "Aprenda as funcionalidades básicas do sistema",
      tipo: "video" as const,
      duracao: "5 min",
      link: "#"
    },
    {
      titulo: "Gerenciando seu estoque",
      descricao: "Como controlar entradas e saídas eficientemente",
      tipo: "video" as const,
      duracao: "8 min",
      link: "#"
    },
    {
      titulo: "Relatórios avançados",
      descricao: "Extraia insights valiosos dos seus dados",
      tipo: "artigo" as const,
      duracao: "Leitura de 10 min",
      link: "#"
    },
    {
      titulo: "Configurando fornecedores",
      descricao: "Organize seus fornecedores e otimize compras",
      tipo: "artigo" as const,
      duracao: "Leitura de 7 min",
      link: "#"
    },
    {
      titulo: "Gestão de pedidos",
      descricao: "Fluxo completo de pedidos no sistema",
      tipo: "video" as const,
      duracao: "12 min",
      link: "#"
    },
    {
      titulo: "Configurações avançadas",
      descricao: "Personalize o sistema para suas necessidades",
      tipo: "video" as const,
      duracao: "15 min",
      link: "#"
    }
  ];

  // Filtragem de perguntas frequentes com base no termo de busca
  const perguntasFiltradas = termoBusca 
    ? perguntasFrequentes.filter(
        item => 
          item.pergunta.toLowerCase().includes(termoBusca.toLowerCase()) || 
          item.resposta.toLowerCase().includes(termoBusca.toLowerCase())
      )
    : perguntasFrequentes;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Central de Ajuda</h1>
      </div>

      {/* Barra de busca */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          type="search"
          placeholder="Buscar ajuda, tutoriais ou perguntas frequentes..."
          className="pl-10 py-6 text-lg"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
      </div>

      {/* Cards de acesso rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Perguntas Frequentes
            </CardTitle>
            <CardDescription>
              Encontre respostas para as dúvidas mais comuns
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="#faq">Ver perguntas</a>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Tutoriais e Guias
            </CardTitle>
            <CardDescription>
              Aprenda a usar todas as funcionalidades do sistema
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="#tutoriais">Ver tutoriais</a>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Suporte Técnico
            </CardTitle>
            <CardDescription>
              Entre em contato com nossa equipe de suporte
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="#suporte">Contatar suporte</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-8">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Perguntas Frequentes</span>
          </TabsTrigger>
          <TabsTrigger value="tutoriais" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Tutoriais</span>
          </TabsTrigger>
          <TabsTrigger value="suporte" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Suporte</span>
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da aba Perguntas Frequentes */}
        <TabsContent value="faq" id="faq">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Perguntas Frequentes</h2>
            
            {perguntasFiltradas.length > 0 ? (
              <div>
                {perguntasFiltradas.map((item, index) => (
                  <FAQ 
                    key={index} 
                    pergunta={item.pergunta} 
                    resposta={item.resposta} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma pergunta encontrada</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Não encontramos perguntas relacionadas ao termo "{termoBusca}".
                </p>
                <Button onClick={() => setTermoBusca("")}>
                  Limpar busca
                </Button>
              </div>
            )}
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-medium mb-2">Não encontrou o que procurava?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Entre em contato com nossa equipe de suporte para obter ajuda personalizada.
              </p>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Contatar Suporte
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Conteúdo da aba Tutoriais */}
        <TabsContent value="tutoriais" id="tutoriais">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Tutoriais e Guias</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutoriais.map((tutorial, index) => (
                <TutorialCard 
                  key={index}
                  titulo={tutorial.titulo}
                  descricao={tutorial.descricao}
                  tipo={tutorial.tipo}
                  duracao={tutorial.duracao}
                  link={tutorial.link}
                />
              ))}
            </div>
            
            <Separator className="my-8" />
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Treinamento Personalizado</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Precisa de treinamento específico para sua equipe? Oferecemos sessões personalizadas.
              </p>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Treinamento
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Conteúdo da aba Suporte */}
        <TabsContent value="suporte" id="suporte">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Suporte Técnico</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    Email
                  </CardTitle>
                  <CardDescription>
                    Resposta em até 24 horas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">suporte@reduzo.com.br</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Disponível 24/7 para todas as questões
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:suporte@reduzo.com.br">
                      Enviar Email
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    Telefone
                  </CardTitle>
                  <CardDescription>
                    Atendimento em horário comercial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">(11) 4002-8922</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Segunda a Sexta, das 8h às 18h
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="tel:+551140028922">
                      Ligar Agora
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nome" className="text-sm font-medium">
                        Nome
                      </label>
                      <Input id="nome" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="assunto" className="text-sm font-medium">
                      Assunto
                    </label>
                    <Input id="assunto" placeholder="Assunto da mensagem" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="mensagem" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <textarea 
                      id="mensagem" 
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Descreva sua dúvida ou problema em detalhes..."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 