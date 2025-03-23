
interface Product {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  categories?: string[];
  platforms?: string[];
  image?: string;
  upvotes?: number;
  comments?: number;
}

type SearchResult = {
  id: string;
  name: string;
  tagline: string;
  type: "product" | "category" | "topic" | "collection";
  image?: string;
  url?: string;
  category?: string;
};

/**
 * Search products with optional filters
 */
export function searchProducts(
  products: Product[],
  query: string,
  filters: string[] = []
): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();
  
  // Add matching products
  products.forEach(product => {
    // Check if product matches all filters
    const matchesFilters = filters.length === 0 || 
      filters.every(filter => 
        (product.categories && product.categories.includes(filter)) || 
        (product.platforms && product.platforms.includes(filter))
      );
    
    if (!matchesFilters) return;
    
    // Score relevance based on where the match is found
    let score = 0;
    const nameMatch = product.name.toLowerCase().includes(lowerQuery);
    const taglineMatch = product.tagline?.toLowerCase().includes(lowerQuery);
    const descriptionMatch = product.description?.toLowerCase().includes(lowerQuery);
    
    if (nameMatch) score += 10;
    if (taglineMatch) score += 5;
    if (descriptionMatch) score += 1;
    
    if (score > 0) {
      results.push({
        id: product.id,
        name: product.name,
        tagline: product.tagline || "",
        type: "product",
        image: product.image,
        category: product.categories ? product.categories[0] : undefined
      });
    }
  });
  
  // Sort results by relevance score
  results.sort((a, b) => {
    // Name exact match gets highest priority
    if (a.name.toLowerCase() === lowerQuery) return -1;
    if (b.name.toLowerCase() === lowerQuery) return 1;
    
    // Starts with gets next priority
    if (a.name.toLowerCase().startsWith(lowerQuery)) return -1;
    if (b.name.toLowerCase().startsWith(lowerQuery)) return 1;
    
    return 0;
  });
  
  // Add categories/topics as search results
  const categories = [
    "AI Tools", "Productivity", "Design Tools", "Marketing", 
    "Development", "Analytics", "Communication"
  ];
  
  categories.forEach(category => {
    if (category.toLowerCase().includes(lowerQuery)) {
      results.push({
        id: category,
        name: category,
        tagline: `Discover products in ${category}`,
        type: "category"
      });
    }
  });
  
  return results;
}

/**
 * Get related products based on categories and upvoting patterns
 */
export function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  if (!product.categories || product.categories.length === 0) {
    return [];
  }
  
  return allProducts
    .filter(p => 
      p.id !== product.id && 
      p.categories && 
      p.categories.some(cat => product.categories?.includes(cat))
    )
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
    .slice(0, 3);
}

/**
 * Get trending products based on recent upvotes
 */
export function getTrendingProducts(products: Product[]): Product[] {
  // In a real app, this would factor in recency of upvotes
  return [...products]
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
    .slice(0, 5);
}

/**
 * Get recommended products based on user's upvoting history
 */
export function getRecommendedProducts(
  products: Product[],
  upvotedProductIds: string[]
): Product[] {
  // Get categories the user has shown interest in
  const upvotedProducts = products.filter(p => upvotedProductIds.includes(p.id));
  const interestedCategories = new Set<string>();
  
  upvotedProducts.forEach(product => {
    product.categories?.forEach(category => {
      interestedCategories.add(category);
    });
  });
  
  // Find products in those categories that user hasn't upvoted yet
  return products
    .filter(product => 
      !upvotedProductIds.includes(product.id) &&
      product.categories?.some(category => interestedCategories.has(category))
    )
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
    .slice(0, 3);
}
