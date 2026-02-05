import { useState } from 'react'
import { Scale, Search, Filter, Calendar, FileText, ChevronRight, Download } from 'lucide-react'

interface Judgment {
  id: number
  title: string
  court: string
  date: string
  citation: string
  judges: string
  summary: string
  category: string
}

const sampleJudgments: Judgment[] = [
  {
    id: 1,
    title: 'Kesavananda Bharati vs State of Kerala',
    court: 'Supreme Court of India',
    date: '24 Apr 1973',
    citation: 'AIR 1973 SC 1461',
    judges: 'S.M. Sikri, J.M. Shelat, K.S. Hegde, and others',
    summary: 'This landmark case established the Basic Structure Doctrine, holding that the Parliament cannot amend the basic structure of the Constitution.',
    category: 'Constitutional Law',
  },
  {
    id: 2,
    title: 'Vishaka vs State of Rajasthan',
    court: 'Supreme Court of India',
    date: '13 Aug 1997',
    citation: 'AIR 1997 SC 3011',
    judges: 'J.S. Verma, Sujata V. Manohar, B.N. Kirpal',
    summary: 'Guidelines were laid down for prevention of sexual harassment of women at workplace, later codified as the POSH Act.',
    category: 'Women Rights',
  },
  {
    id: 3,
    title: 'Maneka Gandhi vs Union of India',
    court: 'Supreme Court of India',
    date: '25 Jan 1978',
    citation: 'AIR 1978 SC 597',
    judges: 'M.H. Beg, Y.V. Chandrachud, P.N. Bhagwati, and others',
    summary: 'Expanded the scope of Article 21, establishing that the right to life includes the right to live with dignity.',
    category: 'Fundamental Rights',
  },
]

const categories = [
  'All Categories',
  'Constitutional Law',
  'Criminal Law',
  'Civil Law',
  'Family Law',
  'Property Law',
  'Labor Law',
  'Women Rights',
  'Fundamental Rights',
]

export default function JudgmentSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [results, setResults] = useState<Judgment[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate search
    setResults(sampleJudgments.filter(j => 
      (selectedCategory === 'All Categories' || j.category === selectedCategory) &&
      (j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       j.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    ))
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
            <Scale className="h-8 w-8 text-amber-600" aria-hidden="true" />
          </div>
          <h1 className="section-title">Judgment Search</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Search through thousands of court judgments to find relevant legal precedents.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch}>
            {/* Main Search */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Judgments
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by case name, topic, or keywords..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="h-4 w-4 inline mr-1" aria-hidden="true" />
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" aria-hidden="true" />
                  Date From
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" aria-hidden="true" />
                  Date To
                </label>
                <input
                  type="date"
                  id="dateTo"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary text-lg">
              Search Judgments
            </button>
          </form>
        </div>

        {/* Results */}
        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {results.length} Judgment{results.length !== 1 ? 's' : ''} Found
            </h2>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((judgment) => (
                  <div key={judgment.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                            {judgment.category}
                          </span>
                          <span className="text-xs text-gray-500">{judgment.date}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-primary-600 cursor-pointer">
                          {judgment.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">{judgment.court}</span> | {judgment.citation}
                        </p>
                        
                        <p className="text-sm text-gray-500 mb-2">
                          <span className="font-medium">Judges:</span> {judgment.judges}
                        </p>
                        
                        <p className="text-gray-700 text-sm">{judgment.summary}</p>
                      </div>
                      
                      <button className="ml-4 p-2 text-gray-400 hover:text-primary-600 transition-colors" aria-label="Download judgment">
                        <Download className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex justify-end">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                        Read Full Judgment
                        <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-500">No judgments found matching your search criteria.</p>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        )}

        {/* Featured Judgments */}
        {!hasSearched && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Landmark Judgments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleJudgments.slice(0, 2).map((judgment) => (
                <div key={judgment.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {judgment.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">{judgment.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{judgment.court} | {judgment.date}</p>
                  <p className="text-gray-700 text-sm line-clamp-2">{judgment.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
