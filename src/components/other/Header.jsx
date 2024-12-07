import React, { useState, useEffect } from 'react';

const Header = (props) => {
  const [username, setUsername] = useState('');

  // Extract username from props or localStorage
  useEffect(() => {
    const loggedInData = props.loggedInUser || localStorage.getItem('loggedInUser');
    if (loggedInData) {
      try {
        // Parse the JSON and extract the firstName
        const parsedData = typeof loggedInData === 'string' ? JSON.parse(loggedInData) : loggedInData;
        setUsername(parsedData?.data?.firstName || 'Guest');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUsername('Guest');
      }
    } else {
      setUsername('Guest');
    }
  }, [props.loggedInUser]);

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', ''); // Clear user data
    props.changeUser(''); // Update parent component state
  };

  return (
    <div className='flex items-end justify-between'>
      <h1 className='text-2xl font-medium'>
        Hello <br />
        <span className='text-3xl font-semibold'>{username} 👋</span>
      </h1>
      <button
        onClick={logOutUser}
        className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>
        Log Out
      </button>
    </div>
  );
};

export default Header;
