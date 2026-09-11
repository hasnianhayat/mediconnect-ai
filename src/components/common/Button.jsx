const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  mint: 'btn-mint',
  danger: 'btn-danger',
};

export default function Button({
  as: As = 'button',
  variant = 'primary',
  size,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) {
  const cls = `${VARIANTS[variant] || VARIANTS.primary} ${size === 'sm' ? 'btn-sm' : ''} rounded-lg ${className}`;
  return (
    <As className={cls} {...props}>
      {Icon && iconPosition === 'left' && <Icon size={16} strokeWidth={2.25} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={16} strokeWidth={2.25} />}
    </As>
  );
}
