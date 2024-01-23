
import './App.css';

import Todos from './MyComponents/Todos';

import AddTodo from './MyComponents/AddTodo';
import React , {useState , useEffect} from 'react';

import Example from './MyComponents/Example'


function App() {

  const [editData, setEditData] = useState(null);
 
  

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    setTodos(storedTodos || []);
  }, []);
  
  

  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }else{
    initTodo = JSON.parse(localStorage.getItem("todos"))
  }

  const onDelete = (todo)=>{
    console.log("I am onDelete of " , todo);

    const delTodos = todos.filter((e) => {
      return e!==todo;
    })
    // This is to set the index of the todo after deleting the todo 
    const delTodosWithSno = delTodos.map((todo , index) => ({
      ...todo,
      sno : index
    }))

    setTodos(delTodosWithSno)
    
    // setTodos(todos.filter((e) => {
    //     return e!==todo;
    // }))
    localStorage.setItem("todos" , JSON.stringify(delTodosWithSno));
  }

  const onUpdate = (updatedTodo) => {
    const index = todos.findIndex((todo) => todo.sno === updatedTodo.sno);
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
  
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  
    // Clear the editData state
    setEditData(null);
  };
  
  

  const addTodo = ( name , number , email , address , countryid , stateid , cityid , country , state , city)=>{
    
    let sno;
    if(todos.length==0){
      sno = 0;
    }else{
       sno = todos[todos.length-1].sno + 1;
    }
    
    const myTodo = {
      sno : sno,
      name:name,
      number : number,
      email:email,
      address:address,
      countryid : countryid,
      stateid : stateid,
      cityid : cityid,
      country : country,
      state : state,
      city : city
    }
    setTodos([...todos , myTodo]);
    console.log(myTodo);
    localStorage.setItem('todos', JSON.stringify([...todos, myTodo]));

  }

 const[todos , setTodos]= useState(initTodo);

 useEffect(() => {
  localStorage.setItem("todos" , JSON.stringify(todos));
} , [todos])


  return (
   <>

            <>
          <AddTodo addTodo={addTodo} onUpdate={onUpdate} editData={editData} setEditData={setEditData} />
<Todos todos={todos} onDelete={onDelete} onUpdate={onUpdate} setEditData={setEditData} />
     
            </>)
        
        
   </>
  );
}

export default App;
