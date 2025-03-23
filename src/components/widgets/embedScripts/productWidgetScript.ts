
// This would be compiled and served from your public directory
// For demonstration purposes only

(function() {
  // Get script tag
  const scripts = document.getElementsByTagName('script');
  const script = scripts[scripts.length - 1];
  const productId = script.getAttribute('data-product-id');
  
  if (!productId) {
    console.error('ProductHunt Widget: Missing product ID');
    return;
  }
  
  // Create widget container
  const container = document.createElement('div');
  container.id = `ph-product-widget-${productId}`;
  script.parentNode?.insertBefore(container, script.nextSibling);
  
  // Fetch product data
  // In a real implementation, this would call your actual API
  fetchProductData(productId)
    .then(product => {
      renderWidget(container, product);
    })
    .catch(error => {
      console.error('ProductHunt Widget: Failed to load product data', error);
      container.innerHTML = 'Failed to load ProductHunt widget';
    });
  
  function fetchProductData(id: string) {
    // Mock data for demonstration
    return Promise.resolve({
      id: id,
      name: 'Amazing Product',
      tagline: 'The best product you will ever use',
      upvotes: 142,
      logoUrl: 'https://placekitten.com/80/80'
    });
  }
  
  function renderWidget(container: HTMLElement, product: any) {
    container.innerHTML = `
      <div class="ph-widget" style="font-family: system-ui, sans-serif; border-radius: 8px; border: 1px solid #e2e8f0; padding: 16px; max-width: 320px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${product.logoUrl}" alt="${product.name} logo" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover;">
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: bold;">${product.name}</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b;">${product.tagline}</p>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-top: 16px; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500;">
            <span style="background-color: #f8fafc; border-radius: 4px; padding: 4px 8px;">▲ ${product.upvotes}</span>
          </div>
          
          <a href="https://producthunt.com/products/${product.id}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #f5841f; font-size: 14px; font-weight: 500;">View on ProductHunt</a>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; margin-top: 16px; padding-top: 12px; display: flex; justify-content: center;">
          <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #94a3b8; text-decoration: none;">
            <span>Powered by</span>
            <span style="font-weight: bold; color: #f5841f;">ProductHunt</span>
          </a>
        </div>
      </div>
    `;
  }
})();
