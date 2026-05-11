import React from 'react'

const About = () => {
    const features = [
        {
            icon: '🧠',
            title: 'Deep Learning Architectures',
            description: 'The system utilizes a suite of five advanced deep learning architectures: LSTM, ANN, RNN, ResNet, and CNN-LSTM. This multi-model approach allows us to capture both temporal dependencies and complex spatial patterns in wheat yield data for maximum precision.'
        },
        {
            icon: '⚙️',
            title: 'Optimization Strategy',
            description: 'Our models are trained using the Adam Optimizer and Mean Squared Error (MSE) loss function. To ensure robust generalization, we implement Dropout Regularization and Early Stopping with a patience of 30, preventing overfitting during the 500-epoch training cycle.'
        },
        {
            icon: '🎯',
            title: 'Model Performance',
            description: 'The deep learning framework achieves an exceptional R² score, explaining the vast majority of yield variability. With optimized hyperparameters, the system maintains minimal RMSE and MAE across all Punjab districts, confirming reliable and stable forecasting on unseen agricultural data.'
        }
    ]

    return (
        <section className="section about" id="about">
            <div className="container">
                <div className="section-header">
                    <h2>About the Model</h2>
                    <div className="underline"></div>
                </div>

                <div className="about-content">
                    <div className="about-image">
                        <img
                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80"
                            alt="AI Brain Visualization"
                        />
                    </div>

                    <div className="about-features">
                        {features.map((feature, index) => (
                            <div className="feature-item" key={index}>
                                <div className="feature-icon">
                                    <span>{feature.icon}</span>
                                </div>
                                <div className="feature-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
