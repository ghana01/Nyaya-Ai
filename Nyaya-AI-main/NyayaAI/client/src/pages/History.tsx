import { useState, useEffect } from 'react';
import { Clock, MessageSquare, Search, BookOpen, Trash2, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { getActivity, deleteActivity } from '../services/activityService';
import type { Activity, ActivityType } from '../services/activityService';
import { getOrCreateUserId } from '../services/chatService';
import { useNavigate } from 'react-router-dom';

const TAB_LABELS: { key: ActivityType | 'all'; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All Activity', icon: <Clock className="h-4 w-4" /> },
  { key: 'chat', label: 'Chats', icon: <MessageSquare className="h-4 w-4" /> },
  { key: 'case_search', label: 'Case Searches', icon: <Search className="h-4 w-4" /> },
  { key: 'law_read', label: 'Law Views', icon: <BookOpen className="h-4 w-4" /> },
];

const typeConfig: Record<ActivityType, { label: string; color: string; bg: string; icon: string }> = {
  chat: { label: 'Chat', color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30', icon: '💬' },
  case_search: { label: 'Case Search', color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/30', icon: '⚖️' },
  law_read: { label: 'Law View', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30', icon: '📚' },
};

const revisitRoutes: Record<ActivityType, string> = {
  chat: '/ai-assistant',
  case_search: '/case-analyzer',
  law_read: '/legal-library',
};

export default function History() {
  const [activeTab, setActiveTab] = useState<ActivityType | 'all'>('all');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const userId = getOrCreateUserId();
  const navigate = useNavigate();

  const fetchActivity = async (tab: ActivityType | 'all', pg = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const type = tab === 'all' ? undefined : tab;
      const response = await getActivity(userId, type, pg);
      if (response.success) {
        const newActivities = response.data.activities;
        setActivities(pg === 1 ? newActivities : (prev) => [...prev, ...newActivities]);
        setHasMore(response.data.hasMore);
      }
    } catch {
      setError('Failed to load activity history. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchActivity(activeTab, 1);
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    try {
      await deleteActivity(id);
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch {
      // ignore silently
    }
  };

  const handleRevisit = (activity: Activity) => {
    const route = revisitRoutes[activity.type];
    navigate(route, { state: { prefillQuery: activity.query } });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchActivity(activeTab, nextPage);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Activity History</h1>
          </div>
          <p className="text-slate-400">Your recent legal queries, case searches, and law views.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 mb-6 overflow-x-auto">
          {TAB_LABELS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              id={`history-tab-${tab.key}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading && page === 1 ? (
          <div className="text-center py-16">
            <Loader2 className="h-8 w-8 text-indigo-400 animate-spin mx-auto mb-3" />
            <p className="text-slate-400">Loading your history...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔌</div>
            <p className="text-red-400 font-medium mb-2">Could not load history</p>
            <p className="text-slate-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => fetchActivity(activeTab, 1)}
              className="flex items-center gap-2 mx-auto text-sm text-indigo-400 hover:text-indigo-300"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-white font-medium text-xl mb-2">No history yet</p>
            <p className="text-slate-400">Start chatting or searching to build your history.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => {
              const config = typeConfig[activity.type];
              return (
                <div
                  key={activity._id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="text-2xl flex-shrink-0">{config.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${config.bg} ${config.color}`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-slate-500">{formatDate(activity.createdAt)}</span>
                        </div>
                        <p className="text-white font-medium truncate">{activity.query}</p>
                        <p className="text-slate-400 text-sm mt-0.5 line-clamp-2">
                          {activity.response.replace(/[*#]/g, '').slice(0, 150)}
                          {activity.response.length > 150 && '...'}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => handleRevisit(activity)}
                        title="Revisit this query"
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-1.5 rounded-lg transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Revisit
                      </button>
                      <button
                        onClick={() => handleDelete(activity._id)}
                        title="Delete"
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Load More */}
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="w-full py-3 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>Load more</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
