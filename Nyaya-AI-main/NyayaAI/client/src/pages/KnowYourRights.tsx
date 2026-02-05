import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Search, Filter, Loader2 } from 'lucide-react';
import { getAllRights, Right, categoryInfo } from '../services/rightsService';

const categories = [
  { id: 'all', name: 'All Rights', icon: '📚' },
  { id: 'women', name: 'Women Rights', icon: '👩' },
  { id: 'cybercrime', name: 'Cybercrime', icon: '💻' },
  { id: 'arrest', name: 'Arrest Rights', icon: '⚖️' },
  { id: 'consumer', name: 'Consumer Rights', icon: '🛒' },
  { id: 'tenant', name: 'Tenant Rights', icon: '🏠' },
];

export default function KnowYourRights() {
  const [rights, setRights] = useState<Right[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRights = async () => {
      setLoading(true);
      try {
        const response = await getAllRights(selectedCategory);
        if (response.success) {
          setRights(response.data.rights);
        }
      } catch (error) {
        console.error('Failed to fetch rights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRights();
  }, [selectedCategory]);

  // Filter rights by search query
  const filteredRights = rights.filter((right) =>
    right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    right.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
            <BookOpen className="h-8 w-8 text-primary-600" aria-hidden="true" />
          </div>
          <h1 className="section-title">Know Your Rights</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Understanding your legal rights is the first step to protecting yourself. 
            Explore the various rights guaranteed to every Indian citizen.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for rights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading rights...</span>
          </div>
        ) : filteredRights.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rights found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          /* Rights Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRights.map((right) => {
              const catInfo = categoryInfo[right.category];
              return (
                <Link
                  key={right._id}
                  to={`/rights/${right._id}`}
                  className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{right.icon}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${catInfo.bgColor} ${catInfo.color}`}>
                      {catInfo.name}
                    </span>
                  </div>
                  
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {right.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {right.description}
                  </p>
                  
                  <p className="text-primary-600 text-xs font-medium mb-4">
                    {right.lawReference}
                  </p>
                  
                  {/* Key Points Preview */}
                  <ul className="space-y-1 mb-4">
                    {right.keyPoints.slice(0, 2).map((point, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <ChevronRight className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="ml-1 line-clamp-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                    Learn more
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-primary-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Have Questions About Your Rights?</h2>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            Our AI assistant can help you understand how these rights apply to your specific situation.
          </p>
          <Link
            to="/ai-assistant"
            className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all"
          >
            Ask AI Assistant
            <ChevronRight className="h-5 w-5 ml-2" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
