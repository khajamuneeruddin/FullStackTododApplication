import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("");

  // Fetch tasks from the API
  const apiCall = async () => {
    const url = "http://localhost:3000/home";
    const token = Cookies.get("jwtToken");

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.allTask);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    const url = "http://localhost:3000/home/add";
    const token = Cookies.get("jwtToken");

    if (newTaskName.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }

    const newTask = {
      taskName: newTaskName,
      status: "pending",
    };

    try {
      const response = await axios.post(url, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Append the new task to the existing tasks
      setTasks([...tasks, response.data.newTask]);
      setNewTaskName("");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  // Edit task
  const handleEditClick = (index) => {
    setEditingTaskIndex(index);
    setEditTaskName(tasks[index].taskName);
    setEditTaskStatus(tasks[index].status);
  };

  const handleStatusChange = (newStatus) => {
    setEditTaskStatus(newStatus);
  };

  // Save edited task
  const handleSaveClick = async () => {
    const updatedTask = {
      taskID: tasks[editingTaskIndex].taskID,
      taskName: editTaskName,
      status: editTaskStatus,
    };

    try {
      const url = `http://localhost:3000/home/${updatedTask.taskID}`;
      const token = Cookies.get("jwtToken");

      await axios.put(url, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = updatedTask;
      setTasks(updatedTasks);
      setEditingTaskIndex(null); // Exit edit mode
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  // Delete a task
  const handleDeleteClick = async (taskID, index) => {
    const url = `http://localhost:3000/home/${taskID}`;
    const token = Cookies.get("jwtToken");

    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove task from the state
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      alert("Failed to delete task");
      console.log(error.response.data.message);
    }
  };

  // Logout function
  const handleLogout = () => {
    Cookies.remove("jwtToken"); // Remove the JWT token
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="HomePage">
      <center>
        <h1 className="HomePageTag">Todo Application</h1>
      </center>
      <div className="CardMainDiv">
        <center className="centerDiv">
          <form className="addTaskBox" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="addTaskInputBox"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter new task"
            />
            <button
              className="btnAddTask"
              type="button"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </form>
        </center>
        <div>
          <table className="tableBox">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 &&
                tasks.map((item, index) => (
                  <tr key={item.taskID}>
                    <td>{index + 1}</td>
                    <td>
                      {editingTaskIndex === index ? (
                        <input
                          type="text"
                          className="TextBoxInLoop"
                          value={editTaskName}
                          onChange={(e) => setEditTaskName(e.target.value)}
                        />
                      ) : (
                        <span>{item.taskName}</span>
                      )}
                    </td>
                    <td>
                      {editingTaskIndex === index ? (
                        <select
                          className="statusDropdown"
                          value={editTaskStatus}
                          onChange={(e) => handleStatusChange(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      ) : (
                        <span>{item.status}</span>
                      )}
                    </td>
                    <td>
                      {editingTaskIndex === index ? (
                        <button onClick={handleSaveClick}>Save</button>
                      ) : (
                        <button onClick={() => handleEditClick(index)}>
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(item.taskID, index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <button className="btnLogout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
