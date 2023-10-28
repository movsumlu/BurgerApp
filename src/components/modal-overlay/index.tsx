import styles from "./style.module.scss";

const ModalOverlay = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return <div className={styles.modalOverlay} onClick={onClick} />;
};

export default ModalOverlay;
