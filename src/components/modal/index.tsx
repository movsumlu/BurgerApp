import { ReactNode } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "components/modal-overlay";

import { useKeyDown } from "hooks/useKeyDown";

import styles from "./style.module.scss";

const modalRoot = document.getElementById("modal-root");

interface IModalProps {
  headerText: string;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal = (props: IModalProps) => {
  const { headerText, onClose } = props;

  useKeyDown(onClose, "Escape");

  return modalRoot
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay onClick={onClose} />

          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={`${styles.modalTitle} text text_type_main-large`}>
                {headerText}
              </div>

              <button className={`${styles.modalCloseButton} modalCloseButton`}>
                <CloseIcon type={"primary"} onClick={onClose} />
              </button>
            </div>

            <div className={styles.modalContent}>{props.children}</div>
          </div>
        </>,
        modalRoot
      )
    : null;
};

Modal.defaultProps = {
  headerText: "",
};
