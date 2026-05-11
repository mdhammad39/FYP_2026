import React from 'react'

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1>Climate Aware Punjab<br />Wheat Yield Prediction</h1>
                <p>
                    Advanced AI-powered prediction model using Deep Learning Models to forecast wheat yields.
                    Empowering farmers and policy makers with data-driven agricultural insights.
                </p>
                <div className="hero-buttons">
                    <a href="#results" className="btn btn-primary">
                        <span>📊</span> View Predictions
                    </a>
                    <a href="#about" className="btn btn-outline">Learn More</a>
                </div>
            </div>
        </section>
    )
}

export default Hero
