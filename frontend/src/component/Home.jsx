import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));
  const navigate = useNavigate(); // for redirecting after login
  const [week, setWeek] = useState("1"); // default selected value

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.reload();

  }
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [filter, setFilter] = useState('all'); // options: all, completed, upcoming, etc.
  const calculateDueDate = (weeks) => {
    const today = new Date();
    const addedDays = parseInt(weeks) * 7;
    today.setDate(today.getDate() + addedDays);
    return today.toISOString(); // or .toDateString() if needed
  };

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
      .then(data => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.error("Invalid data format from server:", data);
          setTodos([]); // fallback to empty array
        }
      })
      .catch(err => console.error(err));
  }, []);
  // const handleUnauthorized = () => {
  //   alert("Session expired. Please log in again.");
  //   localStorage.removeItem("token");
  //   navigate('/Login')
  // };
  const addTodo = async () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const dueDate = calculateDueDate(week);
    const res = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ task, dueDate, week })
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
              <li onClick={() => setFilter('all')}
              ><i className="fas fa-list-ul"></i> All Tasks</li>
              <li onClick={() => setFilter('completed')}
              ><i className="fas fa-clipboard-check"></i> Completed</li>
              <li onClick={() => setFilter('today')}>
                <i className="fas fa-calendar-day"></i> Today</li>
              <li onClick={() => setFilter('upcoming')}><i className="fas fa-calendar-alt"></i> Upcoming</li>
              <li onClick={() => setFilter('archived')}><i className="fas fa-archive"></i> Archived</li>
            </ul>
          </nav>
          <div className="add-task-sidebar" >
            <button id="login" onClick={logout} ><Link to="/" style={{
              textDecoration: 'none',
              color: 'black', background: 'none'
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
            <select value={week} onChange={(e) => setWeek(e.target.value)}
              style={{
                width: '10vmin', background: '#fff', padding: '2vmin'
              }}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <button onClick={addTodo} style={{
              borderRadius: '10px', border: 'none',
              background: '#fff', fontSize: '18px'
            }}>Add</button>
          </div>
          <div className="ulList">
            <ul id="todoList">
              {todos.filter(todo => {
                const today = new Date();
                const dueDate = new Date(todo.dueDate);
                const todoWeek = Number(todo.week); // Ensure number comparison

                if (filter === 'completed') return todo.isCompleted;
                if (filter === 'today') return todoWeek === 1;
                if (filter === 'upcoming') return todoWeek > 1;
                if (filter === 'archived') return dueDate < new Date() && !todo.isCompleted;
                return true;
              }).map((todo) => (
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
