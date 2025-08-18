import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo et titre */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-3xl mb-6 glow-primary">
              <svg
                className="w-12 h-12 text-primary-foreground"
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
            <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Oups ! Page introuvable
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
              La page que vous recherchez n'existe pas ou a été déplacée. 
              Vérifiez l'URL ou utilisez les liens ci-dessous pour naviguer.
            </p>
          </div>

          {/* Informations de débogage */}
          <div className="glass-card border-border-muted p-4 mb-8">
            <p className="text-sm text-text-muted font-mono">
              Route tentée : <span className="text-text-secondary">{location.pathname}</span>
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={handleGoHome}
              className="btn-green-black h-12 px-8 text-base font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </Button>
            
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="h-12 px-8 border-border bg-card hover:bg-card-secondary text-text-primary hover:text-text-primary transition-all rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Page précédente
            </Button>
          </div>

          {/* Suggestions de navigation */}
          <div className="glass-card border-border-muted p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              🧭 Suggestions de navigation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-muted/20 border border-border-muted">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Accueil</h4>
                <p className="text-xs text-text-secondary">
                  Découvrez nos produits digitaux
                </p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-muted/20 border border-border-muted">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Recherche</h4>
                <p className="text-xs text-text-secondary">
                  Trouvez ce que vous cherchez
                </p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-muted/20 border border-border-muted">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Connexion</h4>
                <p className="text-xs text-text-secondary">
                  Accédez à votre compte
                </p>
              </div>
            </div>
          </div>

          {/* Footer informatif */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-text-muted">
              Si vous pensez qu'il s'agit d'une erreur, contactez notre support technique
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
