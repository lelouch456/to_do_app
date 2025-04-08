import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Typography, 
  Box, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { loadTasksFromStorage } from '../../utils/localStorage';
import { addTask } from '../../redux/actions/taskActions';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const weatherError = useSelector(state => state.tasks.weatherError);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    if (tasks.length === 0) {
      const savedTasks = loadTasksFromStorage();
      savedTasks.forEach(task => {
        dispatch(addTask(task));
      });
    }
  }, [dispatch, tasks.length]);

  // Sort tasks by priority
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Container className="task-list-container">
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          Welcome back, {user?.name || 'User'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your tasks efficiently
        </Typography>
      </Box>

      <TaskInput />

      {weatherError && (
        <Alert severity="error" sx={{ my: 2 }}>
          {weatherError}
        </Alert>
      )}

      <Box className="tasks-grid">
        {tasks.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary" mt={4}>
            No tasks yet. Add a task to get started!
          </Typography>
        ) : (
          sortedTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default TaskList;
