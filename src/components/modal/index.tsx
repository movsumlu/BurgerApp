import { ReactNode } from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay";

import styles from "./style.module.scss";

const Modal = (props: {
  headerText: string;
  onClose: () => void;
  children?: ReactNode;
}) => {
  const { headerText, onClose } = props;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={`${styles.modalTitle} text text_type_main-large`}>
            {headerText}
          </div>

          <button className={styles.modalCloseButton}>
            <CloseIcon type={"primary"} onClick={onClose} />
          </button>
        </div>

        <div className={styles.modalContent}>{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
