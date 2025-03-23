
import React, { useState } from 'react';

interface UpvoteWidgetProps {
  productId: string;
  initialUpvotes: number;
}

const UpvoteWidget: React.FC<UpvoteWidgetProps> = ({
  productId,
  initialUpvotes
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [upvoted, setUpvoted] = useState(false);
  
  const handleUpvote = () => {
    if (!upvoted) {
      setUpvotes(prev => prev + 1);
      setUpvoted(true);
      
      // In a real implementation, this would make an API call
      console.log(`Upvoted product ${productId}`);
    }
  };
  
  return (
    <div className="ph-widget ph-upvote-widget" style={{
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      padding: '8px 12px',
      maxWidth: '80px'
    }}>
      <button
        onClick={handleUpvote}
        disabled={upvoted}
        style={{
          border: 'none',
          background: upvoted ? '#f5841f' : '#f8fafc',
          color: upvoted ? 'white' : '#f5841f',
          borderRadius: '4px',
          width: '40px',
          height: '40px',
          cursor: upvoted ? 'default' : 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          margin: 0
        }}
      >
        ▲
      </button>
      
      <span style={{
        marginTop: '4px',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        {upvotes}
      </span>
      
      <a 
        href={`https://producthunt.com/products/${productId}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: '8px',
          textDecoration: 'none',
          color: '#94a3b8',
          fontSize: '10px'
        }}
      >
        ProductHunt
      </a>
    </div>
  );
};

export default UpvoteWidget;
