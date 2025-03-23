
/**
 * Generate random data for charts
 * In a real app, this would come from an API
 */
export function getRandomData(type: "user" | "maker" | "admin", period: string) {
  const days = period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 90 : 365;
  const data = [];
  
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate random data based on type
    if (type === "user") {
      data.push({
        date: date.toISOString(),
        views: Math.floor(Math.random() * 50) + 10,
        upvotes: Math.floor(Math.random() * 10) + 1,
        comments: Math.floor(Math.random() * 5),
        shares: Math.floor(Math.random() * 3),
      });
    } else if (type === "maker") {
      data.push({
        date: date.toISOString(),
        views: Math.floor(Math.random() * 200) + 50,
        upvotes: Math.floor(Math.random() * 50) + 5,
        clicks: Math.floor(Math.random() * 80) + 30,
        conversions: Math.floor(Math.random() * 10) + 1,
      });
    } else {
      // Admin data
      data.push({
        date: date.toISOString(),
        views: Math.floor(Math.random() * 2000) + 500,
        upvotes: Math.floor(Math.random() * 500) + 100,
        comments: Math.floor(Math.random() * 300) + 50,
        users: Math.floor(Math.random() * 100) + 20,
        newUsers: Math.floor(Math.random() * 30) + 5,
      });
    }
  }
  
  return data;
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
}

/**
 * Format large numbers with K/M/B suffix
 */
export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
