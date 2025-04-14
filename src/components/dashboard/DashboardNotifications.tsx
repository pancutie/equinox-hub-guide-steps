
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// This component now doesn't auto-show notifications anymore
const DashboardNotifications = () => {
  const navigate = useNavigate();
  
  // Don't render anything in the main dashboard
  return null;
};

export default DashboardNotifications;
