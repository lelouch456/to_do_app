import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Box,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addTask, getWeatherForLocation } from '../../redux/actions/taskActions';

const TaskInput = () => {
  const [taskInput, setTaskInput] = useState({
    title: '',
    location: '',
    priority: 'Medium'
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskInput(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskInput.title.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      title: taskInput.title.trim(),
      location: taskInput.location.trim(),
      priority: taskInput.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    dispatch(addTask(newTask));
    
    // If location is provided, fetch weather data
    if (taskInput.location.trim()) {
      dispatch(getWeatherForLocation(taskInput.location.trim()));
    }
    
    // Reset form
    setTaskInput({
      title: '',
      location: '',
      priority: 'Medium'
    });
  };

  return (
    <Paper className="task-input-container" elevation={2}>
      <form onSubmit={handleSubmit}>
        <Box className="task-input-row">
          <TextField
            name="title"
            label="Add New Task"
            variant="outlined"
            fullWidth
            value={taskInput.title}
            onChange={handleChange}
            className="task-input-field"
          />
          
          <TextField
            name="location"
            label="Location (for weather)"
            variant="outlined"
            value={taskInput.location}
            onChange={handleChange}
            className="task-location-field"
          />
          
          <FormControl variant="outlined" className="task-priority-select">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={taskInput.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className="add-task-button"
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TaskInput;
