import { useEffect, useState } from 'react'
import { getVisitorStats } from '@/lib/supabase/admin'
import { supabase } from '@/lib/supabase/client'
import { Search, Eye, Globe, RefreshCw, Clock, TrendingUp, Building2, Users } from 'lucide-react'

interface VisitorRow {
  id: string
  page_path: string | null
  user_agent: string | null
  created_at: string
}

export default function UsersPage() {
  const [visitors, setVisitors] = useState<VisitorRow[]>([])
  const [stats, setStats] = useState({ totalViews: 0, todayViews: 0, thisWeekViews: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)

      const visitorStats = await getVisitorStats()
      setStats(visitorStats)

      const { data } = await supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      setVisitors((data as VisitorRow[]) || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load visitors')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredVisitors = visitors.filter((v) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    const page = (v.page_path || '').toLowerCase()
    const ua = (v.user_agent || '').toLowerCase()
    return page.includes(q) || ua.includes(q)
  })

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Loading visitor data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-red-200 flex items-center justify-center mx-auto mb-4">
            <Eye className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to Load Data</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-white/70">Site Analytics</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Site Visitors</h1>
            <p className="mt-2 text-white/70">Track who's visiting your real estate platform.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <Globe className="w-4 h-4 text-white/50 mx-auto mb-1" />
              <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              <p className="text-xs text-white/50">Total Views</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <Clock className="w-4 h-4 text-white/50 mx-auto mb-1" />
              <p className="text-2xl font-bold">{stats.todayViews.toLocaleString()}</p>
              <p className="text-xs text-white/50">Today</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <TrendingUp className="w-4 h-4 text-white/50 mx-auto mb-1" />
              <p className="text-2xl font-bold">{stats.thisWeekViews.toLocaleString()}</p>
              <p className="text-xs text-white/50">This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by page path or browser..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
          />
        </div>
        {searchQuery && (
          <span className="text-sm text-slate-500">
            {filteredVisitors.length} results
          </span>
        )}
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Browser / Device
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-medium">
                        {searchQuery ? 'No visitors match your search' : 'No visitors yet'}
                      </p>
                      <p className="text-sm text-slate-400">
                        {searchQuery ? 'Try a different search term' : 'Visitors will appear here once people visit your site'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((visitor) => {
                  const ua = visitor.user_agent || ''
                  const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : ua.includes('Edge') ? 'Edge' : 'Unknown'
                  const isMobile = ua.includes('Mobile')
                  const isTablet = ua.includes('Tablet')
                  const device = isMobile ? '📱 Mobile' : isTablet ? '📋 Tablet' : '💻 Desktop'
                  const date = new Date(visitor.created_at)
                  const timeAgo = getTimeAgo(date)

                  return (
                    <tr key={visitor.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            (visitor.page_path || '').includes('property') ? 'bg-blue-100' :
                            (visitor.page_path || '').includes('admin') ? 'bg-purple-100' : 'bg-emerald-100'
                          }`}>
                            {(visitor.page_path || '').includes('property') ? (
                              <Building2 className="w-4 h-4 text-blue-600" />
                            ) : (visitor.page_path || '').includes('admin') ? (
                              <Users className="w-4 h-4 text-purple-600" />
                            ) : (
                              <Globe className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {formatPagePath(visitor.page_path)}
                            </p>
                            <p className="text-xs text-slate-400">{visitor.page_path || '/'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-700">{browser}</span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-slate-500">{device}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-slate-700">{date.toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}</p>
                          <p className="text-xs text-slate-400">{date.toLocaleTimeString('en-US', {
                            hour: '2-digit', minute: '2-digit'
                          })} · {timeAgo}</p>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/30 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filteredVisitors.length}</span> recent visitors
          </p>
          <p className="text-xs text-slate-400">Real-time data · Updates automatically</p>
        </div>
      </div>
    </div>
  )
}

function formatPagePath(path: string | null): string {
  if (!path) return 'Unknown Page'
  if (path === '/') return '🏠 Homepage'
  if (path.includes('properties')) return '🏘️ Properties'
  if (path.includes('admin')) return '⚙️ Admin'
  if (path.includes('login')) return '🔐 Login'
  if (path.includes('signup')) return '📝 Sign Up'
  return path.replace(/\//g, ' ').replace(/-/g, ' ').trim()
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}