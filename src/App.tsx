import React, { useState, useEffect } from 'react';
import { FormControl,TextField } from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import './App.css';
import { db } from './firebase';

const App: React.FC = () =>  {
  const [ tasks, setTasks ] = useState([{ id: "", title: "" }]);
  const [ input, setInput ] = useState("");

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub()
  },[])

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input })
    setInput("");
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <FormControl>
        <TextField 
          label="追加"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
        }
        />
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        <AddToPhotos />
      </button>

     {tasks.map((task, index) => (
        <h3 key={index}>{task.title}</h3>
     ))}
    </div>
  );
}

export default App;
