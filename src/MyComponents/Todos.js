import React from 'react';
import TodoItem from './TodoItem';

const Todos = ({ todos, onDelete, onUpdate, setEditData }) => {
  return (
    <div className="container">
      <hr/>
      <h3 className="text-center my-4">Employees List</h3>
      {todos.length === 0 ? (
        <h3 className="text-center my-3">
          <div className="alert alert-danger" role="alert">
            No Employees to display!
          </div>
        </h3>
      ) : (
        todos.map((todo) => (
          <div key={todo.sno}>
            <TodoItem todo={todo} onDelete={onDelete} onUpdate={onUpdate} setEditData={setEditData} />
            <hr />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};





export default Todos
