import React from 'react'

const Methodology = () => {
    const steps = [
        {
            number: 1,
            title: 'Data Collection',
            description: 'GEE (NDVI For wheat specific for punjab 36 districts) | Weather Data for Rabi crop season | Soil Data specific for 36 districts Wheat Yield  | Fertilizer Data and Wheat Yield Data'
        },
        {
            number: 2,
            title: 'Data Preprocessing',
            description: 'Temporal Alignment (Year +1) | Outlier Treatment (Mean Imputation + Winsorization) | Fertilizer Imputation (Normal Distribution) | Feature Scaling (StandardScaler) | One-Hot Encoding (District)'
        },
        {
            number: 3,
            title: 'Feature Selection',
            description: 'Pearson Correlation Heatmap | Domain Knowledge (Agronomy) | Removal of Redundant/Leakage Features | Final: 38 Input Features + Target'
        },
        {
            number: 4,
            title: 'Deep Learning Training',
            description: 'LSTM | ANN | RNN | ResNet | CNN-LSTM \n Adam Optimizer | MSE Loss | Early Stopping (patience=30) | Dropout Regularization | 500 Max Epochs'
        },
        {
            number: 5,
            title: 'Validation & Testing',
            description: 'Metrics: MAE | MSE | RMSE | R² \n Visualizations: Actual vs Predicted | Residuals | Loss Curves \n Selected Model: LSTM (Best Test R² = 0.9009)'
        },
        {
            number: 6,
            title: 'Deployment',
            description: 'The trained model was deployed as a web-based system using a Flask backend for prediction and processing. A simple frontend lets users select districts and input conditions to get real-time wheat yield predictions.'
        }
    ]

    const stats = [
        { value: '5', label: 'Deep Learning Models' },
        { value: '36', label: 'Districts Covered' },
        { value: '90%', label: 'Prediction Accuracy' },
        { value: '25 Years', label: 'Historical Data' }
    ]

    return (
        <section className="section methodology" id="methodology">
            <div className="container">
                <div className="section-header">
                    <h2>Data & Methodology</h2>
                    <div className="underline"></div>
                    <p>
                        Our systematic approach combines advanced Deep Learning models techniques with agricultural
                        domain knowledge to deliver accurate wheat yield predictions for Punjab, Pakistan.
                    </p>
                </div>

                <div className="methodology-grid">
                    {steps.map((step) => (
                        <div className="methodology-card" key={step.number}>
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="stats-banner">
                    {stats.map((stat, index) => (
                        <div className="stat-item" key={index}>
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Methodology
