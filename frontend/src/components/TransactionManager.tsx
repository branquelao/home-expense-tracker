import { useState, useEffect } from 'react';
import type { Person, Transaction, } from '../types';
import { TransactionType } from '../types';
import { getTransactions, createTransaction, updateTransaction } from '../services/api';
 
interface TransactionManagerProps {
	persons: Person[];
}
 
export function TransactionManager({ persons }: TransactionManagerProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');
	const [type, setType] = useState<TransactionType>(TransactionType.Expense);
	const [personId, setPersonId] = useState('');
	const [error, setError] = useState('');
	const [editingId, setEditingId] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const pageSize = 10;
	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
 
	useEffect(() => {
		loadTransactions();
	}, [pageNumber]);
 
	async function loadTransactions() {
		try {
			const result = await getTransactions(pageNumber, pageSize);
			setTransactions(result.items);
			setTotalCount(result.totalCount);
		} catch (err) {
			console.error(err);
			setError('Failed to load transactions.');
		}
	}
 
	const selectedPerson = persons.find((p) => p.id === Number(personId));
	const isMinorSelected = selectedPerson !== undefined && selectedPerson.age < 18;
	const isEditing = editingId !== null;
 
	function startEdit(transaction: Transaction) {
		setEditingId(transaction.id);
		setDescription(transaction.description);
		setValue(String(transaction.value));
		setType(transaction.type);
		setPersonId(String(transaction.personId));
		setError('');
	}
 
	function cancelEdit() {
		setEditingId(null);
		setDescription('');
		setValue('');
		setType(TransactionType.Expense);
		setPersonId('');
		setError('');
	}
 
	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setError('');
 
		if (!description.trim() || !value || !personId) {
			setError('Description, value and person are required.');
			return;
		}
 
		try {
			if (isEditing) {
				await updateTransaction(editingId!, description, Number(value), type, Number(personId));
			} else {
				await createTransaction(description, Number(value), type, Number(personId));
			}
			cancelEdit();
			loadTransactions();
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Failed to save transaction.';
			setError(message);
		}
	}
 
	return (
		<section className="card">
			<h2>Transactions</h2>
 
			<form className="form-row" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Value"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
 
				<select value={personId} onChange={(e) => setPersonId(e.target.value)}>
					<option value="">Select a person</option>
					{persons.map((person) => (
						<option key={person.id} value={person.id}>
							{person.name}
						</option>
					))}
				</select>
 
				<select
					value={type}
					onChange={(e) => setType(Number(e.target.value) as TransactionType)}
				>
					<option value={TransactionType.Expense}>Expense</option>
					<option value={TransactionType.Income} disabled={isMinorSelected}>
						Income
					</option>
				</select>
 
				<button type="submit" className="primary-button">
					{isEditing ? 'Save Changes' : 'Add Transaction'}
				</button>
				{isEditing && (
					<button type="button" className="refresh-button" onClick={cancelEdit}>
						Cancel
					</button>
				)}
			</form>
 
			{isMinorSelected && (
				<p className="warning-message">
					This person is a minor: only expenses are allowed.
				</p>
			)}
 
			{error && <p className="error-message">{error}</p>}
 
			<ul className="item-list">
				{transactions.map((transaction) => {
					const person = persons.find((p) => p.id === transaction.personId);
					const isIncome = transaction.type === TransactionType.Income;
					return (
						<li key={transaction.id} className="item-row">
							<span>
								{transaction.description} — {person ? person.name : `Person #${transaction.personId}`}
							</span>
							<div className="item-actions">
								<span className={isIncome ? 'badge badge-income' : 'badge badge-expense'}>
									{isIncome ? 'Income' : 'Expense'}: R$ {transaction.value.toFixed(2)}
								</span>
								<button className="refresh-button" onClick={() => startEdit(transaction)}>
									Edit
								</button>
							</div>
						</li>
					);
				})}
			</ul>

			<div className="pagination-controls">
				<button
					className="refresh-button"
					disabled={pageNumber <= 1}
					onClick={() => setPageNumber((p) => p - 1)}
				>
					Previous
				</button>
				<span>Page {pageNumber} of {totalPages}</span>
				<button
					className="refresh-button"
					disabled={pageNumber >= totalPages}
					onClick={() => setPageNumber((p) => p + 1)}
				>
					Next
				</button>
			</div>
		</section>
	);
}