import React from 'react'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { EditForm } from './EditForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
uuidv4();

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask,setNewTask] =useState("");
  
  function handleInputChange(event){
    setNewTask(event.target.value);
  }

  function addTask(event){
    event.preventDefault(); 
    if (newTask.trim() !== "") {
      setTasks([...tasks, {id: uuidv4() , task: newTask, completed: false , isEditing: false}]);
      setNewTask(""); 
      console.log(tasks)
    }
  }

  function deleteTask(Id){
    setTasks(tasks.filter(task => task.id !== Id));

  }
  // const editTask = (item,id) => {
  //   // Function to edit task
  //   const newTask = prompt(item.task);
  //   if (newTask) {
  //     setTasks(
  //       tasks.map((task) =>
  //         task.id === id ? { ...task, task: newTask } : task
  //       )
  //     );
  //   }
  // };
 
  const editTodo = (id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  } 

  const editTask = (task, id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  


  const toggleComplete=(id) =>{
    setTasks(tasks.map((item)=>
    item.id===id?{...item,completed: !item.completed } : item))
  }

  return (
    <div className='to-do-list'>
        <h1>To Do List   </h1>
        <div>
          <form className='toDoForm' onSubmit={addTask}>
            
            <input 
            className='formInput'
            type="text" 
            placeholder='Enter the task...'  
            value={newTask}
            onChange={(handleInputChange)}
            />
            <button className="sub-btn" type='submit'>Add Task</button>
          </form>
        </div>
       <div className='displayToDo'>
          {tasks.map((item) =>(
             item.isEditing ? (
              <EditForm editTodo={editTask} task={item} />
            ) :
          (  
          <div className='display'>
            
            <p className={`${item.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(item.id)}>{item.task}</p>
            <div className='icon'>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={()=>editTodo(item.id)}  />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={ ()=>deleteTask(item.id)} />
        </div>
        </div>
        
      )
    ))}
        </div>
        
        
    </div>
    
  )
}

export default ToDoList
