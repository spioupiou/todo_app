import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddTask from './AddTask'
import TaskList from './TaskList'
import EditTask from './EditTask'
import './App.css'

const Navbar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opactity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

const App = () => {
  return (
    <>
      <Navbar>
        <Logo>
          TODO
        </Logo>
        <NavItems>
          <NavItem>
            <Link to="/tasks">
              Tasks
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/tasks/new">
              Add New Task
            </Link>
          </NavItem>
        </NavItems>
      </Navbar>
      <Wrapper>
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<AddTask />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
        </Routes>
      </Wrapper>
    </>
  );
};

export default App;
