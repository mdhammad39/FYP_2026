import React, { useState, useEffect } from 'react'

const Predictions = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

    const [districts, setDistricts] = useState([])
    const [featureNames, setFeatureNames] = useState([])

    const [district, setDistrict] = useState('Attock')
    const [features, setFeatures] = useState({ Year: 2024 })
    const [prediction, setPrediction] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isFutureYear, setIsFutureYear] = useState(false)

    const availableYears = Array.from({ length: 2030 - 2001 + 1 }, (_, i) => 2001 + i)

    useEffect(() => {
        // Fetch available data
        fetch(`${API_URL}/available-data`)
            .then(res => res.json())
            .then(data => {
                if (data.districts) setDistricts(data.districts)
                if (data.districts && data.districts.length > 0) setDistrict(data.districts[0])
            })
            .catch(err => console.error("Failed to fetch available data:", err))

        // Fetch features
        fetch(`${API_URL}/features`)
            .then(res => res.json())
            .then(data => {
                if (data.feature_names) {
                    setFeatureNames(data.feature_names)
                    const initialFeatures = { Year: 2024 }
                    data.feature_names.forEach(fn => {
                        if (fn !== 'Year') initialFeatures[fn] = ''
                    })
                    setFeatures(initialFeatures)
                }
            })
            .catch(err => console.error("Failed to fetch features:", err))
    }, [])

    const loadTemplateData = async (dist, year) => {
        if (!dist || !year || featureNames.length === 0) return;
        try {
            const response = await fetch(`${API_URL}/template-data?district=${encodeURIComponent(dist)}&season_year=${encodeURIComponent(year)}`)
            const data = await response.json()
            if (data.success && data.features) {
                setIsFutureYear(false)
                setFeatures(data.features)
            } else {
                setIsFutureYear(true)
                const zeroFeatures = { Year: year }
                featureNames.forEach(fn => {
                    if (fn !== 'Year') zeroFeatures[fn] = ''
                })
                setFeatures(zeroFeatures)
            }
        } catch (err) {
            setIsFutureYear(true)
            const zeroFeatures = { Year: year }
            featureNames.forEach(fn => {
                if (fn !== 'Year') zeroFeatures[fn] = ''
            })
            setFeatures(zeroFeatures)
        }
    }

    useEffect(() => {
        const yearVal = features['Year'];
        if (yearVal) {
            loadTemplateData(district, yearVal);
        }
    }, [district, features['Year'], featureNames])

    const handleFeatureChange = (key, value) => {
        setFeatures(prev => ({ ...prev, [key]: value }))
    }

    const runPrediction = async () => {
        setIsLoading(true)
        setPrediction(null)

        const parsedFeatures = { ...features }
        for (const k in parsedFeatures) {
            if (k !== 'Year') {
                parsedFeatures[k] = parseFloat(parsedFeatures[k]) || 0
            }
        }

        const payload = {
            District: district,
            features: parsedFeatures
        }

        try {
            const response = await fetch(`${API_URL}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            if (data.success) {
                setPrediction({ yield: data.prediction.yield })
            } else {
                setPrediction({ error: data.error || 'Prediction failed' })
            }
        } catch (error) {
            setPrediction({ error: error.message })
        }
        setIsLoading(false)
    }

    const cleanLabel = (label) => label.replace(/_/g, ' ')

    return (
        <section className="section predictions" id="results">
            <div className="container">
                <div className="section-header">
                    <h2>Results & Predictions</h2>
                    <div className="underline"></div>
                    <p>Enter 37 features and District to predict yield (Total 38 Inputs)</p>
                </div>

                <div className="dk-panel">
                    <h3 className="dk-panel-title">Input Parameters</h3>

                    <div className="dk-top-row">
                        <div className="dk-field">
                            <label>District</label>
                            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="dk-field">
                            <label>Year</label>
                            <select value={features.Year} onChange={(e) => handleFeatureChange('Year', e.target.value)}>
                                {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    <h4 className="dk-month-heading">Model Features</h4>

                    <div className="dk-grid">
                        {featureNames.filter(key => key !== 'Year').map((key) => {
                            return (
                                <div className="dk-input-card" key={key}>
                                    <label title={key}>{cleanLabel(key)}</label>
                                    <div className="dk-input-wrap">
                                        <input
                                            type="number"
                                            step="any"
                                            placeholder="0"
                                            value={features[key] !== undefined ? features[key] : ''}
                                            onChange={(e) => handleFeatureChange(key, e.target.value)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <button className="dk-predict-btn" onClick={runPrediction} disabled={isLoading}>
                        {isLoading ? 'Predicting...' : 'Predict Yield'}
                    </button>

                    {prediction && (
                        <div className="dk-result">
                            <h3>Prediction Result</h3>
                            {prediction.error ? (
                                <div className="dk-result-error">Error: {prediction.error}</div>
                            ) : (
                                <div className="dk-result-success">
                                    Predicted Yield: <strong>{prediction.yield.toFixed(4)} tonnes/acre</strong>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Predictions
