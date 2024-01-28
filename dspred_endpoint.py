# RUN "uvicorn dspred_endpoint:app --reload"
# and "npm run dev" in \frontend\react-app

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

# Load illness descriptions
with open(os.path.join("models", "illness_descriptions.pkl"), "rb") as file:
    illness_descriptions = pickle.load(file)

# Load id conversion
with open(os.path.join("models", "convert_id_to_illness.pkl"), "rb") as file:
    convert_id_to_illness = pickle.load(file)

# Load illness precautions
with open(os.path.join("models", "illness_precautions.pkl"), "rb") as file:
    illness_precautions = pickle.load(file)

# Define the input data model
class InputData(BaseModel):
    features: List[bool]

@app.post("/predict")
def predict(data: InputData):
    if (len(data.features) != 131):
        raise HTTPException(status_code=422, detail="Input data needs to be a list of 131 boolean values")

    try:
        # Extract features from the input data
        features = np.array([data.features])

        # Make predictions using the loaded model
        prediction = model.predict(features)

        return {"prediction": convert_id_to_illness[prediction[0]]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    
@app.get("/get_symptoms")
def get_symptoms():
    return symptoms

@app.post("/get_illness_description")
def get_illness_description(illness: str):
    if (illness not in illness_descriptions.keys()):
        raise HTTPException(status_code=404, detail="Illness is not contained in this database")
    return illness_descriptions[illness]

@app.post("/get_precautions")
def get_precautions(illness: str):
    if (illness not in illness_precautions.keys()):
        raise HTTPException(status_code=404, detail="Illness is not contained in this database")
    return list(illness_precautions[illness])