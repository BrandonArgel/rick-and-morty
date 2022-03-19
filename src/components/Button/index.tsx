import styles from './index.module.scss'

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ children, onClick, className = "", ...props }:Props) => {
  return (
    <button className={`${styles.button} ${className ? className : ""}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button