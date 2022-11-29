import React, { useState } from "react";
import { Button, Input, InputGroup } from 'reactstrap';
import styles from './styles/AddNewTodoItem.module.css';

function AddNewTodoItem(props) {
  // child of TodoList
  const [item, setItem] = useState('');

  function passNewItemObject() {
    const itemObject = {
      description: item,
      done: false,
      critical: false
    }
    props.addTodoItem(itemObject)
  }
  
  return (
    <div className={styles.addNewTodoItem}>
      <InputGroup>
        <Input type="text" onChange={(e) => setItem(e.target.value)} placeholder='add todo task'/>
        &nbsp;&nbsp;
        <Button color="primary" onClick={() => passNewItemObject()}>Add</Button>
      </InputGroup>
    </div>
  );
}

export default AddNewTodoItem;