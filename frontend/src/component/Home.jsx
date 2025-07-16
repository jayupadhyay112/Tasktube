import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem('token') );
    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        window.location.reload();

    }
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  useEffect(() => {
    fetch('http://localhost:5000/api/items', {
      headers: { 'Authorization': `Bearer ${token}` }
    }) // Adjust path as needed
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          handleUnauthorized();
          return;
        }
        return res.json();
      })
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  }, []);
  // const handleUnauthorized = () => {
  //   alert("Session expired. Please log in again.");
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // };
  const addTodo = async () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const res = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ task })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };
  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const updated = await res.json();
    setTodos(todos.map(todo => todo._id === id ? updated : todo));
  };


  return (
    <>
      <div className="mainFrame" style={{ display: 'flex' }}>
        <aside className="sidebar">
          <nav>
            <ul >
              <li className="active"><i className="fas fa-calendar-day"></i> Today</li>
              <li><i className="fas fa-calendar-alt"></i> Upcoming</li>
              <li><i className="fas fa-clipboard-check"></i> Completed</li>
              <li><i className="fas fa-list-ul"></i> All Tasks</li>
              <li><i className="fas fa-archive"></i> Archived</li>
            </ul>
          </nav>
          <div className="add-task-sidebar" >
            <button id="login" onClick={logout}><Link to="/login" style={{ textDecoration:'none',
              color:'black', background:'none'
            }}>Logout</Link>
            </button>
          </div>
        </aside>
        <div className="container" >
          <h1>To-Do List</h1>
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <div className="ulList">
          <ul id="todoList">
            {todos.map((todo) => (
              <li key={todo._id}
                style={{
                  width: '100vh',
                  height: '5vmin',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <input
                  type="checkbox"
                  id="check"
                  checked={todo.isCompleted}
                  onChange={() => toggleTodo(todo._id)}
                />
                <span className={todo.isCompleted ? "completed" : ""} style={{ background: 'none' }}>
                  {todo.todo}
                </span>
                <button id="cross" onClick={() => deleteTodo(todo._id)}>❌</button>
              </li>
            ))}
          </ul>
          </div>
        </div >
      </div>
    </>
  );

};

export default Home;
