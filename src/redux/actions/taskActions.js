import { fetchWeatherData } from '../../api/weatherApi';

// Action Types
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK_PRIORITY = 'UPDATE_TASK_PRIORITY';
export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
export const SET_WEATHER_ERROR = 'SET_WEATHER_ERROR';

// Action Creators
export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId
});

export const updateTaskPriority = (taskId, priority) => ({
  type: UPDATE_TASK_PRIORITY,
  payload: { id: taskId, priority }
});

export const setWeatherData = (location, data) => ({
  type: SET_WEATHER_DATA,
  payload: { location, data }
});

export const setWeatherError = (error) => ({
  type: SET_WEATHER_ERROR,
  payload: error
});

// Thunk for fetching weather data
export const getWeatherForLocation = (location) => async (dispatch) => {
  try {
    const data = await fetchWeatherData(location);
    dispatch(setWeatherData(location, data));
  } catch (error) {
    dispatch(setWeatherError(`Failed to fetch weather data: ${error.message}`));
  }
};
