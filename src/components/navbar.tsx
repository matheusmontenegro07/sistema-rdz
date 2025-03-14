"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { 
  Home, Package, ShoppingCart, Store, 
  FileText, BarChart, Gift, Settings, 
  HelpCircle, LogOut, Menu,
  Users, Database, ClipboardCheck, FileSpreadsheet,
  ShoppingBag, FileInput, DollarSign, ChevronDown,
  Bell, Clock, ArrowUpRight, User
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

// Estrutura de menus e submenus
const menuItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Gestão",
    icon: Database,
    submenu: [
      { name: "Fornecedores", href: "/fornecedores", icon: Users },
      { name: "Insumos", href: "/insumos", icon: Package },
      { name: "Gestão de Estoque", href: "/estoque", icon: Database }
    ]
  },
  {
    name: "Compras",
    icon: ShoppingCart,
    submenu: [
      { name: "Ordem de Cotação", href: "/ordem-cotacao", icon: ClipboardCheck },
      { name: "Lista de Compras", href: "/lista-compras", icon: ShoppingCart },
      { name: "Planilha de Cotação", href: "/planilha-cotacao", icon: FileSpreadsheet },
      { name: "Ordem de Compras", href: "/ordem-compras", icon: ShoppingBag },
      { name: "Pedidos", href: "/pedidos", icon: ClipboardCheck }
    ]
  },
  {
    name: "Comercial",
    icon: Store,
    submenu: [
      { name: "Fichas Técnicas", href: "/fichas-tecnicas", icon: FileInput },
      { name: "Registro de Vendas", href: "/registro-vendas", icon: DollarSign }
    ]
  },
  {
    name: "Relatórios",
    href: "/relatorios",
    icon: BarChart,
  },
  {
    name: "Programa de Indicação",
    href: "/programa-indicacao",
    icon: Gift,
  },
  {
    name: "Planos",
    href: "/planos",
    icon: FileText,
  },
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
  {
    name: "Ajuda",
    href: "/ajuda",
    icon: HelpCircle,
  }
];

interface NavbarProps {
  isMobile: boolean;
  collapsed: boolean;
  toggleSidebar: () => void;
}

export function Navbar({ isMobile, collapsed, toggleSidebar }: NavbarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Dados mockados do usuário e notificações
  const user = {
    name: "Padaria Exemplo",
    role: "Administrador",
    avatarUrl: "", // Placeholder para avatar
    trialDays: 15, // Dias restantes de teste
  };
  
  const notifications = [
    { id: 1, message: "Nova ordem de compra criada", time: "há 5 min" },
    { id: 2, message: "Estoque de farinha baixo", time: "há 1 hora" },
    { id: 3, message: "Relatório mensal disponível", time: "há 2 horas" },
  ];

  // Função para verificar se um item está ativo
  const isActiveItem = (href: string) => pathname === href;
  
  // Função para verificar se um submenu deve estar ativo
  const isSubmenuActive = (submenu: any[]) => 
    submenu && submenu.some(item => pathname.includes(item.href));
  
  // Toggle para abrir/fechar submenus
  const toggleSubmenu = (menuName: string) => {
    setOpenMenus(prevOpenMenus => 
      prevOpenMenus.includes(menuName)
        ? prevOpenMenus.filter(name => name !== menuName)
        : [...prevOpenMenus, menuName]
    );
  };

  // Verificar se um menu está aberto
  const isMenuOpen = (menuName: string) => openMenus.includes(menuName);

  return (
    <div className="flex flex-col h-screen">
      {/* Header - ocupa toda a largura */}
      <header className="h-16 bg-[#FFF032] dark:bg-[#090909] border-b border-[#FFF032] dark:border-[#090909] fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Botão de menu sempre visível */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-[#090909] dark:text-[#fefefe] hover:bg-yellow-200 dark:hover:bg-gray-800"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </Button>
          
          {/* Logotipo */}
          <div className="font-bold text-xl text-[#090909] dark:text-[#fefefe]">
            REDUZO
          </div>
        </div>
        
        {/* Seção central com informações de trial e botão upgrade */}
        <div className="flex items-center space-x-3">
          {user.trialDays > 0 && (
            <div className="flex items-center space-x-1 text-xs text-[#090909] dark:text-[#fefefe]">
              <Clock size={14} />
              <span>{user.trialDays} dias restantes de teste</span>
            </div>
          )}
          
          <Link href="/planos">
            <Button 
              size="sm" 
              variant="secondary"
            >
              <ArrowUpRight size={14} className="mr-1" />
              Upgrade
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Alternador de tema */}
          <ThemeToggle />
          
          {/* Notificações */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-[#090909] dark:text-[#fefefe] hover:bg-yellow-200 dark:hover:bg-gray-800"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications.length}
              </span>
            </Button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  className="absolute right-0 top-12 z-50 w-80 rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-[#090909] dark:text-[#fefefe]">Notificações</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <p className="text-sm text-[#090909] dark:text-[#fefefe]">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <Button variant="link" size="sm" className="text-xs hover:text-[#FFF032]">
                      Ver todas as notificações
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Avatar/User info */}
          <div className="relative">
            <Button 
              variant="ghost"
              className="flex items-center gap-2 px-2 text-[#090909] dark:text-[#fefefe] hover:bg-yellow-200 dark:hover:bg-gray-800"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-[#090909] dark:text-[#fefefe]">
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.name} width={32} height={32} className="rounded-full" />
                ) : (
                  <User size={16} className="text-[#090909] dark:text-[#fefefe]" />
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs">{user.role}</p>
              </div>
              <ChevronDown size={16} />
            </Button>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div 
                  className="absolute right-0 top-12 z-50 w-56 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium text-[#090909] dark:text-[#fefefe]">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link 
                      href="/configuracoes"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-[#090909] dark:text-[#fefefe]"
                    >
                      Editar Perfil
                    </Link>
                    
                    <Link 
                      href="/configuracoes"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-[#090909] dark:text-[#fefefe]"
                    >
                      Configurações
                    </Link>
                    
                    <button
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-red-600 dark:text-red-400"
                    >
                      Sair
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Sidebar - começa abaixo do header */}
      <div className={`bg-[#FFF032] dark:bg-[#090909] border-r border-[#FFF032] dark:border-[#090909] flex flex-col fixed top-16 bottom-0 left-0 z-30 transition-all duration-300 ${
        isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'
      } ${collapsed && !isMobile ? 'w-16' : 'w-60'}`}>
        {/* Menu de navegação */}
        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="space-y-1 px-2">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-1">
                {!item.submenu ? (
                  // Item normal sem submenu
                  <Link
                    href={item.href || '#'}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      isActiveItem(item.href || '') 
                        ? "bg-white dark:bg-gray-800 text-[#090909] dark:text-[#fefefe]" 
                        : "text-[#090909] dark:text-[#fefefe] hover:bg-white/40 dark:hover:bg-gray-800/40"
                    )}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                ) : (
                  // Item com submenu
                  <div>
                    <button
                      onClick={() => !collapsed && toggleSubmenu(item.name)}
                      className={cn(
                        "flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer",
                        isSubmenuActive(item.submenu) 
                          ? "text-[#090909] dark:text-[#fefefe] font-semibold" 
                          : "text-[#090909] dark:text-[#fefefe] hover:bg-white/40 dark:hover:bg-gray-800/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className="flex-shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                      {!collapsed && (
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${isMenuOpen(item.name) ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </button>
                    
                    {!collapsed && isMenuOpen(item.name) && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.submenu?.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-xs",
                                isActiveItem(subItem.href)
                                  ? "bg-white dark:bg-gray-800 text-[#090909] dark:text-[#fefefe] font-medium" 
                                  : "text-[#090909] dark:text-[#fefefe] hover:bg-white/40 dark:hover:bg-gray-800/40"
                              )}
                            >
                              <subItem.icon size={15} className="flex-shrink-0" />
                              <span>{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-3 border-t border-[#FFF032] dark:border-[#090909]">
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#090909] dark:text-[#fefefe] hover:bg-white/40 dark:hover:bg-gray-800/40">
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </div>
    </div>
  );
} 