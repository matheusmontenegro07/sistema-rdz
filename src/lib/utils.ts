import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um valor numérico para o formato de moeda brasileira (R$)
 * @param value - Valor a ser formatado
 * @param options - Opções de formatação
 * @returns String formatada como moeda
 */
export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
}

/**
 * Formata uma data para o formato brasileiro (DD/MM/YYYY)
 * @param date - Data a ser formatada
 * @returns String formatada como data
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("pt-BR").format(dateObj)
}

/**
 * Formata um número para o formato brasileiro com separadores de milhar
 * @param value - Valor a ser formatado
 * @param options - Opções de formatação
 * @returns String formatada como número
 */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat("pt-BR", options).format(value)
}

/**
 * Trunca um texto para o tamanho máximo especificado
 * @param text - Texto a ser truncado
 * @param maxLength - Tamanho máximo do texto
 * @returns Texto truncado com reticências se necessário
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}
