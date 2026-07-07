import { useState } from 'react';
import type { Person } from '../types';
import { createPerson, deletePerson } from '../services/api';

interface PersonManagerProps {
	persons: Person[];
	onPersonsChanged: () => void;
}

export function PersonManager({ persons, onPersonsChanged }: PersonManagerProps) {
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [error, setError] = useState('');

	async function handleCreate(event: React.FormEvent) {
		event.preventDefault();
		setError('');

		if (!name.trim() || !age) {
			setError('Name and age are required.');
			return;
		}

		try {
			await createPerson(name, Number(age));
			setName('');
			setAge('');
			onPersonsChanged(); // tells the parent to refresh the shared list
		} catch (err) {
			console.error(err);
			setError('Failed to create person.');
		}
	}

	async function handleDelete(id: number) {
		try {
			await deletePerson(id);
			onPersonsChanged();
		} catch (err) {
			console.error(err);
			setError('Failed to delete person.');
		}
	}

	return (
		<section className="card">
			<h2>People</h2>

			<form className="form-row" onSubmit={handleCreate}>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Age"
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<button type="submit" className="primary-button">Add Person</button>
			</form>

			{error && <p className="error-message">{error}</p>}

			<ul className="item-list">
				{persons.map((person) => (
					<li key={person.id} className="item-row">
						<span>{person.name} ({person.age} years old)</span>
						<button onClick={() => handleDelete(person.id)} className="delete-button">Delete</button>
					</li>
				))}
			</ul>
		</section>
	);
}