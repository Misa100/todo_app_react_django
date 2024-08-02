import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Charger les todos depuis l'API au montage du composant
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todos/')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Erreur lors du chargement des todos:', error));
    }, []);

    // Ajouter un nouveau todo
    const addTodo = () => {
        axios.post('http://127.0.0.1:8000/api/todos/', { title: newTodo, completed: false })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Erreur lors de l\'ajout du todo:', error));
        setNewTodo('');  // Réinitialiser le champ d'ajout
    };

    // Supprimer un todo
    const deleteTodo = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('Erreur lors de la suppression du todo:', error));
    };

    // Marquer un todo comme complété
    const toggleTodo = (id, completed) => {
        axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, { completed: !completed })
            .then(response => {
                setTodos(todos.map(todo => todo.id === id ? response.data : todo));
            })
            .catch(error => console.error('Erreur lors de la mise à jour du todo:', error));
    };

    return (
        <div>
            <h1>Todo App</h1>
            <input 
                type="text" 
                value={newTodo} 
                onChange={e => setNewTodo(e.target.value)} 
                placeholder="Ajouter une nouvelle tâche" 
            />
            <button onClick={addTodo}>Ajouter</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span 
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleTodo(todo.id, todo.completed)}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
