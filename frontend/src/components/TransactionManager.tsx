import { useState, useEffect } from 'react';
import type { Person, Transaction } from '../types';
import { TransactionType } from '../types';
import { getTransactions, createTransaction } from '../services/api';

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

	useEffect(() => {
		loadTransactions();
	}, []);

	async function loadTransactions() {
		try {
			const data = await getTransactions();
			setTransactions(data);
		} catch (err) {
			console.error(err);
			setError('Failed to load transactions.');
		}
	}

	// Finds the currently selected person, used to check if they are a minor.
	const selectedPerson = persons.find((p) => p.id === Number(personId));
	const isMinorSelected = selectedPerson !== undefined && selectedPerson.age < 18;

	async function handleCreate(event: React.FormEvent) {
		event.preventDefault();
		setError('');

		if (!description.trim() || !value || !personId) {
			setError('Description, value and person are required.');
			return;
		}

		try {
			await createTransaction(description, Number(value), type, Number(personId));
			setDescription('');
			setValue('');
			loadTransactions();
		} catch (err) {
			// The backend returns a plain-text message when a business rule is violated
			// (e.g. minor registering an income transaction), so we show it directly.
			const message = err instanceof Error ? err.message : 'Failed to create transaction.';
			setError(message);
		}
	}

	return (
		<section className="card">
			<h2>Transactions</h2>

			<form className="form-row" onSubmit={handleCreate}>
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

				<button type="submit" className="primary-button">Add Transaction</button>
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
							<span className={isIncome ? 'badge badge-income' : 'badge badge-expense'}>
								{isIncome ? 'Income' : 'Expense'}: R$ {transaction.value.toFixed(2)}
							</span>
						</li>
					);
				})}
			</ul>
		</section>
	);
}