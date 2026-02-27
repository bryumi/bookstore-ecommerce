'use client';

import { useStore } from '@/lib/store-context';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders } = useStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-gold/20 text-gold border-gold';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-600 border-blue-500';
      case 'delivered':
        return 'bg-sage/20 text-sage border-sage';
      default:
        return 'bg-charcoal/20 text-charcoal border-charcoal';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Processando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <svg className="w-32 h-32 mx-auto text-charcoal/20 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
              Nenhum Pedido Ainda
            </h1>
            <p className="font-sans text-lg text-charcoal/60 mb-8">
              Seus pedidos aparecerão aqui após a finalização da compra
            </p>
            <Link href="/" className="btn-primary inline-block">
              Começar a Comprar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-2">
            Meus Pedidos
          </h1>
          <p className="font-sans text-charcoal/60">
            Acompanhe o status dos seus pedidos
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-burgundy to-burgundy/80 text-cream p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-sans text-sm text-cream/80 mb-1">Pedido</p>
                    <p className="font-display text-2xl font-bold">{order.id}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <p className="font-sans text-sm text-cream/80">
                      {formatDate(order.date)}
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-sans font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-charcoal/10 last:border-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-display text-lg font-semibold text-charcoal">
                          {item.title}
                        </h3>
                        <p className="text-sm text-charcoal/60 font-sans italic mb-2">
                          por {item.author}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-charcoal/60 font-sans">
                            Quantidade: {item.quantity}
                          </p>
                          <p className="font-display text-lg font-semibold text-burgundy">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="border-t border-charcoal/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-xl font-semibold text-charcoal">
                      Total do Pedido
                    </span>
                    <span className="font-display text-2xl font-bold text-burgundy">
                      R$ {order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Status Timeline */}
                <div className="mt-6 pt-6 border-t border-charcoal/10">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-sage' : 'bg-charcoal/20'}`}>
                        <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs font-sans mt-2 text-charcoal/60">Processando</span>
                    </div>
                    
                    <div className={`flex-1 h-1 mx-2 ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-sage' : 'bg-charcoal/20'}`}></div>
                    
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-sage' : 'bg-charcoal/20'}`}>
                        <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs font-sans mt-2 text-charcoal/60">Enviado</span>
                    </div>
                    
                    <div className={`flex-1 h-1 mx-2 ${order.status === 'delivered' ? 'bg-sage' : 'bg-charcoal/20'}`}></div>
                    
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-sage' : 'bg-charcoal/20'}`}>
                        <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs font-sans mt-2 text-charcoal/60">Entregue</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link href="/" className="btn-secondary inline-block">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
