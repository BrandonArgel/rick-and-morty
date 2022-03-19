import styles from './index.module.scss'

interface Props {
  title: string;
  options: string[];
  setValue: (value: string) => void;
  value: string;
  multiSelect?: boolean;
}

const Dropdown = ({ title = '', options = [], setValue, value, multiSelect = false }: Props) => {
  return (
    <select title={title} className={styles.dropdown} onChange={(e) => setValue(e.target.value.toLowerCase())} value={value}>
      {title && <option value="">{title}</option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Dropdown