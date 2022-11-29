import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { wsUpdateTodoItem } from './webServiceHelpers';
import styles from './styles/SingleTodoItem.module.css';

function SingleTodoItem(props) {
  // child of TodoList
  const [isDone, setIsDone] = useState(props.done);
  const [isCritical, setIsCritical] = useState(props.critical);

  function cssClasses() {
    let classes = isCritical ? [styles.critical] : [styles.todo];

    if (isDone) {
      classes = [...classes, styles.done];
    }
    return classes.join(' ');
  }

  async function updateTodoItem(toUpdate) {
    const {status} = await wsUpdateTodoItem(props.id, toUpdate);
    if (status === 200) {
      toUpdate === 'critical' ? setIsCritical(!isCritical) :
      setIsDone(!isDone);
    }
  }
  
  return (
    <div className={cssClasses()}>
      {props.description}
      <br />
      <hr className={styles.hrGradient}/>
      <ButtonGroup>
        <Button color='secondary' onClick={() => updateTodoItem('critical')}>Mark as Critical</Button>
        <Button color='outline-success' onClick={() => updateTodoItem('done')}>Mark as Done</Button>
        <Button color='outline-danger' onClick={() => props.removeTodoItem(props.id)}>Remove</Button>
      </ButtonGroup>
    </div>
  );
}

export default SingleTodoItem;