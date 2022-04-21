import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ImCheckboxChecked, ImCheckboxUnchecked} from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'

const SearchButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const RemoveAllButton = styled.button`
  width: 16%
  height: 40px;
  background: #f54242;
  border: none;
  font-weght: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`

const TaskName = styled.span`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios.get('/api/v1/tasks.json')
    .then(resp => {
      console.log(resp.data)
      setTasks(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  const removeAllTasks = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete('/api/v1/tasks/destroy_all')
      .then(resp => {
        setTasks([])
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  const updateIsCompleted = (index, value) => {
    var data = {
      id: value.id,
      name: value.name,
      is_completed: !value.is_completed
    }
    axios.patch(`/api/v1/tasks/${value.id}`, data)
    .then(resp => {
      const newTasks = [...tasks]
      newTasks[index].is_completed = resp.data.is_completed
      setTasks(newTasks)
    })
  }

  return (
    <>
      <h1>Tasks</h1>
      <SearchButton>
        <SearchForm
          type="text"
          placeholder="Search task..."
          onChange={event => {
            setSearchName(event.target.value)
          }}
        />
        <RemoveAllButton onClick={removeAllTasks}>
          Remove All
        </RemoveAllButton>
      </SearchButton>

      <div>
        {tasks.filter((value) => {
          if (searchName === "") {
            return value
          } else if (value.name.toLowerCase().includes(searchName.toLowerCase())) {
            return value
          }
        }).map((value, key) => {
          return (
            <Row key={key}>
              {value.is_completed ? (
                <CheckedBox>
                  <ImCheckboxChecked onClick={() => updateIsCompleted(key, value)} />
                </CheckedBox>
              ) : (
                <UncheckedBox>
                    <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, value)} />
                </UncheckedBox>
              )}
              <TaskName is_completed={value.is_completed}>
                {value.name}
              </TaskName>
              <Link to={"/tasks/" + value.id + "/edit"}>
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          )
        })}
      </div>
    </>
  );
};

export default TaskList;
