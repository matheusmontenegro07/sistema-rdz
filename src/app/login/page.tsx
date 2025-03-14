"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  KeyRound, 
  Mail, 
  ChevronRight, 
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInWithEmail } from "@/lib/supabase/auth";
import { toast, Toaster } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [recuperacaoEnviada, setRecuperacaoEnviada] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Função de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    setCarregando(true);
    
    try {
      const { data, error } = await signInWithEmail(email, senha);

      if (error) {
        const errorMessage = typeof error === 'object' && error !== null && 'message' in error
          ? (error.message as string)
          : "Erro ao fazer login";
        toast.error(errorMessage);
        return;
      }

      // Login bem-sucedido
      toast.success("Login realizado com sucesso");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  // Função para enviar email de recuperação
  const handleRecuperarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailRecuperacao) return;
    
    setCarregando(true);
    
    try {
      // Simulação de uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRecuperacaoEnviada(true);
    } catch (error) {
      console.error("Erro ao enviar email de recuperação:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors />
      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold">Reduzo</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              Planos & Preços
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              Suporte
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="recuperar">Recuperar Senha</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-4">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
                  <CardDescription>
                    Entre com seu email e senha para acessar sua conta
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="senha">Senha</Label>
                      </div>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="senha"
                          type={mostrarSenha ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                          {mostrarSenha ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                          <span className="sr-only">
                            {mostrarSenha ? "Esconder senha" : "Mostrar senha"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="lembrar" 
                          checked={lembrar}
                          onCheckedChange={(checked: boolean | "indeterminate") => setLembrar(checked as boolean)}
                        />
                        <Label htmlFor="lembrar" className="text-sm cursor-pointer">
                          Lembrar de mim
                        </Label>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={carregando}>
                      {carregando ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Entrar <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Não tem uma conta?
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Link 
                        href="/registro"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Criar uma conta
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recuperar" className="mt-4">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Recuperar senha</CardTitle>
                  <CardDescription>
                    Enviaremos um link para redefinir sua senha
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {recuperacaoEnviada ? (
                    <div className="space-y-4 py-4">
                      <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-semibold text-xl">Email enviado!</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Enviamos um link de recuperação para
                          <br />
                          <strong>{emailRecuperacao}</strong>
                        </p>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                        <Button 
                          onClick={() => setRecuperacaoEnviada(false)} 
                          variant="outline" 
                          className="w-full"
                        >
                          Enviar para outro email
                        </Button>
                        
                        <Button 
                          onClick={() => router.push("/login")} 
                          variant="link" 
                          className="w-full"
                        >
                          Voltar para o login
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleRecuperarSenha} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-recuperacao">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="email-recuperacao"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={emailRecuperacao}
                            onChange={(e) => setEmailRecuperacao(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={carregando}>
                        {carregando ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processando...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Enviar instruções <ChevronRight className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                      
                      <div className="text-center mt-4">
                        <Button 
                          variant="link" 
                          className="text-sm"
                          onClick={() => router.push("/login")}
                        >
                          Voltar para o login
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t p-4 text-center">
        <div className="container mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Reduzo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
} 