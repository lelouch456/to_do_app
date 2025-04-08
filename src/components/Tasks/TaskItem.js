import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Box, 
  FormControl, 
  Select, 
  MenuItem,
  CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import { deleteTask, updateTaskPriority } from '../../redux/actions/taskActions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const weatherData = useSelector(state => 
    task.location ? state.tasks.weatherData[task.location] : null
  );

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handlePriorityChange = (e) => {
    dispatch(updateTaskPriority(task.id, e.target.value));
  };

  // Priority colors
  const priorityColors = {
    High: 'error',
    Medium: 'warning',
    Low: 'success'
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Weather icon component
  const getWeatherIcon = (condition) => {
    if (!condition) return null;
    
    const condition_lower = condition.toLowerCase();
    if (condition_lower.includes('clear') || condition_lower.includes('sun')) {
      return <WbSunnyIcon />;
    }
    return <CloudIcon />;
  };

  return (
    <Card className={`task-card priority-${task.priority.toLowerCase()}`}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
          <Typography variant="h6" component="h2" className="task-title">
            {task.title}
          </Typography>
          
          <Chip 
            label={task.priority} 
            color={priorityColors[task.priority]} 
            size="small"
            className="priority-chip"
          />
        </Box>
        
        <Typography color="textSecondary" variant="body2" className="task-date">
          Created: {formatDate(task.createdAt)}
        </Typography>
        
        {task.location && (
          <Box mt={2} className="task-location">
            <Typography variant="body2">
              Location: {task.location}
            </Typography>
            
            {weatherData && (
              <Box className="weather-info">
                <Box display="flex" alignItems="center">
                  {getWeatherIcon(weatherData.condition)}
                  <Typography variant="body2" ml={1}>
                    {weatherData.temperature}°C, {weatherData.description}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <FormControl size="small" className="priority-select">
          <Select
            value={task.priority}
            onChange={handlePriorityChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        
        <Button 
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDelete}
          size="small"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskItem;
