
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BottomNav } from "@/components/mobile/BottomNav";
import { Input } from "@/components/ui/input";
import { SearchCommand } from "@/components/search/SearchCommand";
import { Search } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

// Topic data
const topicCategories = [
  {
    name: "Productivity",
    topics: [
      { slug: "ai-tools", name: "AI Tools", icon: "🤖", count: 142 },
      { slug: "productivity", name: "Productivity", icon: "⚡", count: 98 },
      { slug: "automation", name: "Automation", icon: "🔄", count: 67 },
      { slug: "note-taking", name: "Note Taking", icon: "📝", count: 54 },
      { slug: "time-management", name: "Time Management", icon: "⏱️", count: 43 },
    ]
  },
  {
    name: "Development",
    topics: [
      { slug: "developer-tools", name: "Developer Tools", icon: "💻", count: 118 },
      { slug: "coding", name: "Coding", icon: "👨‍💻", count: 87 },
      { slug: "devops", name: "DevOps", icon: "🔧", count: 62 },
      { slug: "apis", name: "APIs", icon: "🔌", count: 51 },
      { slug: "frameworks", name: "Frameworks", icon: "🏗️", count: 39 },
    ]
  },
  {
    name: "Design",
    topics: [
      { slug: "design-tools", name: "Design Tools", icon: "🎨", count: 104 },
      { slug: "ui-design", name: "UI Design", icon: "📱", count: 76 },
      { slug: "ux-design", name: "UX Design", icon: "🧠", count: 68 },
      { slug: "illustrations", name: "Illustrations", icon: "✏️", count: 47 },
      { slug: "animation", name: "Animation", icon: "🎬", count: 42 },
    ]
  },
  {
    name: "Marketing",
    topics: [
      { slug: "marketing", name: "Marketing", icon: "📈", count: 92 },
      { slug: "social-media", name: "Social Media", icon: "📱", count: 85 },
      { slug: "seo", name: "SEO", icon: "🔍", count: 64 },
      { slug: "email-marketing", name: "Email Marketing", icon: "📧", count: 59 },
      { slug: "analytics", name: "Analytics", icon: "📊", count: 52 },
    ]
  },
];

// Flatten all topics for search
const allTopics = topicCategories.flatMap(category => category.topics);

const Topics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState(topicCategories);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query) {
      setFilteredTopics(topicCategories);
      return;
    }
    
    // Filter topics based on search query
    const lowerQuery = query.toLowerCase();
    const filtered = topicCategories.map(category => ({
      ...category,
      topics: category.topics.filter(topic => 
        topic.name.toLowerCase().includes(lowerQuery)
      )
    })).filter(category => category.topics.length > 0);
    
    setFilteredTopics(filtered);
  };
  
  const getTrendingTopics = () => {
    // In a real app, this would be based on actual trending data
    return allTopics
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-6 md:py-10 border-b">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Topics
            </h1>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Browse products by topic to discover tools and services for your specific needs
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search topics..."
                className="pl-9 py-6"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </section>
        
        {/* Trending Topics */}
        <section className="py-8">
          <div className="container-custom">
            <h2 className="text-xl font-semibold mb-6">Trending Topics</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getTrendingTopics().map(topic => (
                <FadeIn key={topic.slug} delay={100}>
                  <Link
                    to={`/topics/${topic.slug}`}
                    className="block p-4 rounded-xl border bg-white hover:shadow-md transition-shadow text-center"
                  >
                    <span className="text-3xl block mb-2">{topic.icon}</span>
                    <h3 className="font-medium">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {topic.count} products
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        
        {/* Topics by Category */}
        <section className="py-8">
          <div className="container-custom">
            <h2 className="text-xl font-semibold mb-6">All Topics</h2>
            
            {filteredTopics.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No topics found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredTopics.map((category, categoryIndex) => (
                  <div key={category.name}>
                    <h3 className="text-lg font-medium mb-4 border-b pb-2">
                      {category.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {category.topics.map((topic, topicIndex) => (
                        <FadeIn 
                          key={topic.slug} 
                          delay={100 + (topicIndex * 50) + (categoryIndex * 100)}
                        >
                          <Link
                            to={`/topics/${topic.slug}`}
                            className="flex flex-col items-center p-4 rounded-xl border bg-white hover:shadow-md transition-shadow text-center"
                          >
                            <span className="text-2xl block mb-2">{topic.icon}</span>
                            <h4 className="font-medium">{topic.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {topic.count} products
                            </p>
                          </Link>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Topics;
