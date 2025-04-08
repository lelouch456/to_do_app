import { ADD_TASK, DELETE_TASK, UPDATE_TASK_PRIORITY } from '../actions/taskActions';

const localStorageMiddleware = store => next => action => {
  // Process the action first
  const result = next(action);
  
  // After state changes, update localStorage for certain actions
  switch (action.type) {
    case ADD_TASK:
    case DELETE_TASK:
    case UPDATE_TASK_PRIORITY:
      const { tasks } = store.getState().tasks;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      break;
    default:
      break;
  }
  
  return result;
};

export default localStorageMiddleware;
