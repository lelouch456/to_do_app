// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const logout = () => ({
  type: LOGOUT
});

// Thunk for simulated login
export const login = (credentials) => (dispatch) => {
  // Simulated authentication - in a real app this would call an API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation - in a real app this would be much more secure
      if (credentials.username && credentials.password) {
        const user = {
          username: credentials.username,
          // Never store actual passwords, this is just for simulation
          name: `User ${credentials.username}`
        };
        
        // Save to localStorage for persistence
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch(loginSuccess(user));
        resolve({ success: true });
      } else {
        resolve({ success: false, error: 'Invalid credentials' });
      }
    }, 500); // Simulate API delay
  });
};

// Thunk for logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('user');
  dispatch(logout());
};
