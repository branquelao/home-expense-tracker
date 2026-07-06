import { useState, useEffect } from 'react';
import type { Person } from '../types';
import { getPersons, createPerson, deletePerson } from '../services/api';

export function PersonManager() {
	const [persons, setPersons] = useState<Person[]>([]);
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [error, setError] = useState('');

	// Loads the person list once, when the component first renders.
	useEffect(() => {
		loadPersons();
	}, []);

	async function loadPersons() {
		try {
			const data = await getPersons();
			setPersons(data);
		} catch (err) {
			console.error(err);
			setError('Failed to load persons.');
		}
	}

	async function handleCreate(event: React.FormEvent) {
		event.preventDefault(); // prevents the page from reloading on submit
		setError('');

		if (!name.trim() || !age) {
			setError('Name and age are required.');
			return;
		}

		try {
			await createPerson(name, Number(age));
			setName('');
			setAge('');
			loadPersons(); // refresh the list after creating
		} catch (err) {
			console.error(err);
			setError('Failed to create person.');
		}
	}

	async function handleDelete(id: number) {
		try {
			await deletePerson(id);
			loadPersons(); // refresh the list after deleting
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