import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './EmptyState.css';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** An icon name, or your own illustration. */
  icon?: IconName | ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** One primary action and, at most, one secondary action. */
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Heading level for the title. */
  as?: ElementType;
}

/** What people see when there is nothing to show yet: no results, no data, nothing selected. */
export function EmptyState({ icon, title, description, actions, size = 'md', as: Title = 'h3', className, ...rest }: EmptyStateProps) {
  const isName = typeof icon === 'string';
  return (
    <div className={['ds-empty', `ds-empty--${size}`, className].filter(Boolean).join(' ')} {...rest}>
      {icon && (
        <span className="ds-empty__icon" aria-hidden="true">
          {isName ? <Icon name={icon as IconName} size={size === 'sm' ? 20 : size === 'lg' ? 36 : 28} /> : icon}
        </span>
      )}
      <Title className="ds-empty__title">{title}</Title>
      {description && <p className="ds-empty__desc">{description}</p>}
      {actions && <div className="ds-empty__actions">{actions}</div>}
    </div>
  );
}
