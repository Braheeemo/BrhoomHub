import React from 'react';

const Watermark = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      padding: '5px',
      fontSize: '0.8em',
      color: '#555',
    }}>
      made with ❤ by Ibrahim Salhab
    </div>
  );
};

export default Watermark;