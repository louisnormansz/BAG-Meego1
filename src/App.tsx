/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Check, X, Code2, LayoutGrid, GitBranch, Settings2, Sparkles, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock data for repositories
const MOCK_REPOS = [
  { id: '1', name: 'tikcast/operation_report', status: 'pending', type: '仓库', serviceTree: 'tikcast.operation' },
  { id: '2', name: 'webcast/gpt_platform', status: 'pending', type: '仓库', serviceTree: 'webcast.gpt' },
  { id: '3', name: 'webcast/test_publish_al', status: 'pending', type: '仓库', serviceTree: 'webcast.test' },
  { id: '4', name: 'webcast/chatgpt-retrieval-plugin', status: 'pending', type: '仓库', serviceTree: 'webcast.retrieval' },
  { id: '5', name: 'infra/monitoring_dashboard', status: 'active', type: '仓库', serviceTree: 'infra.monitoring' },
  { id: '6', name: 'core/auth_service', status: 'active', type: '仓库', serviceTree: 'core.auth' },
  { id: '7', name: 'data/analytics_pipeline', status: 'pending', type: '仓库', serviceTree: 'data.analytics' },
  { id: '8', name: 'ui/component_library', status: 'active', type: '仓库', serviceTree: 'ui.library' },
  { id: '9', name: 'api/gateway_service', status: 'active', type: '仓库', serviceTree: 'api.gateway' },
  { id: '10', name: 'mobile/ios_app', status: 'pending', type: '仓库', serviceTree: 'mobile.ios' },
  { id: '11', name: 'mobile/android_app', status: 'pending', type: '仓库', serviceTree: 'mobile.android' },
  { id: '12', name: 'db/user_database', status: 'active', type: '仓库', serviceTree: 'db.user' },
  { id: '13', name: 'cache/redis_cluster', status: 'active', type: '仓库', serviceTree: 'cache.redis' },
  { id: '14', name: 'queue/message_broker', status: 'pending', type: '仓库', serviceTree: 'queue.broker' },
  { id: '15', name: 'auth/oauth_provider', status: 'active', type: '仓库', serviceTree: 'auth.oauth' },
  { id: '16', name: 'search/elasticsearch_index', status: 'active', type: '仓库', serviceTree: 'search.es' },
  { id: '17', name: 'logging/elk_stack', status: 'pending', type: '仓库', serviceTree: 'logging.elk' },
  { id: '18', name: 'ci/jenkins_pipeline', status: 'active', type: '仓库', serviceTree: 'ci.jenkins' },
];

type RepairMode = '单仓库修复' | '多仓库修复' | '服务树';
type TabType = 'AI 代码优化' | '修复任务列表页';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('AI 代码优化');
  const [repairMode, setRepairMode] = useState<RepairMode>('单仓库修复');
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredRepos = useMemo(() => {
    const queries = searchQuery.split('\n').filter(q => q.trim() !== '');
    if (queries.length === 0) return MOCK_REPOS;
    return MOCK_REPOS.filter(repo => 
      queries.some(query => repo.name.toLowerCase().includes(query.toLowerCase().trim()))
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRepos.slice(start, start + itemsPerPage);
  }, [filteredRepos, currentPage]);

  const toggleRepoSelection = (id: string) => {
    if (repairMode === '单仓库修复') {
      setSelectedRepos([id]);
    } else {
      setSelectedRepos(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };

  const removeSelectedRepo = (id: string) => {
    setSelectedRepos(prev => prev.filter(item => item !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-[#333]">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center py-12 px-4">
        <>
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">BAG 代码治理平台</span>
            </div>
            
            {/* Decorative Illustration (Simulated) */}
            <div className="flex gap-4 mb-8">
              <div className="w-8 h-8 bg-orange-400 rounded-lg rotate-12 flex items-center justify-center shadow-sm">
                <Settings2 className="text-white w-5 h-5" />
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-lg -rotate-12 flex items-center justify-center shadow-sm">
                <GitBranch className="text-white w-5 h-5" />
              </div>
              <div className="w-8 h-8 bg-green-400 rounded-lg rotate-6 flex items-center justify-center shadow-sm">
                <LayoutGrid className="text-white w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Main Card Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12"
          >
            <div className="mb-2 text-gray-400 text-sm font-medium">01 / 01</div>
            
            {/* Module 1: Mode Selection */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">开启你的</h1>
                <div className="relative inline-block">
                  <button 
                    onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                    className="flex items-center gap-1 text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {repairMode}
                    <ChevronDown className={`w-8 h-8 transition-transform duration-200 ${isModeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isModeDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setIsModeDropdownOpen(false)}
                        />
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2"
                        >
                          {(['单仓库修复', '多仓库修复', '服务树'] as RepairMode[]).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => {
                                setRepairMode(mode);
                                setIsModeDropdownOpen(false);
                                setSelectedRepos([]); // Reset selection on mode change
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex items-center justify-between ${repairMode === mode ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                            >
                              {mode}
                              {repairMode === mode && <Check className="w-4 h-4" />}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">模式！</h1>
              </div>
              <p className="text-gray-500">
                选择你感兴趣的代码仓库，勾选后可对该仓库发起修复任务。
                {repairMode === '多仓库修复' && ' 多仓库支持按照多行拷贝输入，每行一个仓库名称'}
              </p>
            </div>

            {/* Module 2: Search Input */}
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <textarea
                  placeholder={repairMode === '多仓库修复' ? "搜索更多可访问的仓库，支持多行粘贴" : "搜索更多可访问的仓库"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg min-h-[120px]"
                />
              </div>
              
              {/* Selected Tags */}
              <AnimatePresence>
                {selectedRepos.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap gap-2 mt-4 overflow-hidden"
                  >
                    {selectedRepos.map(id => {
                      const repo = MOCK_REPOS.find(r => r.id === id);
                      return (
                        <motion.span 
                          key={id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100"
                        >
                          {repo?.name}
                          <button onClick={() => removeSelectedRepo(id)} className="hover:text-blue-800">
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <span className="relative px-4 bg-white text-xs text-gray-400 uppercase tracking-widest">根据你的习惯为你推荐</span>
            </div>

            {/* Module 3: Repository Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {paginatedRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  whileHover={{ y: -2 }}
                  onClick={() => toggleRepoSelection(repo.id)}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer group ${
                    selectedRepos.includes(repo.id) 
                      ? 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-200' 
                      : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 px-2 py-1 bg-[#e6f7f4] text-[#00b59c] rounded-lg text-xs font-bold">
                      <Code2 className="w-3 h-3" />
                      {repo.type}
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      selectedRepos.includes(repo.id) ? 'bg-blue-500 border-blue-500' : 'bg-gray-50 border-gray-200 group-hover:border-blue-300'
                    }`}>
                      {selectedRepos.includes(repo.id) && <Check className="text-white w-3 h-3" />}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-1 truncate">{repo.name}</h3>
                  {repairMode === '服务树' && (
                    <p className="text-xs text-gray-500 mb-4 truncate">服务树: {repo.serviceTree}</p>
                  )}
                </motion.div>
              ))}
              
              {paginatedRepos.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  未找到匹配的仓库
                </div>
              )}
            </div>

            {/* Module 4: Action Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={selectedRepos.length === 0}
                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  selectedRepos.length > 0 
                    ? 'bg-black text-white hover:bg-gray-800 shadow-black/10' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                发起任务修复
              </motion.button>
            </div>
          </motion.div>
        </>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mb-12">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    上一页
                  </button>
                  <span className="text-gray-600">第 {currentPage} 页 / 共 {totalPages} 页</span>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    下一页
                  </button>
                </div>
              )}

        {/* Footer Info */}
        <div className="mt-8 text-gray-400 text-xs flex items-center gap-4">
          <span>帮助中心</span>
          <span>反馈建议</span>
          <span>隐私政策</span>
        </div>
      </div>
    </div>
  );
}
