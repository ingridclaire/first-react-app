import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { wsUpdateTodoItem } from './webServiceHelpers';
import styles from './styles/SingleTodoItem.module.css';

// destructure props
function SingleTodoItem({ id, description, done, critical, removeTodoItem, updateTodoItem }) {
  // child of TodoList
  // don't make state variable for done or critical because they are already in state and passed as a prop
  // const [isDone, setIsDone] = useState(props.done);
  // const [isCritical, setIsCritical] = useState(props.critical);

  function cssClasses() {
    // let classes = isCritical ? [styles.critical] : [styles.todo];
    let classes = critical ? [styles.critical] : [styles.todo];

    // if (isDone) {
    if (done) {
      classes = [...classes, styles.done];
    }
    return classes.join(' ');
  }

  //DEFINE UPDATE FN IN TODOLIST because it will update the array of items in state
  // instead of updating this one item in its own state, it would be better to update the data source both on the backend (which you've done) and also in the state...the state for this item is actually in the array of items in TodoList - that's what should be updated. if not, then there will be mismatching data (the array of items will show this item one way, while this local state is showing the item a different way)

  // items can be udpated either by triggering another fetch of the items OR by updating the array in state 

  // since this function will need to update items, you'll want to have a function defined in the TodoList component that can update the array of items in state, since that array belongs to TodoList's state

  // async function updateTodoItem(toUpdate, id) {
  //   const { status } = await wsUpdateTodoItem(props.id, toUpdate);
  //   if (status === 200) {

  //     toUpdate === 'critical' ? setIsCritical(!isCritical) :
  //       setIsDone(!isDone);
  //   }
  // }

  return (
    <div className={cssClasses()}>
      {/* {props.description} */}
      {description}
      <br />
      <hr className={styles.hrGradient} />
      <ButtonGroup>
        {/* <Button color='secondary' onClick={() => updateTodoItem('critical')}>Mark as Critical</Button> */}
        <Button color='secondary' onClick={() => updateTodoItem('critical', id)}>Mark as Critical</Button>
        {/* <Button color='outline-success' onClick={() => updateTodoItem('done')}>Mark as Done</Button> */}
        <Button color='outline-success' onClick={() => updateTodoItem('done', id)}>Mark as Done</Button>
        {/* <Button color='outline-danger' onClick={() => props.removeTodoItem(props.id)}>Remove</Button> */}
        <Button color='outline-danger' onClick={() => removeTodoItem(id)}>Remove</Button>
      </ButtonGroup>
    </div>
  );
}

export default SingleTodoItem;