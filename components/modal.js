import styles from "./modal.module.css";

const Modal = ({ title, show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div style={{ paddingBottom: "5px" }}>
          <h1>{title}</h1>
          <hr />
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
