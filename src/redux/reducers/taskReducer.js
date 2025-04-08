import {
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK_PRIORITY,
    SET_WEATHER_DATA,
    SET_WEATHER_ERROR
  } from '../actions/taskActions';
  
  const initialState = {
    tasks: [],
    weatherData: {},
    weatherError: null
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TASK:
        return {
          ...state,
          tasks: [...state.tasks, action.payload]
        };
      
      case DELETE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload)
        };
      
      case UPDATE_TASK_PRIORITY:
        return {
          ...state,
          tasks: state.tasks.map(task => 
            task.id === action.payload.id 
              ? { ...task, priority: action.payload.priority } 
              : task
          )
        };
      
      case SET_WEATHER_DATA:
        return {
          ...state,
          weatherData: {
            ...state.weatherData,
            [action.payload.location]: action.payload.data
          },
          weatherError: null
        };
      
      case SET_WEATHER_ERROR:
        return {
          ...state,
          weatherError: action.payload
        };
      
      default:
        return state;
    }
  };
  
  export default taskReducer;
  