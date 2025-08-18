import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import SecurityFeatures from '@/components/auth/SecurityFeatures';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const handleSwitchMode = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('pages.backToHome')}
          </Button>
        </div>

        {/* Contenu principal */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Logo et titre de la marque */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-3xl mb-6 glow-primary">
                <svg
                  className="w-10 h-10 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold gradient-text mb-3">
                DigitalStore
              </h1>
              <p className="text-text-secondary text-lg">
                {authMode === 'login' 
                  ? t('pages.login.subtitle')
                  : t('pages.register.subtitle')
                }
              </p>
            </div>

            {/* Formulaires */}
            {authMode === 'login' ? (
              <LoginForm onSwitchToRegister={() => handleSwitchMode('register')} />
            ) : (
              <RegisterForm onSwitchToLogin={() => handleSwitchMode('login')} />
            )}

            {/* Composant de sécurité */}
            <SecurityFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;