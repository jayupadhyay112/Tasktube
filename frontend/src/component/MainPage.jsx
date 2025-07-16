 import React from "react";
 import { Outlet,Link } from "react-router-dom";
 const MainPage=()=>{
  return(
    <>
    <div className="body">
        <div id="left">
          <h1>TaskTube</h1>
          <h2>"Your Daily Hub for Tasks, Talks, and Tutorials."</h2>
          <h3>A smart platform that helps you manage tasks, chat with AI, and explore YouTube tutorials—all in one place.</h3>
          <button id="Try"><Link to="/Signup" style={{
            background:'none',
            color:'Black',
            textDecoration:'none'
          }}> Try Now!</Link></button>
        </div>
        <div id="right">
          <ul className="todo">
            <li>Add Task➕</li>
            <li>✅   Your Task   ❌</li>
            <li>✅   Your Task   ❌</li>
            <li>✅   Your Task   ❌</li>
            <li>✅   Your Task   ❌</li>
            <li>✅   Your Task   ❌</li>
          </ul>
        </div>
      </div>
    </>
  )
 }
 export default MainPage
