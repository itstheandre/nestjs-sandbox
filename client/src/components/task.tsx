import React, { useState } from 'react';
import { TaskStatus, Task } from '../lib/interfaces/ITask.interface';
import { TaskDBRes, TaskUpdateInfo } from '../App';

interface Props extends Task {
  deleteTask: (id: string) => void;
  consoleThatOne: (id: string) => void;
  updateTask: (id: string, status: TaskStatus | string) => Promise<Task>;
}

const TaskComponent = ({
  deleteTask,
  status,
  updateTask,
  consoleThatOne,
  title,
  description,
  id,
}: Props) => {
  const [statusState, setStatusState] = useState<TaskStatus>(status);
  const [inputValid, setInputValid] = useState<boolean>(false);

  console.log(TaskStatus);

  async function change(
    e: React.ChangeEvent<HTMLSelectElement>,
  ): Promise<void> {
    setInputValid(false);
    const res = await updateTask(id, e.target.value);
    setStatusState(res.status);
    //  setStatusState(res.status);
    //  const changed: TaskUpdateInfo["changed"] = await updateTask(id, e.target.value);
    //   setStatusState(changed);
  }

  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <p>{status}</p>
      <button onClick={() => consoleThatOne(id)}>Click for console</button>
      <br />
      <button onClick={() => deleteTask(id)}>Delete Task</button>
      <br />
      <button onClick={() => setInputValid((c) => !c)}>Update this task</button>
      {inputValid && (
        <select
          value={status}
          onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
            change(e);
          }}
        >
          {Object.keys(TaskStatus).map((el: any, i: number) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default TaskComponent;
