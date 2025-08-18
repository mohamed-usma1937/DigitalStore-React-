import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/ProductCard';
import { Product, Category } from '@/types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { useTranslation } from '@/hooks/useTranslation';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useTranslation();
  
  const products = productsData as Product[];
  const categories = categoriesData as Category[];
  
  // Find the category
  const category = useMemo(() => {
    const mainCategory = categories.find(cat => cat.id === categoryId);
    if (mainCategory) return mainCategory;
    
    // Check subcategories
    for (const cat of categories) {
      if (cat.subcategories) {
        const subCategory = cat.subcategories.find(sub => sub.id === categoryId);
        if (subCategory) return subCategory;
      }
    }
    return null;
  }, [categories, categoryId]);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter(product => product.categoryId === categoryId);
  }, [products, categoryId, category]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Catégorie non trouvée</h1>
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
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-primary transition-colors">Catégories</Link>
          <span>/</span>
          <span className="text-text-primary">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-start gap-6">
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <Link to="/categories">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 bg-gradient-primary rounded-3xl flex items-center justify-center">
                  <div className="text-2xl">
                    {category.icon === 'Gamepad2' && '🎮'}
                    {category.icon === 'Crown' && '👑'}
                    {category.icon === 'Code2' && '💻'}
                    {category.icon === 'Gift' && '🎁'}
                    {category.icon === 'Download' && '📱'}
                    {category.icon === 'TrendingUp' && '📈'}
                    {category.icon === 'Smartphone' && '📱'}
                    {category.icon === 'Monitor' && '💻'}
                    {category.icon === 'Play' && '▶️'}
                    {category.icon === 'Zap' && '⚡'}
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                    {category.name}
                  </h1>
                  <p className="text-text-secondary text-lg">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  {categoryProducts.length} {t('categories.productsAvailable')}
                </Badge>
                <Badge variant="glass">
                  {t('categories.instantDelivery')}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {t('categories.filters')}
            </Button>
            <Button variant="ghost" size="sm">
              <Grid className="h-4 w-4 mr-2" />
              {t('categories.grid')}
            </Button>
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4 mr-2" />
              {t('categories.list')}
            </Button>
          </div>

          <div className="text-sm text-text-muted">
            {categoryProducts.length} produit{categoryProducts.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-text-muted mb-6">
              Cette catégorie ne contient pas encore de produits.
            </p>
            <Button variant="outline" asChild>
              <Link to="/categories">
                {t('categories.exploreOther')}
              </Link>
            </Button>
          </div>
        )}

        {/* Load More (if needed) */}
        {categoryProducts.length > 12 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              {t('categories.loadMore')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;