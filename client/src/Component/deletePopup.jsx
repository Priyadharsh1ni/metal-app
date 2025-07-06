import React from 'react';

const DeletePopup = ({ isOpen, onClose, onDelete, message = "Are you sure you want to delete this item?" }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <p>{message}</p>
                <div style={styles.buttons}>
                    <button onClick={onDelete} style={styles.deleteBtn}>Delete</button>
                    <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    popup: {
        background: '#fff',
        padding: '24px',
        borderRadius: '8px',
        minWidth: '300px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        textAlign: 'center'
    },
    buttons: {
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'end',
        gap: "10px"
    },
    deleteBtn: {
        background: '#000',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    cancelBtn: {
        background: '#ccc',
        color: '#333',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default DeletePopup;