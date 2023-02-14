import { FC, ReactNode } from 'react';
import style from './style.module.css';
interface IButtonComponent {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonComponent: FC<IButtonComponent> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button className={className || style.buttonC} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
