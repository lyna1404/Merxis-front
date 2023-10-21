import React from 'react';

// View Icon
const IconView = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2F5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

// Edit Icon
const IconEdit = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2F5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

// Delete Icon
const IconDelete = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2F5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

// Cash Icon
const IconCash = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2F5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
);

export { IconView, IconEdit, IconDelete, IconCash };
