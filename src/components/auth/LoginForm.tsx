import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useUserStore } from '@/stores/useUserStore';
import { useNavigate } from 'react-router-dom';

// Schéma de validation sécurisé
const loginSchema = z.object({
  email: z.string()
    .min(1, 'pages.login.errors.requiredField')
    .email('pages.login.errors.invalidEmail'),
  password: z.string()
    .min(1, 'pages.login.errors.requiredField')
    .min(8, 'pages.login.errors.minPassword'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      
      // Simulation d'une connexion sécurisée
      const success = await login(data.email, data.password);
      
      if (success) {
        // Redirection sécurisée après connexion
        navigate('/account');
      } else {
        setError('pages.login.errors.invalidCredentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('pages.login.errors.networkError');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // Implémentation de l'authentification sociale
    console.log(`Logging in with ${provider}`);
    // TODO: Implémenter l'authentification OAuth
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card border-border-muted">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-text-primary">
          {t('pages.login.title')}
        </CardTitle>
        <CardDescription className="text-text-secondary">
          {t('pages.login.subtitle')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-text-primary font-medium">
              {t('pages.login.email')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              {...register('email')}
              className={`bg-input border-border text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-ring focus:border-ring transition-all ${
                errors.email ? 'border-danger' : ''
              }`}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-danger">
                {t(errors.email.message || '')}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-text-primary font-medium">
              {t('pages.login.password')}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={`bg-input border-border text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-ring focus:border-ring transition-all ${
                errors.password ? 'border-danger' : ''
              }`}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-sm text-danger">
                {t(errors.password.message || '')}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                {...register('rememberMe')}
                className="rounded border-border bg-input text-primary focus:ring-ring focus:ring-2"
              />
              <Label htmlFor="rememberMe" className="text-sm text-text-secondary">
                {t('pages.login.rememberMe')}
              </Label>
            </div>
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-hover hover:underline transition-colors"
            >
              {t('pages.login.forgotPassword')}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl">
              <p className="text-sm text-danger">
                {t(error)}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn-green-black h-12 text-base font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            disabled={!isValid || isLoading}
          >
            {isLoading ? t('common.loading') : t('pages.login.signIn')}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-text-muted font-medium">
              {t('pages.login.orDivider')}
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-border bg-card hover:bg-card-secondary text-text-primary hover:text-text-primary transition-all rounded-xl"
            onClick={() => handleSocialLogin('google')}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t('pages.login.withGoogle')}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-border bg-card hover:bg-card-secondary text-text-primary hover:text-text-primary transition-all rounded-xl"
            onClick={() => handleSocialLogin('facebook')}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            {t('pages.login.withFacebook')}
          </Button>
        </div>

        {/* Switch to Register */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-text-secondary">
            {t('pages.login.noAccount')}{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:text-primary-hover hover:underline font-medium transition-colors"
            >
              {t('pages.login.createAccount')}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
