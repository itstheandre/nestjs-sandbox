import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { PORT } from './lib/serverPort';
import { initialVal } from './lib/initialVal';
import { Task, TaskStatus } from './lib/interfaces/ITask.interface';
import TaskComponent from './components/task';
console.log('PORT:', PORT);

export interface TaskDBRes {
  updated: Task[];
  // deleted?: Task;
  // changed?: Task;
}

export interface TaskDelete extends TaskDBRes {
  deleted: Task;
}
export interface TaskUpdateInfo extends TaskDBRes {
  changed: Task;
}

interface IAxiosTasks extends AxiosResponse {
  data: TaskUpdateInfo & TaskDelete;
}

function App() {
  const [tasks, setTasks] = useState<any>([]);
  const [newTask, setNewTask] = useState({ ...initialVal });
  useEffect(() => {
    async function getTasks(): Promise<any> {
      // console.log(process.env.REACT_APP_test);
      const { data }: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/tasks`,
      );
      setTasks([...tasks, ...data]);
      console.log('allTasks:', data);
    }

    getTasks();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data }: AxiosResponse = await axios.post(`${PORT}/tasks`, {
      ...newTask,
    });
    setTasks([...tasks, data]);
    setNewTask(initialVal);
    console.log('res:', data);
  }

  async function deleteTask(id: string) {
    const { data }: IAxiosTasks = await axios.delete(`/tasks/${id}`);
    console.log('data:', data);
    setTasks(data.updated);
  }

  async function consoleThatOne(id: string) {
    const { data }: AxiosResponse = await axios.get(`${PORT}/tasks/${id}`);
    console.log('data:', data);
  }

  async function updateTask(
    id: string,
    status: TaskStatus | string,
  ): Promise<TaskUpdateInfo['changed']> {
    const { data }: IAxiosTasks = await axios.put(`${PORT}/tasks/${id}`, {
      status,
    });

    console.log(data);
    setTasks(data.updated);
    return data.changed;
  }

  console.log(tasks);

  return (
    <div className="App">
      <header className="App-header">
        {tasks.map((el: Task) => (
          <TaskComponent
            deleteTask={deleteTask}
            updateTask={updateTask}
            consoleThatOne={consoleThatOne}
            {...el}
          />
        ))}
        {/* {tasks.length > 0 &&
          tasks.map((el: Task) => (
            <div key={el.id}>
              <p>{el.title}</p>
              <p>{el.description}</p>
              <button onClick={() => consoleThatOne(el.id as string)}>
                Click for console
              </button>
              <br />
              <button onClick={() => deleteTask(el.id as string)}>
                Delete me!
              </button>
            </div>
          ))} */}

        <form onSubmit={onSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTask({ ...newTask, [e.target.name]: e.target.value })
            }
          />
          <label htmlFor="">Description</label>
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTask({ ...newTask, [e.target.name]: e.target.value })
            }
          />

          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
