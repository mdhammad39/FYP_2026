import React from 'react'

const Partners = () => {
    const partners = [
        {
            name: 'Dawood University of Engineering & Technology',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
            description: 'A leading institution in Pakistan providing quality education in engineering, technology, and applied sciences. The university fosters innovation and research excellence in emerging technologies including artificial intelligence and data science.'
        },
        {
            name: 'SUPARCO - Space & Upper Atmosphere Research Commission',
            image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&q=80',
            description: "Pakistan's national space agency responsible for space research and satellite technology. SUPARCO provides crucial satellite imagery and remote sensing data for agricultural monitoring and environmental studies across Pakistan."
        }
    ]

    return (
        <section className="section partners" id="partners">
            <div className="container">
                <div className="section-header">
                    <h2>Institutional Partners</h2>
                    <div className="underline"></div>
                </div>

                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div className="partner-card" key={index}>
                            <div className="image-container">
                                <img src={partner.image} alt={partner.name} />
                            </div>
                            <h3>{partner.name}</h3>
                            <p>{partner.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Partners
