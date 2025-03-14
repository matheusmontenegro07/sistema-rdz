// Este arquivo existe apenas para validar que as exportações estão funcionando
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { cn, formatCurrency, formatDate } from "@/lib/utils";

// Validação simples para garantir que as exportações funcionam
console.log('DropdownMenu:', typeof DropdownMenu);
console.log('cn:', typeof cn);
console.log('formatCurrency:', typeof formatCurrency);
console.log('formatDate:', typeof formatDate); 