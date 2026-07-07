import { useState, useEffect } from 'react';
import type { TotalsResponse } from '../types';
import { getTotals } from '../services/api';

export function TotalsView() {
	const [totals, setTotals] = useState<TotalsResponse | null>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		loadTotals();
	}, []);

	async function loadTotals() {
		try {
			const data = await getTotals();
			setTotals(data);
		} catch (err) {
			console.error(err);
			setError('Failed to load totals.');
		}
	}

	if (error) {
		return <p className="error-message">{error}</p>;
	}

	if (!totals) {
		return <p>Loading totals...</p>;
	}

	return (
		<section className="card">
			<div className="card-header">
				<h2>Totals</h2>
				<button onClick={loadTotals} className="refresh-button">Refresh</button>
			</div>

			<table className="totals-table">
				<thead>
					<tr>
						<th>Person</th>
						<th>Income</th>
						<th>Expense</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					{totals.people.map((person) => (
						<tr key={person.personId}>
							<td>{person.name}</td>
							<td className="text-income">R$ {person.totalIncome.toFixed(2)}</td>
							<td className="text-expense">R$ {person.totalExpense.toFixed(2)}</td>
							<td>R$ {person.balance.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td>
							<strong>Grand Total</strong>
						</td>
						<td className="text-income">
							<strong>R$ {totals.grandTotalIncome.toFixed(2)}</strong>
						</td>
						<td className="text-expense">
							<strong>R$ {totals.grandTotalExpense.toFixed(2)}</strong>
						</td>
						<td>
							<strong>R$ {totals.grandBalance.toFixed(2)}</strong>
						</td>
					</tr>
				</tfoot>
			</table>
		</section>
	);
}