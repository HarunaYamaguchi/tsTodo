import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import { TextField, Grid, ListItem } from '@material-ui/core';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import { db } from './firebase';

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection('tasks').doc(props.id).set({ title:title },{ merge:true });
    //(merge:true):ドキュメント内のフィールドが更新されるか、存在しない場合は作成
  };

  const deleteTask = () => {
    db.collection('tasks').doc(props.id).delete();
  };

  return (
      <ListItem>
        <h2>{props.title}</h2>
        <Grid container justify="flex-end">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="編集"
            value={title}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
              setTitle(e.target.value)
            }
          />
        </Grid>
        <button className={styles.taskitem__icon} onClick={editTask}>
          <EditOutlined />
        </button>
        <button className={styles.taskitem__icon} onClick={deleteTask}>
          <DeleteOutline />
        </button>
      </ListItem>
  )
}

export default TaskItem;
