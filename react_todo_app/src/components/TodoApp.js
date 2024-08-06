import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TodoApp.css';

const API_URL = process.env.REACT_APP_API_URL;

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/todos/`)
            .then(response => {
                const todosWithCheckState = response.data.map(todo => ({
                    ...todo,
                    isChecked: todo.completed // Initialise `isChecked` avec la valeur de `completed`
                }));
                setTodos(todosWithCheckState);
            })
            .catch(error => console.error('Erreur lors du chargement des todos:', error));
    }, []);

    const addTodo = () => {
        if (newTitle.trim() === '') return;
        axios.post(`${API_URL}/todos/`, { title: newTitle, completed: false })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Erreur lors de l\'ajout du todo:', error));
        setNewTitle('');
    };

    const deleteTodo = (id) => {
        axios.delete(`${API_URL}/todos/${id}/`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('Erreur lors de la suppression du todo:', error));
    };

    const toggleTodo = (id, isChecked) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                const updatedTodo = { ...todo, isChecked: !isChecked };
                axios.put(`${API_URL}/todos/${id}/`, {
                    title: updatedTodo.title,
                    completed: updatedTodo.isChecked
                })
                .then(response => {
                        // Mettez à jour l'état complet du todo après la réponse du serveur
                        return response.data;
                    })
                    .catch(error => console.error('Erreur lors de la mise à jour du todo:', error));
                return updatedTodo;
            }
            return todo;
        });
        setTodos(updatedTodos); // Mettre à jour l'état local
    };

    const handleEdit = (id, title) => {
        setEditingTodoId(id);
        setEditTitle(title);
    };

    const handleSave = (id) => {
        axios.put(`${API_URL}/todos/${id}/`, { title: editTitle })
            .then(response => {
                setTodos(todos.map(todo => todo.id === id ? response.data : todo));
                setEditingTodoId(null);
                setEditTitle('');
            })
            .catch(error => console.error('Erreur lors de la mise à jour du titre:', error));
    };

    const handleKeyDown = (event, id) => {
        if (event.key === 'Enter') {
            handleSave(id);
        }
    };

    return (
        <div className="todo-container">
            <h1 className="text-center todo-title">Your Todo List</h1>
            <div className="card todo-card">
                <div className="card-body">
                    <ul className="list-group mb-3">
                        {todos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                isEditing={editingTodoId === todo.id}
                                editTitle={editTitle}
                                onEdit={handleEdit}
                                onSave={handleSave}
                                onDelete={deleteTodo}
                                onToggle={toggleTodo}
                                setEditTitle={setEditTitle}
                                handleKeyDown={handleKeyDown}
                            />
                        ))}
                    </ul>
                    <TodoForm
                        newTitle={newTitle}
                        setNewTitle={setNewTitle}
                        onAdd={addTodo}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoApp;
