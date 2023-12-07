import styles from "./style.module.scss";

export const ModalOverlay = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return <div className={styles.modalOverlay} onClick={onClick} />;
};
