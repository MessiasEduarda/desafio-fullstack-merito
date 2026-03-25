import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { containerStyle, headerStyle, titleStyle, closeButtonStyle, bodyStyle } from './styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        padding: '1rem',
      }}
    >
      <div className={containerStyle}>
        <div className={headerStyle}>
          <h2 className={titleStyle}>{title}</h2>
          <button onClick={onClose} className={closeButtonStyle}>✕</button>
        </div>
        <div className={bodyStyle}>{children}</div>
      </div>
    </div>,
    document.body
  );
}