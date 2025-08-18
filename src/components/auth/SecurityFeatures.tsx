import React from 'react';
import { Shield, Lock, Eye, Key } from 'lucide-react';

const SecurityFeatures: React.FC = () => {
  return (
    <div className="glass-card border-border-muted p-6 mt-8">
      <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">
        🔒 Sécurité et Protection
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-1">Chiffrement SSL/TLS</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Toutes les données sont transmises de manière sécurisée avec chiffrement de bout en bout
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-1">Mots de passe sécurisés</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Hachage bcrypt et validation stricte des mots de passe avec critères de sécurité
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-1">Protection des données</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Vos informations personnelles sont protégées et ne sont jamais partagées avec des tiers
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
              <Key className="w-5 h-5 text-warning" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-1">Authentification 2FA</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Support pour l'authentification à deux facteurs (bientôt disponible) pour une sécurité renforcée
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Conformité RGPD
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Chiffrement de bout en bout
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Audit de sécurité régulier
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;
