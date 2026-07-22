import React, { useState } from 'react';
import { OrderRecord } from '../types';
import { X, ShoppingBag, Trash2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  format: 'hardcover' | 'digital' | 'bundle';
  price: number;
  title: string;
  quantity: number;
}

interface CartModalProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onCompleteOrder: (order: OrderRecord) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  items,
  onClose,
  onRemoveItem,
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestAddress, setGuestAddress] = useState('');
  const [completedRecord, setCompletedRecord] = useState<OrderRecord | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    const record: OrderRecord = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      bookId: items[0]?.id || 'she-too-can',
      format: items[0]?.format || 'hardcover',
      quantity: items[0]?.quantity || 1,
      totalUSD: subtotal,
      guestName,
      guestEmail,
      guestAddress,
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    setCompletedRecord(record);
    onCompleteOrder(record);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D3A2F]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFCFB] text-[#1A1A1A] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EAE2D8] relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#2D3A2F] text-white rounded-full hover:bg-[#222D24] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'cart' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B88A85]" />
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Your Shopping Bag</h3>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#888888]">
                Your shopping bag is currently empty.
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-[#EAE2D8] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#2D3A2F] block">{item.title}</span>
                      <span className="text-[10px] text-[#888888] font-label uppercase">Qty: {item.quantity}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#2D3A2F]">${item.price * item.quantity}</span>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-[#EAE2D8] flex justify-between font-bold text-sm text-[#2D3A2F]">
                  <span>Subtotal:</span>
                  <span>${subtotal} USD</span>
                </div>

                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 bg-[#2D3A2F] hover:bg-[#222D24] text-[#FDFCFB] rounded-full text-xs font-label uppercase font-bold tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <span>Proceed to Guest Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A39E]" />
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'checkout' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Guest Checkout</h3>
              <p className="text-xs text-[#555555] mt-1 font-light">
                No account required. Enter delivery details for your order.
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-label uppercase font-bold text-[#2D3A2F] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Amina Vance"
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase font-bold text-[#2D3A2F] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="amina@example.com"
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase font-bold text-[#2D3A2F] mb-1">
                  Shipping Address (For Hardcovers)
                </label>
                <input
                  type="text"
                  value={guestAddress}
                  onChange={(e) => setGuestAddress(e.target.value)}
                  placeholder="123 Sanctuary Way, London, UK"
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A]"
                />
              </div>

              <div className="p-3 bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl text-xs flex justify-between font-bold text-[#2D3A2F]">
                <span>Total Due:</span>
                <span>${subtotal} USD</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2D3A2F] hover:bg-[#222D24] text-[#FDFCFB] rounded-full text-xs font-label uppercase font-bold cursor-pointer transition-all"
              >
                Pay & Complete Order (${subtotal})
              </button>
            </form>
          </div>
        )}

        {step === 'confirmed' && completedRecord && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#2D3A2F] text-[#D4A39E] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Order Received!</h3>
            <p className="text-xs text-[#555555]">
              Thank you, {completedRecord.guestName}. Order Ref: <span className="font-mono font-bold text-[#2D3A2F]">{completedRecord.id}</span>
            </p>
            <p className="text-[11px] text-[#888888]">
              A confirmation email with tracking / instant digital download links has been sent to {completedRecord.guestEmail}.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#2D3A2F] text-white rounded-full text-xs font-label uppercase font-bold cursor-pointer hover:bg-[#222D24]"
            >
              Close & Continue
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
