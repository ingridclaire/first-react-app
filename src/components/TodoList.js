import React, { useEffect, useState } from 'react';
import { wsAddTodoItem, wsRemoveTodoItem } from './webServiceHelpers';
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

  async function addTodoItem(itemObject) {
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
      <AddNewTodoItem addTodoItem={(i) => addTodoItem(i)} />
      {renderTodoItems()}
    </div>
  );
}

export default TodoList;