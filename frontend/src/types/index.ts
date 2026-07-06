// Mirrors the backend's TransactionType enum.
export const TransactionType = {
  Income: 0,
  Expense: 1,
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

// Mirrors the backend's PersonDto.
export interface Person {
  id: number;
  name: string;
  age: number;
}

// Mirrors the backend's TransactionDto.
export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: TransactionType;
  personId: number;
}

// Mirrors the backend's PersonTotalsDto.
export interface PersonTotals {
  personId: number;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

// Mirrors the backend's TotalsResponseDto.
export interface TotalsResponse {
  people: PersonTotals[];
  grandTotalIncome: number;
  grandTotalExpense: number;
  grandBalance: number;
}