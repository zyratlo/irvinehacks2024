from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import os
from typing import List

app = FastAPI()

# Load the scikit-learn model
with open(os.path.join("models", "random_forest_model.pkl"), "rb") as file:
    model = pickle.load(file)

# Load list of symptoms
with open(os.path.join("models", "symptoms.pkl"), "rb") as file:
    symptoms = pickle.load(file)

# Define the input data model
class InputData(BaseModel):
    features: List[bool]

@app.post("/predict")
def predict(data: InputData):
    if (len(data.features) != 131):
        raise HTTPException(status_code=500, detail="Input data needs to be a list of 131 boolean values")

    try:
        # Extract features from the input data
        features = np.array([data.features])

        # Make predictions using the loaded model
        prediction = model.predict(features)

        return {"prediction": prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    
@app.post("/get_symptoms")
def get_symptoms():
    return symptoms
