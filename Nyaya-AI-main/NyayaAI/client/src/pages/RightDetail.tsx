import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  BookOpen, 
  CheckCircle, 
  Scale, 
  Share2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { getRightById, Right, categoryInfo } from '../services/rightsService';

export default function RightDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [right, setRight] = useState<Right | null>(null);
  const [relatedRights, setRelatedRights] = useState<Right[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRight = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await getRightById(id);
        if (response.success) {
          setRight(response.data.right);
          setRelatedRights(response.data.relatedRights);
        }
      } catch (err) {
        console.error('Failed to fetch right:', err);
        setError('Failed to load right details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRight();
  }, [id]);

  const handleShare = () => {
    if (navigator.share && right) {
      navigator.share({
        title: right.title,
        text: right.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !right) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Scale className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Right Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested right could not be found.'}</p>
          <Link
            to="/know-your-rights"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Know Your Rights
          </Link>
        </div>
      </div>
    );
  }

  const catInfo = categoryInfo[right.category];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className={`${catInfo.bgColor} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{right.icon}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${catInfo.bgColor} ${catInfo.color}`}>
                  {catInfo.name}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {right.title}
            </h1>
            
            <div className="flex items-start space-x-2 text-primary-600 mb-4">
              <BookOpen className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{right.lawReference}</p>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              {right.description}
            </p>
          </div>
        </div>

        {/* Key Points */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            Key Points to Remember
          </h2>
          <ul className="space-y-3">
            {right.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Laws */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Scale className="h-6 w-6 text-primary-600 mr-2" />
            Related Laws & References
          </h2>
          <ul className="space-y-2">
            {right.relatedLaws.map((law, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <ExternalLink className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                {law}
              </li>
            ))}
          </ul>
        </div>

        {/* Helpline Numbers */}
        {right.helplineNumbers && right.helplineNumbers.length > 0 && (
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-sm p-6 mb-6 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Phone className="h-6 w-6 mr-2" />
              Emergency Helplines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {right.helplineNumbers.map((helpline, index) => (
                <a
                  key={index}
                  href={helpline.number.includes('.') ? `https://${helpline.number}` : `tel:${helpline.number}`}
                  className="flex items-center justify-between bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
                >
                  <span className="font-medium">{helpline.name}</span>
                  <span className="text-lg font-bold">{helpline.number}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Ask AI About This Right */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Have Questions About This Right?
              </h2>
              <p className="text-gray-600">
                Our AI legal assistant can help explain how this right applies to your specific situation.
              </p>
            </div>
            <Link
              to="/ai-assistant"
              className="flex-shrink-0 inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors ml-4"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Ask AI
            </Link>
          </div>
        </div>

        {/* Related Rights */}
        {relatedRights.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Rights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedRights.map((related) => (
                <Link
                  key={related._id}
                  to={`/rights/${related._id}`}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center space-x-3"
                >
                  <span className="text-2xl">{related.icon}</span>
                  <span className="text-gray-900 font-medium hover:text-primary-600">
                    {related.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
