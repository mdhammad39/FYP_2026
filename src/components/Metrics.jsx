import React from 'react'

const Metrics = () => {
    const metrics = [
        {
            id: 'mae',
            label: 'MAE',
            fullName: 'Mean Absolute Error',
            value: 0.064,
            isPercentage: false,
            isGood: true,
            arrowUp: false
        },
        {
            id: 'mse',
            label: 'MSE',
            fullName: 'Mean Square Error',
            value: 0.0071,
            isPercentage: false,
            isGood: true,
            arrowUp: false
        },
        {
            id: 'r2',
            label: 'R²',
            fullName: 'R-Squared Score',
            value: 90.09,
            isPercentage: true,
            isGood: true,
            arrowUp: true
        },
        {
            id: 'rmse',
            label: 'RMSE',
            fullName: 'Root Mean Square Error',
            value: 0.0848,
            isPercentage: false,
            isGood: true,
            arrowUp: false
        }
    ]

    return (
        <section className="metrics-section" id="metrics">
            <div className="container">
                {/* Section Header - No badge */}
                <div className="metrics-header">
                    <h2 className="metrics-title">Performance Metrics</h2>
                    <div className="underline"></div>
                    <p className="metrics-subtitle">
                        Comprehensive evaluation metrics demonstrating the reliability and accuracy of our wheat yield prediction model
                    </p>
                </div>

                {/* Metrics Grid - 4 boxes */}
                <div className="metrics-grid-new">
                    {metrics.map((metric) => (
                        <div className="metric-card-new" key={metric.id}>
                            {/* Metric content - no background arrows */}
                            <div className="metric-content">
                                <div className="metric-icon-container">
                                    <span className="metric-icon">
                                        {metric.id === 'mae' && '◈'}
                                        {metric.id === 'mse' && '◇'}
                                        {metric.id === 'r2' && '%'}
                                        {metric.id === 'rmse' && '⌬'}
                                    </span>
                                </div>

                                <div className="metric-value-new">
                                    {metric.value}{metric.isPercentage ? '%' : ''}
                                </div>

                                <div className="metric-label-new">{metric.label}</div>
                                <div className="metric-fullname">{metric.fullName}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Metrics

