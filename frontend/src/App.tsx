import { useState, useEffect } from 'react';
import type { Person } from './types';
import { getPersons } from './services/api';
import { PersonManager } from './components/PersonManager';
import { TransactionManager } from './components/TransactionManager';
import { TotalsView } from './components/TotalsView';

function App() {
	const [persons, setPersons] = useState<Person[]>([]);

	useEffect(() => {
		loadPersons();
	}, []);

	async function loadPersons() {
		try {
			const data = await getPersons();
			setPersons(data);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div>
			<h1>Home Expense Tracker</h1>
			<PersonManager persons={persons} onPersonsChanged={loadPersons} />
			<TransactionManager persons={persons} />
			<TotalsView />
		</div>
	);
}

export default App;