import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const CheckoutPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-8">{t('pages.checkout.title')}</h1>
        <p className="text-text-muted mb-8">{t('pages.inDevelopment')}</p>
        <Button variant="outline">{t('pages.backToCart')}</Button>
      </div>
    </div>
  );
};

export default CheckoutPage;