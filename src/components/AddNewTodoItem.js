import React, { useState } from "react";
import { Button, Input, InputGroup } from 'reactstrap';
import styles from './styles/AddNewTodoItem.module.css';

// common pattern is to destructure any passed props like line below
function AddNewTodoItem({ addTodoItem }) {
  // child of TodoList
  const [item, setItem] = useState('');

  // you could forgo this fn definition by invoking addTodoItem directly on the onClick event handler
  function passNewItemObject() {
    const itemObject = {
      description: item,
      done: false,
      critical: false
    }
    addTodoItem(itemObject)
  }

  return (
    <div className={styles.addNewTodoItem}>
      <InputGroup>
        <Input type="text" onChange={(e) => setItem(e.target.value)} placeholder='add todo task' />
        &nbsp;&nbsp;
        {/* <Button color="primary" onClick={() => passNewItemObject()}>Add</Button> */}
        {/* may be a little cleaner to just accept the todo item string as argument, and add other properties in fn definition */}
        <Button color="primary" onClick={() => addTodoItem(item)}>Add</Button>
      </InputGroup>
    </div>
  );
}

export default AddNewTodoItem;