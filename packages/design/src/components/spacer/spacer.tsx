import c from 'clsx';
import classes from './spacer.scss';

type Props = {
  size: number;
  inline?: boolean;
  axis?: 'horizontal' | 'vertical';
  l?: number;
  m?: number;
  s?: number;
  xs?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const Spacer = ({
  inline,
  size,
  axis,
  l,
  m,
  s,
  xs,
  className,
  ...props
}: Props) => (
  <div
    {...props}
    className={c(
      classes.base,
      {
        [classes.inline]: inline,
        [classes.vertical]: axis === 'vertical',
        [classes.horizontal]: axis === 'horizontal',
      },
      classes[`space-${size}`],
      classes[`space-l-${l}`],
      classes[`space-m-${m}`],
      classes[`space-s-${s}`],
      classes[`space-xs-${xs}`],
      className,
    )}
  />
);
