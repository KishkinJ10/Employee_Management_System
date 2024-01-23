
import AddTodo from './AddTodo'


const UpdateModal = ({ isOpen, onClose, onUpdate, todo , setEditData}) => {

 const handleUpdate = (updatedTodo) => {
  onUpdate(updatedTodo);
  // Close the modal after updating 
  onClose();
 }

  return (
    <>
      {isOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{backgroundColor:'	#D3D3D3'}}>
              <div className="modal-header">
                <h5 className="modal-title">Update Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                {/* Pass the todo and update function to the AddTodo component */}
                <AddTodo onUpdate={handleUpdate} editData={todo} setEditData={setEditData} />
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
