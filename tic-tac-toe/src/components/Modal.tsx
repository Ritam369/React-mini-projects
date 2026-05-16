import * as React from "react";

interface ModalProps {
  title: string;
  message: string;
  buttons?: Array<{
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  }>;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, message, buttons, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>

        {buttons && buttons.length > 0 && (
          <div className="modal-buttons">
            {buttons.map((button, idx) => (
              <button
                key={idx}
                className={`modal-button modal-button-${button.variant || "primary"}`}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
