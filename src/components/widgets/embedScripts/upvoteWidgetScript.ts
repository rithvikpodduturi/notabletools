
// This would be compiled and served from your public directory
// For demonstration purposes only

(function() {
  // Get script tag
  const scripts = document.getElementsByTagName('script');
  const script = scripts[scripts.length - 1];
  const productId = script.getAttribute('data-product-id');
  
  if (!productId) {
    console.error('ProductHunt Upvote Widget: Missing product ID');
    return;
  }
  
  // Create widget container
  const container = document.createElement('div');
  container.id = `ph-upvote-widget-${productId}`;
  script.parentNode?.insertBefore(container, script.nextSibling);
  
  // Fetch product data
  // In a real implementation, this would call your actual API
  fetchProductData(productId)
    .then(product => {
      renderWidget(container, product);
    })
    .catch(error => {
      console.error('ProductHunt Upvote Widget: Failed to load product data', error);
      container.innerHTML = 'Failed to load upvote widget';
    });
  
  function fetchProductData(id: string) {
    // Mock data for demonstration
    return Promise.resolve({
      id: id,
      upvotes: 142
    });
  }
  
  function renderWidget(container: HTMLElement, product: any) {
    // Create the widget HTML
    container.innerHTML = `
      <div class="ph-upvote-widget" style="font-family: system-ui, sans-serif; display: inline-flex; flex-direction: column; align-items: center; border-radius: 8px; border: 1px solid #e2e8f0; padding: 8px 12px; max-width: 80px;">
        <button
          id="ph-upvote-btn-${product.id}"
          style="border: none; background: #f8fafc; color: #f5841f; border-radius: 4px; width: 40px; height: 40px; cursor: pointer; font-size: 18px; font-weight: bold; display: flex; align-items: center; justify-content: center; padding: 0; margin: 0;"
        >
          ▲
        </button>
        
        <span id="ph-upvote-count-${product.id}" style="margin-top: 4px; font-size: 14px; font-weight: 500;">
          ${product.upvotes}
        </span>
        
        <a 
          href="https://producthunt.com/products/${product.id}"
          target="_blank"
          rel="noopener noreferrer"
          style="margin-top: 8px; text-decoration: none; color: #94a3b8; font-size: 10px;"
        >
          ProductHunt
        </a>
      </div>
    `;
    
    // Add upvote functionality
    const upvoteButton = document.getElementById(`ph-upvote-btn-${product.id}`);
    const upvoteCount = document.getElementById(`ph-upvote-count-${product.id}`);
    
    if (upvoteButton && upvoteCount) {
      let upvoted = false;
      
      upvoteButton.addEventListener('click', function() {
        if (!upvoted) {
          // Update UI
          upvoted = true;
          const newCount = parseInt(upvoteCount.textContent || '0') + 1;
          upvoteCount.textContent = newCount.toString();
          upvoteButton.style.background = '#f5841f';
          upvoteButton.style.color = 'white';
          upvoteButton.style.cursor = 'default';
          
          // In a real implementation, this would call your API
          console.log(`Upvoted product ${product.id}`);
        }
      });
    }
  }
})();
