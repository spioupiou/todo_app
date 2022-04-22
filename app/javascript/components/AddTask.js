import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiSend } from 'react-icons/fi'

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1E90FF;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: default;
  `}
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

toast.configure()

const AddTask = (props) => {
  const initialTaskState = {
    id: null,
    name: "",
    is_completed: false
  };

  const [task, setTask] = useState(initialTaskState);

  const notify = () => {
    toast.success("Task successfully created!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {
    var data = {
      name: task.name,
    };

    axios.post('/api/v1/tasks', data)
      .then(resp => {
        setTask({
          id: resp.data.id,
          name: resp.data.name,
          is_completed: resp.data.is_completed
        });
        notify();
        //window.location.href = '/tasks';
      })
      .catch(e => {
        console.log(e)
      })
  };


  return (
    <>
      <h1>New Task</h1>
      <InputAndButton>
        <InputName
          type="text"
          required
          value={task.name}
          onChange={handleInputChange}
          name="name"
        />
        <Button
          onClick={saveTask}
          disabled={(!task.name || /^\s*$/.test(task.name))}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  )
}

export default AddTask
