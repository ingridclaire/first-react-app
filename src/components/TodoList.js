import React, { useEffect, useState } from 'react';
import { wsAddTodoItem, wsRemoveTodoItem, wsUpdateTodoItem } from './webServiceHelpers';
import SingleTodoItem from './SingleTodoItem';
import AddNewTodoItem from './AddNewTodoItem';
import styles from './styles/TodoList.module.css';

function TodoList() {
  // Parent class of our app, child only to App itself
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const fetchedTodos = await (await fetch('/api/todos', {accept: 'application/json'})).json();
      setItems(fetchedTodos.todos);
      setLoaded(true);
    })();
  }, []);
  useEffect(() => {
    document.title = `${items.length} tasks todo`;
  }, [items.length])

  // async function addTodoItem(itemObject) {
  async function addTodoItem(itemText) {
    // may be a bit cleaner to define this object here before sending to server, that way string alone can be passed in as arg
    const itemObject = {
      description: itemText,
      done: false,
      critical: false
    }
    // const {status, id} = await wsAddTodoItem(itemObject);
    const {status, id} = await wsAddTodoItem(itemObject);
    if (status === 200) {
      itemObject.id = id;
      setItems([...items, itemObject]);
    }
  }

  async function removeTodoItem(itemId) {
    const {status} = await wsRemoveTodoItem(itemId);
    if (status === 200) {
      const filteredItems = items.filter((item) => {
        return item.id !== itemId;
      });
      setItems(filteredItems);
    }
  }

  // just like you defined removeItem here in TodoList, you'll also want to define updateItem here as well
  // add a parameter for the id to identify which item needs updating
  async function updateTodoItem(toUpdate, id) {
    const {status} = await wsUpdateTodoItem(id, toUpdate);
    if (status === 200) {
      // instead of updating this one item in its own state, it would be better to update the data source both on the backend (which you've done) and also in the state...the state for this item is actually in the array of items in TodoList - that's what should be updated. if not, then there will be mismatching data (the array of items will show this item one way, while this local state is showing the item a different way)
      // items can be udpated either by triggering another fetch of the items OR by updating the array in state 
      // since this function will need to update items, you'll want to have a function defined in the TodoList component that can update the array of items in state, since that array belongs to TodoList's state
      const updatedItems = items.map(item => {
        if (item.id === id) {
          toUpdate === 'critical' ? item.critical = !item.critical : item.done = !item.done
        }
        return item
      })
      setItems(updatedItems)
      // alternatively to line 48-54, you could fetch items again from server and set in state
    }
  }
  // a common pattern that's used instead of writing functions to return the desired jsx, is to use ternaries directly in JSX below (I put example below)
  function renderTodoItems() {
    if (loaded) {
      return items.map((item) => (
        <SingleTodoItem
          key={item.id}
          id={item.id}
          description={item.description}
          done={item.done}
          critical={item.critical}
          removeTodoItem={(i) => removeTodoItem(i)} />
        ));
    } else return <p>[!] Data is loading<br />[+] Please wait</p>;
  }
  
  return (
    <div className={styles.todoList}>
      {/* <AddNewTodoItem addTodoItem={(i) => addTodoItem(i)} /> */}
      {/* use the anonymous function to invoke addTodoItem in the child component's event handler */}
      <AddNewTodoItem addTodoItem={addTodoItem} />
      {/* {renderTodoItems()} */}
      {loaded ? items.map((item) => (
        <SingleTodoItem
          key={item.id}
          id={item.id}
          description={item.description}
          done={item.done}
          critical={item.critical}
          // removeTodoItem={(i) => removeTodoItem(i)} />
          removeTodoItem={removeTodoItem}
          updateTodoItem={updateTodoItem} />
        )) : (
          <p>[!] Data is loading<br />[+] Please wait</p>
        )}
    </div>
  );
}

export default TodoList;