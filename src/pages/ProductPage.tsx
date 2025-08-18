import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  ShoppingCart, 
  Download, 
  Shield, 
  Zap,
  Check,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency } from '@/utils/currency';
import { Product } from '@/types';
import productsData from '@/data/products.json';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { currency } = useUIStore();
  const { t } = useTranslation();
  
  const products = productsData as Product[];
  const product = products.find(p => p.id === productId);
  
  const isWishlisted = product ? isInWishlist(product.id) : false;
  
  const hasDiscount = product?.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Related products (same category)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product.id);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">{t('product.notFound')}</h1>
          <Button asChild variant="outline">
            <Link to="/categories">{t('product.backToCategories')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-primary transition-colors">{t('product.home')}</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-primary transition-colors">{t('nav.categories')}</Link>
          <span>/</span>
          <Link to={`/categories/${product.categoryId}`} className="hover:text-primary transition-colors">
            {t('product.category')}
          </Link>
          <span>/</span>
          <span className="text-text-primary line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl glass-card">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary shadow-glow' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant={badge as any}
                    className="text-xs"
                  >
                    {t(`badge.${badge}`)}
                  </Badge>
                ))}
                {hasDiscount && (
                  <Badge variant="sale" className="text-xs font-bold">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-warning text-warning"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-muted">
                  {product.rating} ({product.reviewCount} {t('product.reviews')})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatCurrency(product.price, currency)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-text-muted line-through">
                    {formatCurrency(product.originalPrice!, currency)}
                  </span>
                )}
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 p-4 glass-card rounded-2xl">
              <div className="text-center">
                <Zap className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="text-xs text-text-muted">{t('product.garantees.instant')}</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-text-muted">{t('product.garantees.secure')}</p>
              </div>
              <div className="text-center">
                <Download className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-xs text-text-muted">{t('product.garantees.download')}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  variant="cart"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t('product.addToCartButton')}
                </Button>
                
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  size="lg"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? "fill-danger text-danger" : ""
                    }`}
                  />
                </Button>
              </div>

              <Button variant="hero" size="lg" className="w-full">
                {t('product.buyNow')}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">{t('product.tabs.features')}</TabsTrigger>
              <TabsTrigger value="details">{t('product.tabs.details')}</TabsTrigger>
              <TabsTrigger value="reviews">{t('product.tabs.reviews')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {t('product.tabs.features')}
                </h3>
                {product.features && product.features.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-success shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-muted">{t('product.noFeatures')}</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {t('product.tabs.details')}
                </h3>
                <div className="space-y-4">
                  {product.fileSize && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t('product.fileSize')}</span>
                      <span className="text-text-primary">{product.fileSize}</span>
                    </div>
                  )}
                  {product.supportedPlatforms && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t('product.supportedPlatforms')}</span>
                      <span className="text-text-primary">
                        {product.supportedPlatforms.join(', ')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t('product.productType')}</span>
                    <span className="text-text-primary">{t('product.digitalProduct')}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {t('product.tabs.reviews')} ({product.reviewCount})
                </h3>
                <div className="text-center py-8">
                  <p className="text-text-muted">
                    {t('product.reviewsComingSoon')}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              {t('product.relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="glass-card p-4 hover:shadow-glow transition-all">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full aspect-square object-cover rounded-xl mb-3"
                    />
                    <h3 className="font-medium text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-primary font-semibold mt-2">
                      {formatCurrency(relatedProduct.price, currency)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;