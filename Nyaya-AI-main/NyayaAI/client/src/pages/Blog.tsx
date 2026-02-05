import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Your Rights During Police Interrogation',
    excerpt: 'Know what rights you have when questioned by police. From the right to remain silent to the right to legal counsel, this guide covers everything you need to know.',
    author: 'Adv. Priya Sharma',
    date: '28 Jan 2026',
    readTime: '5 min read',
    category: 'Criminal Law',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
  },
  {
    id: 2,
    title: 'New Consumer Protection Rules 2026: What Changed?',
    excerpt: 'The latest amendments to the Consumer Protection Act bring significant changes. Here is a comprehensive breakdown of what consumers need to know.',
    author: 'Adv. Rahul Verma',
    date: '25 Jan 2026',
    readTime: '7 min read',
    category: 'Consumer Law',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
  },
  {
    id: 3,
    title: 'Property Registration: Complete Step-by-Step Guide',
    excerpt: 'Buying property in India? This comprehensive guide walks you through the entire registration process, required documents, and common pitfalls to avoid.',
    author: 'Adv. Amit Patel',
    date: '22 Jan 2026',
    readTime: '10 min read',
    category: 'Property Law',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
  },
  {
    id: 4,
    title: 'RTI Application: How to Get Information from Government',
    excerpt: 'The Right to Information Act empowers citizens to seek information from public authorities. Learn how to file an effective RTI application.',
    author: 'Adv. Sneha Gupta',
    date: '20 Jan 2026',
    readTime: '6 min read',
    category: 'RTI',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
  },
  {
    id: 5,
    title: 'Divorce Proceedings in India: A Complete Overview',
    excerpt: 'Understanding the divorce process under different personal laws in India. This guide covers Hindu, Muslim, Christian, and Special Marriage Act procedures.',
    author: 'Adv. Kavita Singh',
    date: '18 Jan 2026',
    readTime: '12 min read',
    category: 'Family Law',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
  },
  {
    id: 6,
    title: 'Cybercrime: How to Report and Protect Yourself',
    excerpt: 'From online fraud to identity theft, cybercrimes are on the rise. Learn how to report cybercrime and protect yourself from digital threats.',
    author: 'Adv. Vikram Rao',
    date: '15 Jan 2026',
    readTime: '8 min read',
    category: 'Cyber Law',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
  },
]

const categories = ['All', 'Criminal Law', 'Consumer Law', 'Property Law', 'Family Law', 'Cyber Law', 'RTI']

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <BookOpen className="h-8 w-8 text-indigo-600" aria-hidden="true" />
          </div>
          <h1 className="section-title">Legal Blog</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Stay informed with the latest legal insights, guides, and updates from our expert advocates.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-white/30" aria-hidden="true" />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="h-4 w-4 mr-1" aria-hidden="true" />
                <span className="mr-4">{blogPosts[0].author}</span>
                <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                <span>{blogPosts[0].date}</span>
              </div>
              <Link
                to={`/blog/${blogPosts[0].id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                Read Article
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-gray-400" aria-hidden="true" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" aria-hidden="true" />
                    <span>{post.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  )
}
