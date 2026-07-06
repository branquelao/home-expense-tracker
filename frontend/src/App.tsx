import { PersonManager } from './components/PersonManager';
import { TransactionManager } from './components/TransactionManager';

function App() {
	return (
		<div>
			<h1>Home Expense Tracker</h1>
			<PersonManager />
			<TransactionManager />
		</div>
	);
}

export default App;