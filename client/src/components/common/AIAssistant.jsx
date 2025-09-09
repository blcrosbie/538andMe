// src/components/common/AIAssistant.jsx
import React, { useState } from 'react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      alert('AI Political Assistant\n\nHi! I can help you understand:\n• Bill summaries and implications\n• Voting patterns and trends\n• Representative backgrounds\n• Legislative analysis\n\nThis feature will be fully integrated soon!');
    }
  };

  return (
    <div className="ai-assistant" onClick={handleClick}>
      <span style={{ fontSize: '1.5rem' }}>💬</span>
    </div>
  );
};

export default AIAssistant;
