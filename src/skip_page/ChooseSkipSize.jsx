// Imports from another source
import { useState, useEffect } from 'react';

// My own imports
import UnderConstruction from './UnderConstruction';
import Footer from '../components/Footer';
import './ChooseSkipSize.css';

function SkipHireSelector() {
    const [selectedSkip, setSelectedSkip] = useState(null);
    const [showComparison, setShowComparison] = useState(false);
    const [currentPage, setCurrentPage] = useState('skip');
    const [skipData, setSkipData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const progressSteps = [
        { id: 'postcode', label: 'Postcode' },
        { id: 'waste', label: 'Waste Type' },
        { id: 'skip', label: 'Select Skip' },
        { id: 'permit', label: 'Permit Check' },
        { id: 'date', label: 'Choose Date' },
        { id: 'payment', label: 'Payment' }
    ];

    // Order of steps for progress tracking
    const stepOrder = ['postcode', 'waste', 'skip', 'permit', 'date', 'payment'];
    const currentStepIndex = stepOrder.indexOf(currentPage);

    // Dynamic properties for progress steps
    const progressStepsWithState = progressSteps.map((step, index) => ({
        ...step,
        completed: index < currentStepIndex,
        active: step.id === currentPage
    }));

    function calculateFinalPrice(priceBeforeVat, vat) {
        return Math.round(priceBeforeVat * (1 + vat / 100));
    };

    function getSkipRecommendation(size) {
        if (size <= 6) return "Perfect for small amount of waste";
        if (size <= 10) return "Great for medium amount of waste";
        if (size <= 16) return "Ideal for large home waste";
        return "Commercial & construction projects";
    };

    function getPopularityBadge(size) {
        if ([6, 8, 10].includes(size)) return "Most Popular";
        if (size === 4) return "Compact Choice";
        return null;
    };

    function handleStepClick(stepId) {
        if (stepId !== 'skip') {
            setCurrentPage(stepId);
        }
        else {
            setCurrentPage('skip');
        }
    };

    // Fetch skip data from api
    useEffect(() => {
        async function fetchSkipData() {
            try {
                setLoading(true);
                const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setSkipData(data);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching skip data:', err);
                setError('Failed to load skip data. Please try again later.');
            }
            finally {
                setLoading(false);
            }
        };

        fetchSkipData();
    }, []);

    return (
        <div className="skip-hire-container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="header-brand">
                        <div className="brand-icon">
                            <img src="./images/logo.png" alt="Logo" id='brand-icon-img'/>
                        </div>
                        <div className="brand-text">
                            <h1>REM Waste</h1>
                            <p>Skip Hire Made Easy</p>
                        </div>
                    </div>

                    <div className="location-info">
                        <span>📍</span>
                        <span>NR32 Lowestoft</span>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-content">
                    <div className="progress-steps">            {progressStepsWithState.map((step, index) => (
                        <div key={step.id} className="progress-step" onClick={() => handleStepClick(step.id)} style={{ cursor: 'pointer' }}>
                            <div className="flex items-center">
                                <div className={`step-circle ${step.completed
                                        ? 'completed'
                                        : step.active
                                            ? 'active'
                                            : 'pending'
                                    }`}>
                                    {step.completed ? '✓' : index + 1}
                                </div>
                                <span className={`step-label ${step.active ? 'active' : step.completed ? 'completed' : 'pending'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                            {index < progressStepsWithState.length - 1 && (
                                <div className={`step-connector ${progressStepsWithState[index + 1].completed || progressStepsWithState[index + 1].active ? 'active' : ''}`} />
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            {currentPage === 'skip' ? (
                <div className="main-content">
                    <div className="page-header">
                        <h2 className="page-title">Choose Your Perfect Skip Size</h2>

                        <p className="page-subtitle">
                            Select the skip size that best suits your project needs. All prices include VAT and 14-day hire period.
                        </p>
                        
                        <button
                            onClick={() => setShowComparison(!showComparison)}
                            className="comparison-toggle"
                        >
                            {showComparison ? 'Hide' : 'Show'} Size Comparison Guide
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <div className="loading-state" >
                            <div id="state-style" />
                            <p>Loading available skips...</p>
                        </div>
                    ) : (
                        <>
                            {/* Comparison Guide */}
                            <div className={`comparison-guide ${showComparison ? 'show' : ''}`}>
                                <h3 className="comparison-title">Skip Size Guide</h3>
                                <div className="comparison-grid">
                                    <div className="comparison-item">
                                        <div className="size">4-6 Yards</div>
                                        <div className="description">Garden waste, small cleanouts</div>
                                    </div>
                                    <div className="comparison-item">
                                        <div className="size">8-10 Yards</div>
                                        <div className="description">Kitchen/bathroom renovation</div>
                                    </div>
                                    <div className="comparison-item">
                                        <div className="size">12-16 Yards</div>
                                        <div className="description">Large home clearances</div>
                                    </div>
                                    <div className="comparison-item">
                                        <div className="size">20+ Yards</div>
                                        <div className="description">Commercial projects</div>
                                    </div>
                                </div>
                            </div>

                            {/* Skip Grid */}
                            <div className="skip-grid">
                                {
                                    skipData.map((skip) => {
                                        const finalPrice = calculateFinalPrice(skip.price_before_vat, skip.vat);
                                        const popularityBadge = getPopularityBadge(skip.size);
                                        const isSelected = selectedSkip?.id === skip.id;

                                        return (
                                            <div
                                                key={skip.id}
                                                className={`skip-card ${isSelected ? 'selected' : ''}`}
                                                onClick={() => setSelectedSkip(skip)}
                                            >
                                                {/* Popularity Badge */}
                                                {popularityBadge && (
                                                    <div className="popularity-badge">
                                                        <span>⭐</span>
                                                        <span>{popularityBadge}</span>
                                                    </div>
                                                )}

                                                {/* Selection Indicator */}
                                                {isSelected && (
                                                    <div className="selection-indicator">
                                                        <span>✓</span>
                                                    </div>
                                                )}

                                                <div className="card-content">
                                                    {/* Skip Visual */}
                                                    <div className="skip-visual">
                                                        <div className="skip-size">
                                                            <div className="number">{skip.size}</div>
                                                            <div className="unit">YARDS</div>
                                                        </div>
                                                        <div className="skip-brand">
                                                            REM Waste
                                                        </div>
                                                    </div>
                                            
                                                    {/* Skip Details */}
                                                    <div className="skip-details">
                                                        <div className="skip-info">
                                                            <h3>{skip.size} Yard Skip</h3>
                                                            <p>{getSkipRecommendation(skip.size)}</p>
                                                        </div>
                                            
                                                        {/* Features */}
                                                        <div className="features">
                                                            <div className="feature-badge days">
                                                                <span>📅</span>
                                                                <span>{skip.hire_period_days} days</span>
                                                            </div>
                                                            {skip.allowed_on_road && (
                                                                <div className="feature-badge road-legal">
                                                                    <span>🚛</span>
                                                                    <span>Allowed on road</span>
                                                                </div>
                                                            )}
                                                            {skip.allows_heavy_waste && (
                                                                <div className="feature-badge heavy-waste">
                                                                    <span>⚖️</span>
                                                                    <span>Heavy waste OK</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Pricing */}
                                                        <div className="pricing">
                                                            <div className="price">£{finalPrice}</div>
                                                            <div className="price-details">Inc. VAT & delivery</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                        
                                                {/* Select Button */}
                                                <div className="card-footer">
                                                    <button
                                                        className={`select-button ${isSelected ? 'selected' : 'default'}`}
                                                    >
                                                        <span>{isSelected ? 'Selected' : 'Select This Skip'}</span>
                                                        <span>→</span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            {/* Continue Button */}
                            {selectedSkip && (
                                <div className="continue-section">
                                    <button className="continue-button">
                                        <span>Continue to Permit Check</span>
                                        <span>→</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                ) : (
                    <UnderConstruction
                        stepLabel={progressStepsWithState.find(step => step.id === currentPage)?.label}
                        onBackToSkips={() => setCurrentPage('skip')}
                    />
                )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SkipHireSelector;