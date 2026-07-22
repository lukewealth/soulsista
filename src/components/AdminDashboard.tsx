import React, { useState } from 'react';
import { BookingRecord, OrderRecord, AllyDonation, ContactEnquiry } from '../types';
import { ShieldCheck, Users, Calendar, ShoppingBag, Heart, MessageSquare, X, Check, Search, Share2, Sparkles, Filter } from 'lucide-react';

interface AdminDashboardProps {
  bookings: BookingRecord[];
  orders: OrderRecord[];
  donations: AllyDonation[];
  enquiries: ContactEnquiry[];
  onClose: () => void;
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'completed' | 'cancelled') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  orders,
  donations,
  enquiries,
  onClose,
  onUpdateBookingStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'orders' | 'donations' | 'enquiries'>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Analytics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPriceUSD, 0) +
                       orders.reduce((sum, o) => sum + o.totalUSD, 0) +
                       donations.reduce((sum, d) => sum + d.amountUSD, 0);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#2D3A2F]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFCFB] text-[#1A1A1A] w-full max-w-5xl rounded-3xl shadow-2xl border border-[#EAE2D8] overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-[#2D3A2F] text-white p-6 flex items-center justify-between border-b border-[#3D4C3F]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#D4A39E] text-[#2D3A2F] rounded-2xl shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-label uppercase tracking-[0.25em] text-[#D4A39E] font-bold block">
                SOULSYSTA INTERNAL CRM PORTAL
              </span>
              <h2 className="font-serif text-2xl font-bold">Sanctuary Operations Console</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#FAF7F2] px-6 py-2 border-b border-[#EAE2D8] flex items-center gap-2 overflow-x-auto text-xs font-label uppercase">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#2D3A2F] text-[#D4A39E]' : 'text-[#555555] hover:bg-[#EAE2D8]'
            }`}
          >
            Analytics Overview
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'bg-[#2D3A2F] text-[#D4A39E]' : 'text-[#555555] hover:bg-[#EAE2D8]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-[#2D3A2F] text-[#D4A39E]' : 'text-[#555555] hover:bg-[#EAE2D8]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Book Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'donations' ? 'bg-[#2D3A2F] text-[#D4A39E]' : 'text-[#555555] hover:bg-[#EAE2D8]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Ally Fund ({donations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'enquiries' ? 'bg-[#2D3A2F] text-[#D4A39E]' : 'text-[#555555] hover:bg-[#EAE2D8]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquiries ({enquiries.length})</span>
          </button>
        </div>

        {/* Console Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-[#EAE2D8] shadow-xs">
                  <span className="block text-[10px] font-label uppercase text-[#888888]">Total Revenue</span>
                  <span className="text-2xl font-extrabold text-[#2D3A2F] mt-1 block">${totalRevenue.toLocaleString()} USD</span>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 block">↑ 24% vs last month</span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#EAE2D8] shadow-xs">
                  <span className="block text-[10px] font-label uppercase text-[#888888]">Guest Reservations</span>
                  <span className="text-2xl font-extrabold text-[#2D3A2F] mt-1 block">{bookings.length} Confirmed</span>
                  <span className="text-[10px] text-[#B88A85] font-bold mt-1 block">98.2% Completion</span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#EAE2D8] shadow-xs">
                  <span className="block text-[10px] font-label uppercase text-[#888888]">Book Sales</span>
                  <span className="text-2xl font-extrabold text-[#2D3A2F] mt-1 block">{orders.length} Units</span>
                  <span className="text-[10px] text-[#B88A85] font-bold mt-1 block">Hardcover & Digital</span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#EAE2D8] shadow-xs">
                  <span className="block text-[10px] font-label uppercase text-[#888888]">Ally Fund Raised</span>
                  <span className="text-2xl font-extrabold text-[#2D3A2F] mt-1 block">
                    ${donations.reduce((sum, d) => sum + d.amountUSD, 0).toLocaleString()} USD
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 block">Direct Youth Grants</span>
                </div>
              </div>

              {/* Recent Activity Table Preview */}
              <div className="p-6 bg-white rounded-2xl border border-[#EAE2D8] space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#2D3A2F]">Recent Guest Activity</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 3).map((b) => (
                    <div key={b.id} className="p-4 bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#2D3A2F]">{b.guestName}</span> — {b.serviceTitle}
                        <span className="block text-[10px] text-[#888888]">{b.date} at {b.timeSlot} with {b.practitionerName}</span>
                      </div>
                      <span className="px-3 py-1 bg-[#2D3A2F] text-[#D4A39E] rounded-full text-[10px] font-label font-bold uppercase">
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BOOKINGS CRM */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#EAE2D8]">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#B88A85] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, ID..."
                    className="w-full pl-9 p-2 bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl text-xs font-semibold focus:outline-none text-[#1A1A1A]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#888888]" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl text-xs font-bold text-[#2D3A2F]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="space-y-3">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="p-5 bg-white rounded-2xl border border-[#EAE2D8] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FAF7F2] pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#B88A85]">{b.id}</span>
                        <h4 className="font-serif font-bold text-base text-[#2D3A2F]">{b.guestName} ({b.guestEmail})</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                          className="px-3 py-1 bg-[#2D3A2F] text-[#D4A39E] rounded-full text-xs font-label uppercase font-bold"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <a
                          href={b.whatsappShareUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-[#25D366] text-white rounded-full"
                          title="Resend WhatsApp Confirmation"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 text-xs text-[#555555]">
                      <div>Ritual: <strong className="text-[#2D3A2F]">{b.serviceTitle}</strong></div>
                      <div>Guide: <strong className="text-[#2D3A2F]">{b.practitionerName}</strong></div>
                      <div>Date: <strong className="text-[#2D3A2F]">{b.date} at {b.timeSlot}</strong></div>
                    </div>

                    {/* Pre-Booking Questionnaire Insight */}
                    <div className="p-3 bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl text-xs space-y-1">
                      <span className="font-label uppercase font-bold text-[10px] text-[#B88A85]">Pre-Booking Questionnaire Notes:</span>
                      <p className="text-[#555555] italic font-light">
                        "{b.questionnaire.intentReason || 'No special notes provided'}" — Emotional State Index: {b.questionnaire.emotionalStateScore}/10
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: BOOK ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="p-4 bg-white rounded-2xl border border-[#EAE2D8] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#B88A85]">{o.id}</span>
                    <h4 className="font-bold text-[#2D3A2F]">{o.guestName} ({o.guestEmail})</h4>
                    <span className="text-[10px] text-[#888888] font-label uppercase">{o.format} edition • Qty: {o.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-sm text-[#2D3A2F] block">${o.totalUSD} USD</span>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase">{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DONATIONS */}
          {activeTab === 'donations' && (
            <div className="space-y-3">
              {donations.map((d) => (
                <div key={d.id} className="p-4 bg-white rounded-2xl border border-[#EAE2D8] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#B88A85]">{d.id}</span>
                    <h4 className="font-bold text-[#2D3A2F]">{d.donorName} ({d.donorEmail})</h4>
                    <span className="text-[10px] text-[#888888] font-label uppercase">Tier: {d.tierName} ({d.frequency})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-sm text-[#2D3A2F] block">${d.amountUSD} USD</span>
                    <span className="text-[10px] text-[#B88A85] font-bold uppercase">{new Date(d.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-3">
              {enquiries.map((e) => (
                <div key={e.id} className="p-5 bg-white rounded-2xl border border-[#EAE2D8] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2D3A2F]">{e.name} ({e.email})</span>
                    <span className="px-2.5 py-1 bg-[#2D3A2F] text-[#D4A39E] rounded-full text-[10px] uppercase font-label">{e.type}</span>
                  </div>
                  <p className="text-[#555555] p-3 bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl font-light">{e.message}</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
