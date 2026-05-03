import { createSlice } from '@reduxjs/toolkit';


const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    activeTab: 'profile', 
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    
  },
});

export const { setActiveTab } = notificationSlice.actions;

export default notificationSlice.reducer;