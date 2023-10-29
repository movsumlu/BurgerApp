import { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay";

import styles from "./style.module.scss";

const modalRoot =
  document.getElementById("modalRoot") || document.createElement("div");

const Modal = (props: {
  headerText: string;
  onClose: () => void;
  children?: ReactNode;
}) => {
  const { headerText, onClose } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
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
    </>,
    modalRoot
  );
};

export default Modal;
