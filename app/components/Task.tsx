"use client"

import { ITask } from "@/tasks"
import React, { FormEventHandler, useState } from "react"
import { FiEdit } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
// import {v4 as uuidv4} from "uuid"
interface TaskProps{
  task:ITask
}

const Task:React.FC<TaskProps> = ({task }) => {
  const router=useRouter()
  const [openModalEdit,setOpenModalEdit]=useState<boolean>(false);
  const [openModalDelete,setOpenmodalDelete]=useState<boolean>(false);
  const [taskToEdit,setTaskToEdit]=useState<string>(task.text)
  const handleSubmitEditTodo:FormEventHandler<HTMLFormElement>= async (e)=>{
    e.preventDefault();
    await editTodo({
      id:task.id,
      text:taskToEdit
    })
    
    setOpenModalEdit(false)
    router.refresh();
  }
const handleDeleteTask=async (id:string)=>{
  await deleteTodo(id);
  setOpenmodalDelete(false);
  router.refresh();
}
  
  return (
    <tr key={task.id}>
       
        <td className="w-full ">{task.text}</td>

        <td><FiEdit onClick={()=>setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
           <form onSubmit={handleSubmitEditTodo} >
            <h3 className='font-bold text-lg'>Edit</h3>
            <div className='modal-action'>
              <input 
              value={taskToEdit}
              onChange={e=> setTaskToEdit(e.target.value)}
              type="text"
              placeholder='Type here'
              className='input input-bordered w-full ' />
              <button type='submit' className='btn '> Submit</button>
            </div>
           </form>
        </Modal>
        <BsTrash3 onClick={()=>setOpenmodalDelete(true)} cursor="pointer" className="text-red-600" size={25}/>
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenmodalDelete}>
           <h3 className="text-lg">Are you Sure you want to delete this task</h3>
           <div className="modal-action">
            <button onClick={()=> handleDeleteTask(task.id)} className="btn">Yes</button>
           </div>
        </Modal>
        </td>
      </tr>
  )
}

export default Task