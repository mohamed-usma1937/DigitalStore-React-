import { Link } from 'react-router-dom';
import { 
  Zap, 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  Mail,
  Shield,
  Headphones,
  Truck
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'Github' },
];

const trustFeatures = [
  {
    icon: Truck,
    titleKey: 'footer.features.instantDelivery.title',
    descriptionKey: 'footer.features.instantDelivery.description'
  },
  {
    icon: Shield,
    titleKey: 'footer.features.securePayment.title',
    descriptionKey: 'footer.features.securePayment.description'
  },
  {
    icon: Headphones,
    titleKey: 'footer.features.support247.title',
    descriptionKey: 'footer.features.support247.description'
  },
];

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-tertiary border-t border-border">
      {/* Trust Features */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 p-4 glass-card">
              <div className="h-12 w-12 bg-gradient-primary rounded-2xl flex items-center justify-center shrink-0">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{t(feature.titleKey)}</h3>
                <p className="text-sm text-text-muted">{t(feature.descriptionKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">
                {t('footer.company')}
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon-sm"
                  asChild
                  className="text-text-muted hover:text-primary"
                >
                  <a 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">{t('nav.categories')}</h3>
            <nav className="space-y-2">
              <Link 
                to="/categories" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('navigation.allCategories')}
              </Link>
              <Link 
                to="/categories/gaming-recharges" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('navigation.gamingRecharges')}
              </Link>
              <Link 
                to="/categories/software" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('navigation.software')}
              </Link>
              <Link 
                to="/categories/subscriptions" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('navigation.subscriptions')}
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">{t('footer.support')}</h3>
            <nav className="space-y-2">
              <Link 
                to="/faq" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('footer.faq')}
              </Link>
              <Link 
                to="/support" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('footer.contact')}
              </Link>
              <a 
                href="mailto:support@digitalstore.pro" 
                className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                support@digitalstore.pro
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">{t('footer.legal')}</h3>
            <nav className="space-y-2">
              <Link 
                to="/legal/terms" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('footer.terms')}
              </Link>
              <Link 
                to="/legal/privacy" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                to="/legal/refunds" 
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                {t('footer.refunds')}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-background-secondary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              Copyright © {currentYear} <a 
                href="https://bouchelaghemmohamed.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors underline decoration-dotted hover:decoration-solid"
              >
                Bouchelaghem Mohamed seddik
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span>{t('footer.marketplace')}</span>
              <span>•</span>
              <span>{t('footer.instantDelivery')}</span>
              <span>•</span>
              <span>{t('footer.support24')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}