import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Shield, Headphones, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Product, Category } from '@/types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

const heroFeatures = [
  {
    icon: Zap,
    titleKey: 'hero.features.instantDelivery.title',
    descriptionKey: 'hero.features.instantDelivery.description',
  },
  {
    icon: Shield,
    titleKey: 'hero.features.securePayment.title',
    descriptionKey: 'hero.features.securePayment.description',
  },
  {
    icon: Headphones,
    titleKey: 'hero.features.support247.title',
    descriptionKey: 'hero.features.support247.description',
  },
];

const Index = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = productsData as Product[];
  const categories = categoriesData as Category[];

  // Filter products by sections
  const featuredProducts = useMemo(() => 
    products.filter(p => p.badges.includes('featured')).slice(0, 6)
  , [products]);

  const newProducts = useMemo(() => 
    products.filter(p => p.badges.includes('new')).slice(0, 4)
  , [products]);

  const bestsellerProducts = useMemo(() => 
    products.filter(p => p.badges.includes('bestseller')).slice(0, 4)
  , [products]);

  const saleProducts = useMemo(() => 
    products.filter(p => p.badges.includes('sale')).slice(0, 4)
  , [products]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="new" className="mb-6 animate-pulse-glow">
              {t('homepage.hero.badge')}
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">{t('hero.title')}</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Hero Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                <Input
                  type="search"
                  placeholder={t('homepage.hero.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-32 bg-background-secondary/50 backdrop-blur-xl border-border text-lg rounded-3xl"
                />
                <Button
                  variant="hero"
                  size="lg"
                  className="absolute right-2 top-2 bottom-2 px-8 btn-green-black"
                  asChild
                >
                  <Link to={searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/categories'}>
                    {t('hero.cta')}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {heroFeatures.map((feature, index) => (
                <div key={index} className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                  <div className="h-12 w-12 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-text-muted">{t(feature.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              {t('homepage.categories.title')}
            </h2>
            <p className="text-text-secondary text-lg">
              {t('homepage.categories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group"
              >
                <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-glow">
                  <div className={`h-16 w-16 bg-${category.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all`}>
                    <div className="text-2xl">
                      {category.icon === 'Gamepad2' && '🎮'}
                      {category.icon === 'Crown' && '👑'}
                      {category.icon === 'Code2' && '💻'}
                      {category.icon === 'Gift' && '🎁'}
                      {category.icon === 'Download' && '📱'}
                      {category.icon === 'TrendingUp' && '📈'}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-3">{category.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {category.productCount} {t('homepage.categories.productsCount')}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="btn-gray-black" asChild>
              <Link to="/categories">
                {t('homepage.categories.viewAll')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  {t('homepage.featured.title')}
                </h2>
                <p className="text-text-secondary">
                  {t('homepage.featured.subtitle')}
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/categories?filter=featured">
                  {t('homepage.featured.viewAll')}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* New Products */}
            {newProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-accent" />
                  <h3 className="text-2xl font-bold text-text-primary">{t('homepage.new.title')}</h3>
                </div>
                <div className="space-y-4">
                  {newProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex gap-4 p-4 glass-card hover:shadow-glow transition-all group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl group-hover:scale-110 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-sm text-text-muted line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="new" className="text-xs">{t('product.newBadge')}</Badge>
                          <span className="text-sm font-semibold text-primary">
                            {product.price} {t('product.priceUnit')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bestsellers */}
            {bestsellerProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <h3 className="text-2xl font-bold text-text-primary">{t('homepage.bestsellers.title')}</h3>
                </div>
                <div className="space-y-4">
                  {bestsellerProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex gap-4 p-4 glass-card hover:shadow-glow transition-all group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl group-hover:scale-110 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-warning text-warning"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-text-muted ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="bestseller" className="text-xs">{t('product.bestsellerBadge')}</Badge>
                          <span className="text-sm font-semibold text-primary">
                            {product.price} {t('product.priceUnit')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sale Products */}
            {saleProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-danger" />
                  <h3 className="text-2xl font-bold text-text-primary">{t('homepage.promotions.title')}</h3>
                </div>
                <div className="space-y-4">
                  {saleProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex gap-4 p-4 glass-card hover:shadow-glow transition-all group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl group-hover:scale-110 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-primary">
                            {product.price} {t('product.priceUnit')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-text-muted line-through">
                              {product.originalPrice} {t('product.priceUnit')}
                            </span>
                          )}
                        </div>
                        <Badge variant="sale" className="text-xs mt-1">
                          {t('product.discount')}{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">{t('homepage.cta.title')}</span>
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              {t('homepage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/categories">
                  {t('homepage.cta.explore')}
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/account">
                  {t('homepage.cta.createAccount')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;