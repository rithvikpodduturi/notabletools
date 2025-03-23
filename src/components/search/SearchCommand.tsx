
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { 
  Search, 
  Filter, 
  Clock, 
  Laptop, 
  Smartphone, 
  Globe,
  Tag,
  Calendar,
  Zap,
  FileText,
  Microscope,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { searchProducts } from "@/utils/search";
import { Badge } from "@/components/ui/badge";

type SearchResult = {
  id: string;
  name: string;
  tagline: string;
  type: "product" | "category" | "topic" | "collection";
  image?: string;
  url?: string;
  category?: string;
};

export function SearchCommand({ products = [] }: { products: any[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 3));
    }
  }, []);

  // Save recent searches to localStorage
  const addRecentSearch = (search: string) => {
    const updatedSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (query.length > 0) {
      const searchResults = searchProducts(products, query, selectedFilters);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, products, selectedFilters]);

  // Categories for filtering
  const categories = [
    { name: "AI Tools", icon: <Zap className="h-4 w-4 mr-2" /> },
    { name: "Productivity", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Design Tools", icon: <Microscope className="h-4 w-4 mr-2" /> }
  ];

  // Platforms for filtering
  const platforms = [
    { name: "Web", icon: <Globe className="h-4 w-4 mr-2" /> },
    { name: "macOS", icon: <Laptop className="h-4 w-4 mr-2" /> },
    { name: "iOS", icon: <Smartphone className="h-4 w-4 mr-2" /> }
  ];

  const handleResultSelect = (result: SearchResult) => {
    setOpen(false);
    
    if (result.type === "product") {
      navigate(`/product/${result.id}`);
    } else if (result.type === "category" || result.type === "topic") {
      navigate(`/topics/${result.name.toLowerCase().replace(/\s+/g, '-')}`);
    } else if (result.type === "collection") {
      navigate(`/collections/${result.id}`);
    }
    
    if (query) {
      addRecentSearch(query);
    }
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md border border-input bg-background p-2 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-5 w-5" />
        <span className="ml-2 hidden md:inline-flex">Search products...</span>
        <kbd className="ml-auto hidden pointer-events-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs md:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search products, categories, topics..." 
            value={query}
            onValueChange={setQuery}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none"
          />
          {selectedFilters.length > 0 && (
            <button 
              onClick={() => setSelectedFilters([])}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear filters
            </button>
          )}
        </div>
        
        <CommandList>
          {selectedFilters.length > 0 && (
            <div className="px-3 py-2 flex flex-wrap gap-1">
              {selectedFilters.map(filter => (
                <Badge 
                  key={filter} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {filter}
                  <button 
                    onClick={() => toggleFilter(filter)}
                    className="ml-1 rounded-full h-3 w-3 inline-flex items-center justify-center hover:bg-destructive/20"
                  >
                    <span className="sr-only">Remove filter</span>
                    <span aria-hidden="true">×</span>
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {recentSearches.map(search => (
                <CommandItem 
                  key={search} 
                  onSelect={() => { 
                    setQuery(search);
                    addRecentSearch(search);
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{search}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {!query && (
            <>
              <CommandGroup heading="Filter by Category">
                <div className="flex flex-wrap gap-1 p-2">
                  {categories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => toggleFilter(category.name)}
                      className={cn(
                        "flex items-center rounded-md px-2 py-1 text-xs",
                        selectedFilters.includes(category.name)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </CommandGroup>
              
              <CommandGroup heading="Filter by Platform">
                <div className="flex flex-wrap gap-1 p-2">
                  {platforms.map(platform => (
                    <button
                      key={platform.name}
                      onClick={() => toggleFilter(platform.name)}
                      className={cn(
                        "flex items-center rounded-md px-2 py-1 text-xs",
                        selectedFilters.includes(platform.name)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {platform.icon}
                      <span>{platform.name}</span>
                    </button>
                  ))}
                </div>
              </CommandGroup>
              
              <CommandSeparator />
              
              <CommandGroup heading="Trending">
                <CommandItem onSelect={() => navigate("/topics/ai-tools")}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>AI Tools</span>
                </CommandItem>
                <CommandItem onSelect={() => navigate("/topics/productivity")}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Productivity</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
          
          {query && results.length > 0 ? (
            <>
              <CommandGroup heading="Products">
                {results
                  .filter(result => result.type === "product")
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleResultSelect(result)}
                      className="flex items-center py-3"
                    >
                      {result.image && (
                        <div className="h-8 w-8 rounded overflow-hidden mr-2 flex-shrink-0">
                          <img 
                            src={result.image} 
                            alt={result.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">{result.name}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {result.tagline}
                        </span>
                      </div>
                    </CommandItem>
                  ))
                }
              </CommandGroup>
              
              {results.some(result => result.type === "category" || result.type === "topic") && (
                <CommandGroup heading="Categories & Topics">
                  {results
                    .filter(result => result.type === "category" || result.type === "topic")
                    .map(result => (
                      <CommandItem
                        key={result.id}
                        onSelect={() => handleResultSelect(result)}
                      >
                        <Tag className="mr-2 h-4 w-4" />
                        <span>{result.name}</span>
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              )}
            </>
          ) : query ? (
            <CommandEmpty>No results found for "{query}"</CommandEmpty>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}
