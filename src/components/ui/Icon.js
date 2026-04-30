import * as Icons from 'lucide-react';

const Icon = ({ name, size = 24, className = "" }) => {
  // Convert kebab-case to PascalCase (e.g., 'shield-check' -> 'ShieldCheck')
  const pascalName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
    
  const IconComponent = Icons[pascalName];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" (mapped to "${pascalName}") not found in lucide-react.`);
    return null;
  }
  
  return <IconComponent size={size} className={className} />;
};

export default Icon;
