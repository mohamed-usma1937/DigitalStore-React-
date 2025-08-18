import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const criteria = [
    {
      label: 'Au moins 8 caractères',
      test: password.length >= 8,
    },
    {
      label: 'Au moins une lettre',
      test: /[a-zA-Z]/.test(password),
    },
    {
      label: 'Au moins un chiffre',
      test: /\d/.test(password),
    },
    {
      label: 'Au moins un caractère spécial',
      test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const strength = criteria.filter(c => c.test).length;
  const strengthPercentage = (strength / criteria.length) * 100;

  const getStrengthColor = () => {
    if (strengthPercentage <= 25) return 'bg-danger';
    if (strengthPercentage <= 50) return 'bg-warning';
    if (strengthPercentage <= 75) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (strengthPercentage <= 25) return 'Très faible';
    if (strengthPercentage <= 50) return 'Faible';
    if (strengthPercentage <= 75) return 'Moyen';
    return 'Fort';
  };

  const getStrengthTextColor = () => {
    if (strengthPercentage <= 25) return 'text-danger';
    if (strengthPercentage <= 50) return 'text-warning';
    if (strengthPercentage <= 75) return 'text-warning';
    return 'text-success';
  };

  if (!password) return null;

  return (
    <div className="space-y-3 p-4 bg-muted/20 rounded-xl border border-border-muted">
      {/* Barre de force */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-text-secondary font-medium">Force du mot de passe</span>
          <span className={`font-semibold ${getStrengthTextColor()}`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="w-full bg-background-tertiary rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
      </div>

      {/* Critères */}
      <div className="space-y-2">
        {criteria.map((criterion, index) => (
          <div key={index} className="flex items-center space-x-2">
            {criterion.test ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <X className="w-4 h-4 text-danger" />
            )}
            <span className={`text-xs font-medium ${
              criterion.test ? 'text-success' : 'text-danger'
            }`}>
              {criterion.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
