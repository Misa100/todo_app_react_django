import React from 'react';

const TodoForm = ({ newTitle, setNewTitle, onAdd }) => {
    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Add a new task..."
            />
            <div className="input-group-append">
                <button className="btn btn-pink" onClick={onAdd}>Add</button>
            </div>
        </div>
    );
};

export default TodoForm;
