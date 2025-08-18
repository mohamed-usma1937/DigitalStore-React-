import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Category } from '@/types';
import categoriesData from '@/data/categories.json';
import { useTranslation } from '@/hooks/useTranslation';

const Categories = () => {
  const { t } = useTranslation();
  const categories = categoriesData as Category[];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Toutes les <span className="gradient-text">catégories</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Explorez notre collection complète de produits digitaux organisés par catégories
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              type="search"
              placeholder={t('categories.searchPlaceholder')}
              className="pl-10 bg-background-secondary border-border"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group">
              <Link to={`/categories/${category.id}`}>
                <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-glow">
                  <div className={`h-20 w-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all`}>
                    <div className="text-3xl">
                      {category.icon === 'Gamepad2' && '🎮'}
                      {category.icon === 'Crown' && '👑'}
                      {category.icon === 'Code2' && '💻'}
                      {category.icon === 'Gift' && '🎁'}
                      {category.icon === 'Download' && '📱'}
                      {category.icon === 'TrendingUp' && '📈'}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-text-muted mb-4 leading-relaxed">{category.description}</p>
                  <Badge variant="outline" className="mb-4">
                    {category.productCount} {t('categories.productsCount')}
                  </Badge>
                  
                  {/* Subcategories if any */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-sm text-text-muted mb-2">Sous-catégories :</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <Badge key={sub.id} variant="glass" className="text-xs">
                            {sub.name}
                          </Badge>
                        ))}
                        {category.subcategories.length > 3 && (
                          <Badge variant="glass" className="text-xs">
                            +{category.subcategories.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 glass-card">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-text-muted mb-6">
            Utilisez notre recherche avancée pour trouver exactement ce dont vous avez besoin
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/search">
              Recherche avancée
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;