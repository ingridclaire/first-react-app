async function wsAddTodoItem(itemObject) {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      description: itemObject.description,
      done: itemObject.done,
      critical: itemObject.critical
    })
  });
  const serverAssignedId = await response.json()
  return {status: response.status, id: serverAssignedId.newId}
}

async function wsRemoveTodoItem(itemId) {
  const response = await fetch(`/api/todos/${itemId}`, {
    method: 'DELETE',
    headers: {accept: 'application/json', 'content-type': 'application/json'}
  });
  return {status: response.status}
}

async function wsUpdateTodoItem(itemId, toUpdate) {
  const response = await fetch(`/api/todos/${itemId}`, {
    method: 'PUT',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      toUpdate: toUpdate
    })
  });
  return {status: response.status}
}

export {wsAddTodoItem, wsRemoveTodoItem, wsUpdateTodoItem}