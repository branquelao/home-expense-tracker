import type { Person, Transaction, TotalsResponse } from '../types';
import { TransactionType } from '../types';

const API_BASE_URL = 'https://localhost:7210/api';
// Troque a porta acima pela porta HTTP que o Visual Studio usa no seu projeto

// --- Persons ---

export async function getPersons(): Promise<Person[]> {
  const response = await fetch(`${API_BASE_URL}/persons`);
  if (!response.ok) throw new Error('Failed to fetch persons');
  return response.json();
}

export async function createPerson(name: string, age: number): Promise<Person> {
  const response = await fetch(`${API_BASE_URL}/persons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age }),
  });
  if (!response.ok) throw new Error('Failed to create person');
  return response.json();
}

export async function deletePerson(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/persons/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete person');
}

// --- Transactions ---

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_BASE_URL}/transactions`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
}

export async function createTransaction(
  description: string,
  value: number,
  type: TransactionType,
  personId: number
): Promise<Transaction> {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, value, type, personId }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Failed to create transaction');
  }
  return response.json();
}

export async function updateTransaction(
  id: number,
  description: string,
  value: number,
  type: TransactionType,
  personId: number
): Promise<Transaction> {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, value, type, personId }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Failed to update transaction');
  }
  return response.json();
}

// --- Totals ---
export async function getTotals(): Promise<TotalsResponse> {
  const response = await fetch(`${API_BASE_URL}/totals`);
  if (!response.ok) throw new Error('Failed to fetch totals');
  return response.json();
}