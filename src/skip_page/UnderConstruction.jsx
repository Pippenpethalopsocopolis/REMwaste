// Imports from another source
import React from 'react';

// My own imports
import './UnderConstruction.css';

function UnderConstruction({ stepLabel, onBackToSkips }) {
    return (
        <div className="under-construction">
            <div className="construction-content">
                <div className="construction-icon">🚧</div>

                <h2>Under Construction</h2>

                <p>The <b>{stepLabel}</b> page is currently being built.</p>

                <p className="construction-description">
                    Thank you for taking time to review my application {':)'}
                </p>

                <button
                    onClick={onBackToSkips}
                    className="back-button"
                >
                    <span>←</span>
                    <span>Back to Skip Selection</span>
                </button>
            </div>
        </div>
    );
};

export default UnderConstruction;
