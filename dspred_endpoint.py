# RUN "uvicorn dspred_endpoint:app --reload"
# and "npm run dev" in \frontend\react-app

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import os
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
with open(os.path.join("models", "convert_symptom_to_id.pkl"), "rb") as file:
    convert_symptom_to_id = pickle.load(file)

# Load illness precautions
with open(os.path.join("models", "illness_precautions.pkl"), "rb") as file:
    illness_precautions = pickle.load(file)

# Define the input data model
class InputData(BaseModel):
    id: int
    value: str

class InputData2(BaseModel):
    chosen_options: List[InputData]


@app.post("/predict")
def predict(chosen_options: InputData2):
    # print(chosen_options.chosen_options)
    selected_options = [item.value for item in chosen_options.chosen_options]
    # print(selected_options, type(selected_options))
    try:
        features = [0] * 131
        for option in selected_options:
            features[convert_symptom_to_id[option]] = 1

        # Make predictions using the loaded model
        prediction = convert_id_to_illness[model.predict([features])[0]]

        return {"prediction": f"{prediction}\n{get_illness_description(prediction)}\n{get_precautions(prediction)}"}
        # return f"{prediction}\n{get_illness_description(prediction)}\n{get_precautions(prediction)}"

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