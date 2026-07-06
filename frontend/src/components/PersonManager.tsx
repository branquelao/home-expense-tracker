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
		<section>
			<h2>People</h2>

			<form onSubmit={handleCreate}>
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
				<button type="submit">Add Person</button>
			</form>

			{error && <p style={{ color: 'red' }}>{error}</p>}

			<ul>
				{persons.map((person) => (
					<li key={person.id}>
						{person.name} ({person.age} years old)
						<button onClick={() => handleDelete(person.id)}>Delete</button>
					</li>
				))}
			</ul>
		</section>
	);
}