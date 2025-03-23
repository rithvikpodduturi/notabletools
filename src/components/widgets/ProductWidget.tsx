
import React from 'react';

interface ProductWidgetProps {
  productId: string;
  name: string;
  tagline: string;
  upvotes: number;
  logoUrl?: string;
}

const ProductWidget: React.FC<ProductWidgetProps> = ({
  productId,
  name,
  tagline,
  upvotes,
  logoUrl
}) => {
  return (
    <div className="ph-widget ph-product-widget" style={{
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      padding: '16px',
      maxWidth: '320px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {logoUrl && (
          <img 
            src={logoUrl} 
            alt={`${name} logo`}
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '8px',
              objectFit: 'cover'
            }} 
          />
        )}
        <div>
          <h3 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '16px', 
            fontWeight: 'bold' 
          }}>
            {name}
          </h3>
          <p style={{ 
            margin: '0', 
            fontSize: '14px', 
            color: '#64748b' 
          }}>
            {tagline}
          </p>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '16px',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <span style={{
            backgroundColor: '#f8fafc',
            borderRadius: '4px',
            padding: '4px 8px'
          }}>
            ▲ {upvotes}
          </span>
        </div>
        
        <a 
          href={`https://producthunt.com/products/${productId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#f5841f',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          View on ProductHunt
        </a>
      </div>
      
      <div style={{
        borderTop: '1px solid #e2e8f0',
        marginTop: '16px',
        paddingTop: '12px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <a 
          href="https://producthunt.com" 
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#94a3b8',
            textDecoration: 'none'
          }}
        >
          <span>Powered by</span>
          <span style={{ fontWeight: 'bold', color: '#f5841f' }}>ProductHunt</span>
        </a>
      </div>
    </div>
  );
};

export default ProductWidget;
