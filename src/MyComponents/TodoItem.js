  import React, { useState } from "react";
  import UpdateModal from "./UpdateModal";

  const TodoItem = ({ todo, onDelete, onUpdate, setEditData  }) => {

    const[isModalOpen , setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
    }

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Emp Name</th>
              <th scope="col">Emp Number</th>
              <th scope="col">Emp Email</th>
              <th scope="col">Address</th>
              <th scope="col">Country</th>
              <th scope="col">State</th>
              <th scope="col">City</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{todo.sno}</th>
              <td>{todo.name}</td>
              <td>{todo.number}</td>
              <td>{todo.email}</td>
              <td>{todo.address}</td>
              <td>{todo.country}</td>
              <td>{todo.state}</td>
              <td>{todo.city}</td>
            
              <td className="d-flex justify-content-around align-items-center">
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo)}>
            Delete
          </button>
          <button className="btn btn-sm btn-warning" onClick={() => openModal()}>
            Update
          </button>
        </td>
            </tr>
          </tbody>
        </table>

        <UpdateModal isOpen={isModalOpen} 
        onClose={closeModal}
        onUpdate={onUpdate}
        todo={todo}
        setEditData={setEditData}

        />

      </div>
    );
  };

  export default TodoItem;

