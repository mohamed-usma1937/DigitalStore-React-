// Type definitions for the e-commerce store

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  images: string[];
  tags: string[];
  badges: ProductBadge[];
  rating: number;
  reviewCount: number;
  isDigital: boolean;
  downloadUrl?: string;
  licenseKey?: string;
  features?: string[];
  fileSize?: string;
  supportedPlatforms?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  gradient: string;
  productCount: number;
  parentId?: string;
  subcategories?: Category[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  currency: Currency;
  status: OrderStatus;
  createdAt: string;
  userEmail: string;
  downloadLinks?: OrderDownload[];
}

export interface OrderDownload {
  productId: string;
  downloadUrl: string;
  licenseKey?: string;
  expiresAt?: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  expiresAt?: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  avatar?: string;
  preferredLanguage: Language;
  preferredCurrency: Currency;
  isAuthenticated: boolean;
  orders: Order[];
  createdAt?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

export type Currency = 'DZD' | 'EUR' | 'USD';
export type Language = 'fr' | 'en' | 'ar';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type ProductBadge = 'new' | 'bestseller' | 'sale' | 'popular' | 'featured';
export type SortOption = 'newest' | 'popular' | 'price-asc' | 'price-desc' | 'rating';

export interface ExchangeRates {
  DZD: number;
  EUR: number;
  USD: number;
}

export interface SearchFilters {
  category?: string;
  priceRange?: [number, number];
  tags?: string[];
  rating?: number;
  sortBy?: SortOption;
  search?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductListResponse {
  products: Product[];
  meta: PaginationMeta;
}

// Store interfaces
export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  appliedCoupon?: Coupon;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addOrder: (order: Order) => void;
  isAuthenticated: () => boolean;
  getUser: () => User | null;
}

export interface WishlistState {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export interface UIState {
  language: Language;
  currency: Currency;
  isRTL: boolean;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
}