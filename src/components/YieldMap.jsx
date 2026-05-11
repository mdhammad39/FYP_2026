import React from 'react'

const YieldMap = () => {
    // All 36 districts with average predicted yields from 25 years of historical data
    // Max yield: Pakpattan (1.35), used to calculate bar percentages
    const maxYield = 1.35

    const allDistricts = [
        { name: 'Attock', yield: 0.60 },
        { name: 'Bahawalnagar', yield: 1.23 },
        { name: 'Bahawalpur', yield: 1.23 },
        { name: 'Bhakkar', yield: 1.00 },
        { name: 'Chakwal', yield: 0.54 },
        { name: 'Chiniot', yield: 1.29 },
        { name: 'Dera Ghazi Khan', yield: 1.16 },
        { name: 'Faisalabad', yield: 1.27 },
        { name: 'Gujranwala', yield: 1.24 },
        { name: 'Gujrat', yield: 0.74 },
        { name: 'Hafizabad', yield: 1.23 },
        { name: 'Islamabad', yield: 0.61 },
        { name: 'Jhang', yield: 1.21 },
        { name: 'Jhelum', yield: 0.70 },
        { name: 'Kasur', yield: 1.23 },
        { name: 'Khanewal', yield: 1.30 },
        { name: 'Khushab', yield: 0.77 },
        { name: 'Lahore', yield: 1.21 },
        { name: 'Layyah', yield: 1.06 },
        { name: 'Lodhran', yield: 1.28 },
        { name: 'Mandi Bahauddin', yield: 1.12 },
        { name: 'Mianwali', yield: 0.92 },
        { name: 'Multan', yield: 1.21 },
        { name: 'Muzaffargarh', yield: 1.15 },
        { name: 'Nankana Sahib', yield: 1.31 },
        { name: 'Narowal', yield: 0.91 },
        { name: 'Okara', yield: 1.42 },
        { name: 'Pakpattan', yield: 1.43 },
        { name: 'Rahim Yar Khan', yield: 1.24 },
        { name: 'Rajanpur', yield: 1.17 },
        { name: 'Rawalpindi', yield: 0.63 },
        { name: 'Sahiwal', yield: 1.30 },
        { name: 'Sargodha', yield: 1.07 },
        { name: 'Sheikhupura', yield: 1.20 },
        { name: 'Sialkot', yield: 1.04 },
        { name: 'Toba Tek Singh', yield: 1.30 },
        { name: 'Vehari', yield: 1.28 }
    ]

    // Split into two columns
    const mid = Math.ceil(allDistricts.length / 2)
    const column1 = allDistricts.slice(0, mid)
    const column2 = allDistricts.slice(mid)

    const insights = [
        'Pakpattan (1.43 t/ha) and Okara (1.42 t/ha) show the highest average predicted yields based on 25 years of historical climate and NDVI data.',
        'Central Punjab districts (Sahiwal, Kasur, Khanewal, Lodhran, Toba Tek Singh) demonstrate the most consistent crop productivity.',
        'Northern districts (Attock, Chakwal, Rawalpindi, Islamabad, Jhelum) have lower yields due to terrain and rainfall variability.',
        'Western Punjab districts (Mianwali, Bhakkar, Layyah) face challenges with water scarcity affecting overall wheat production.'
    ]

    const DistrictList = ({ districts }) => (
        <div className="districts-list scrollable">
            {districts.map((district, index) => {
                const percentage = Math.round((district.yield / maxYield) * 100)
                return (
                    <div className="district-item" key={index}>
                        <div className="district-icon">📍</div>
                        <div className="district-info">
                            <div className="name">{district.name}</div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="district-value">{district.yield.toFixed(2)} tons/acres</div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <section className="section yield-map" id="yield-map">
            <div className="container">
                <div className="section-header">
                    <h2>District-Wise Yield Predicted</h2>
                    <div className="underline"></div>
                    <p>
                        Average predicted wheat yields across all 36 districts in Punjab province,
                        calculated from 25 years of historical climate and NDVI data using our Ensemble model.
                    </p>
                </div>

                <h3 style={{ marginBottom: '30px', fontSize: '1.2rem' }}>District-wise Predictions</h3>

                <div className="yield-map-content">
                    <DistrictList districts={column1} />
                    <DistrictList districts={column2} />
                </div>

                <div className="insights-box">
                    <h4>💡 Key Insights</h4>
                    <ul>
                        {insights.map((insight, index) => (
                            <li key={index}>
                                <span>✓</span>
                                {insight}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default YieldMap
