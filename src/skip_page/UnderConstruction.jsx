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

                <p>The {stepLabel} page is currently being built.</p>

                <p className="construction-description">
                    We're working hard to bring you this feature. Please check back soon!
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
