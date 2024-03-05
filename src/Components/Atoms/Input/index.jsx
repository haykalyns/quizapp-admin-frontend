import styles from "./Input.module.css";

const Input = (props) => {
  const { type = "text", label, placeholder, value, onChange } = props;

  return (
    <div>
      <label htmlFor="" id={styles.label}>{label}</label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
