import os
import pandas as pd
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from flasgger import Swagger

app = Flask(__name__)
CORS(app)
swagger = Swagger(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "WHEAT_YIELD_LSTM_MODEL.h5")
SCALER_PATH = os.path.join(BASE_DIR, "YIELD_SCALER_LSTM.pkl")
COLUMNS_PATH = os.path.join(BASE_DIR, "DISTRICT_COLUMNS_LSTM.pkl")
HISTORICAL_DATA_PATH = os.path.join(BASE_DIR, "CLEANED-PUNJAB-WHEAT-DATA (2001-2025).csv")

model = None
scaler = None
feature_names = None
historical_df = None

def load_resources():
    global model, scaler, feature_names, historical_df
    try:
        model = load_model(MODEL_PATH, compile=False)
        scaler = joblib.load(SCALER_PATH)
        columns = joblib.load(COLUMNS_PATH)
        feature_names = list(columns)
        
        if os.path.exists(HISTORICAL_DATA_PATH):
            historical_df = pd.read_csv(HISTORICAL_DATA_PATH)
        
        print(f"[SUCCESS] Loaded LSTM model, scaler, and columns!")
        return True
    except Exception as e:
        print(f"[ERROR] Loading failed: {e}")
        import traceback
        traceback.print_exc()
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """
    Check if the API is healthy.
    ---
    responses:
      200:
        description: API status
        schema:
          properties:
            status:
              type: string
              example: healthy
    """
    return jsonify({'status': 'healthy'})

@app.route('/template-data', methods=['GET'])
def template_data():
    """
    Get historical feature values for a district and year.
    ---
    parameters:
      - name: district
        in: query
        type: string
        required: true
        description: Name of the district
      - name: season_year
        in: query
        type: string
        required: true
        description: The year (e.g., 2024)
    responses:
      200:
        description: Historical feature data
      400:
        description: Missing parameters
      404:
        description: Data not found
    """
    if historical_df is None:
        return jsonify({'success': False, 'error': 'Historical data not loaded'}), 500
    
    district = request.args.get('district', '').lower()
    year_str = request.args.get('season_year')
    if not district or not year_str:
        return jsonify({'success': False, 'error': 'district and season_year are required'}), 400
    
    try:
        year = int(str(year_str).split('-')[0])
    except:
        year = 2024
        
    mask = (historical_df['District'].str.lower() == district) & (historical_df['Year'] == year)
    matching = historical_df[mask]
    
    if len(matching) > 0:
        row = matching.iloc[0]
        features = {}
        for col in feature_names[:37]:
            if col in historical_df.columns:
                val = row[col]
                features[col] = float(val) if pd.notna(val) else 0.0
            else:
                features[col] = 0.0
        return jsonify({
            'success': True,
            'features': features,
            'district': district,
            'year': year
        })
    else:
        return jsonify({'success': False, 'error': 'No data found'}), 404

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict wheat yield based on 38 features.
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          properties:
            District:
              type: string
              example: attock
            features:
              type: object
              description: Dictionary of 37 continuous features
    responses:
      200:
        description: Prediction result
      400:
        description: Invalid input or prediction failure
    """
    if model is None or scaler is None or feature_names is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        data = request.get_json()
        district = data.get('District', '').lower()
        user_features = data.get('features', {})
        
        input_data = {col: 0.0 for col in feature_names}
        
        for col in feature_names[:37]:
            if col in user_features:
                input_data[col] = float(user_features[col])
        
        district_col = f"District_{district}"
        if district_col in input_data:
            input_data[district_col] = 1.0
            
        input_df = pd.DataFrame([input_data])[feature_names]
        
        scaled_input = scaler.transform(input_df)
        lstm_input = scaled_input.reshape((1, 1, 73))
        predicted_yield = model.predict(lstm_input)[0][0]
        
        return jsonify({
            'success': True,
            'prediction': {
                'yield': float(predicted_yield),
                'confidence': 95
            }
        })
        
    except Exception as e:
        import traceback
        return jsonify({'success': False, 'error': str(e), 'details': traceback.format_exc()}), 400

@app.route('/available-data', methods=['GET'])
def available_data():
    """
    Get lists of available districts and years.
    ---
    responses:
      200:
        description: Available districts and years
    """
    future_years = [f"{y}-{str(y+1)[-2:]}" for y in range(2025, 2031)]
    if historical_df is not None:
        districts = sorted([str(d).title() for d in historical_df['District'].unique() if pd.notna(d)])
        hist_years = sorted(historical_df['Year'].unique().tolist())
        season_years = [f"{y}-{str(y+1)[-2:]}" for y in hist_years]
        season_years = sorted(list(set(season_years) | set(future_years)))
    else:
        districts = [col.replace('District_', '').title() for col in feature_names[37:]]
        season_years = sorted(future_years)
        
    return jsonify({
        'districts': districts,
        'seasonYears': season_years
    })

@app.route('/features', methods=['GET'])
def get_features():
    """
    Get the names of the 37 model features.
    ---
    responses:
      200:
        description: List of feature names
    """
    return jsonify({
        'feature_names': feature_names[:37] if feature_names else []
    })

# Load model and data immediately so Gunicorn has them ready
load_resources()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
