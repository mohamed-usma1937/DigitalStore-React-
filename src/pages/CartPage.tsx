import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/useCartStore';
import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency } from '@/utils/currency';

const CartPage = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { currency } = useUIStore();
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-text-muted mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-text-primary mb-4">{t('cart.emptyTitle')}</h1>
          <Button asChild variant="hero">
            <Link to="/categories">{t('cart.discoverProducts')}</Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-text-primary mb-8">{t('cart.myCart')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="glass-card p-6 flex gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{item.product.name}</h3>
                  <p className="text-text-muted text-sm">{formatCurrency(item.product.price, currency)}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="px-3 py-1 bg-background-secondary rounded-lg">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeItem(item.id)}
                      className="text-danger hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 h-fit">
            <h3 className="text-xl font-semibold text-text-primary mb-4">{t('cart.orderSummary')}</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>{t('cart.total')}</span>
                <span className="font-bold text-primary">{formatCurrency(getTotalPrice(), currency)}</span>
              </div>
            </div>
            <Button asChild variant="cart" size="lg" className="w-full">
              <Link to="/checkout">{t('cart.checkout')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;