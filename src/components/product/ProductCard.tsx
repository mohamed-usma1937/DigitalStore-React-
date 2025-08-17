import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency } from '@/utils/currency';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const badgeVariantMap = {
  new: 'new' as const,
  bestseller: 'bestseller' as const,
  sale: 'sale' as const,
  popular: 'popular' as const,
  featured: 'featured' as const,
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { currency } = useUIStore();
  const { t } = useTranslation();
  
  const isWishlisted = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className={cn(
      "group relative overflow-hidden glass-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {product.badges.map((badge) => (
              <Badge
                key={badge}
                variant={badgeVariantMap[badge]}
                className="text-xs"
              >
                {t(`badge.${badge}`)}
              </Badge>
            ))}
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3">
              <Badge variant="sale" className="text-xs font-bold">
                -{discountPercentage}%
              </Badge>
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="glass"
            size="icon-sm"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleToggleWishlist}
            style={{ right: hasDiscount ? '4rem' : '0.75rem' }}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isWishlisted ? "fill-danger text-danger" : "text-text-muted"
              )}
            />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "fill-warning text-warning"
                      : "text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted ml-1">
              {product.rating} ({product.reviewCount} {t('product.reviews')})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price, currency)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-text-muted line-through">
                {formatCurrency(product.originalPrice!, currency)}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2 text-xs text-success">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              {t('product.instantDelivery')}
            </div>
            {product.features && product.features[0] && (
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {product.features[0]}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          variant="cart"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t('product.addToCart')}
        </Button>
      </div>
    </div>
  );
}