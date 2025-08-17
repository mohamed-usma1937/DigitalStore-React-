import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  Globe, 
  Coins,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/stores/useCartStore';
import { useUIStore } from '@/stores/useUIStore';
import { useUserStore } from '@/stores/useUserStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Currency, Language } from '@/types';

const languages = [
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇩🇿' },
];

const currencies = [
  { code: 'DZD' as Currency, name: 'Dinar Algérien', symbol: 'د.ج' },
  { code: 'EUR' as Currency, name: 'Euro', symbol: '€' },
  { code: 'USD' as Currency, name: 'US Dollar', symbol: '$' },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { getTotalItems } = useCartStore();
  const { language, currency, setLanguage, setCurrency, isRTL } = useUIStore();
  const { user, logout } = useUserStore();
  
  const cartItemsCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg gradient-text hidden md:block">
            DigitalStore Pro
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              type="search"
              placeholder={t('nav.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-background-secondary border-border ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={language === lang.code ? 'bg-muted' : ''}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Coins className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {currencies.map((curr) => (
                <DropdownMenuItem
                  key={curr.code}
                  onClick={() => setCurrency(curr.code)}
                  className={currency === curr.code ? 'bg-muted' : ''}
                >
                  <span className="mr-2">{curr.symbol}</span>
                  {curr.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wishlist */}
          <Button asChild variant="ghost" size="icon-sm">
            <Link to="/wishlist">
              <Heart className="h-4 w-4" />
            </Link>
          </Button>

          {/* Cart */}
          <Button asChild variant="ghost" size="icon-sm" className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="sale" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-text-muted">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account">{t('nav.account')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">Mes commandes</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-danger">
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Connexion</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon-sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-border bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-6 py-2 overflow-x-auto scrollbar-thin">
            <Link 
              to="/categories" 
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors whitespace-nowrap"
            >
              {t('categories.all')}
            </Link>
            <Link 
              to="/categories/gaming-recharges" 
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors whitespace-nowrap"
            >
              {t('categories.gaming')}
            </Link>
            <Link 
              to="/categories/software" 
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors whitespace-nowrap"
            >
              {t('categories.software')}
            </Link>
            <Link 
              to="/categories/subscriptions" 
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors whitespace-nowrap"
            >
              {t('categories.subscriptions')}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}