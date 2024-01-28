import 'bootstrap/dist/css/bootstrap.min.css'
import {HStack, Input, TagCloseButton, Tag, TagLabel,Button, Text} from "@chakra-ui/react";
import React, { useState } from 'react';

const SearchBar = () => {
    const url = "https://localhost:8000"
    const url_prediction = url + "/predict"
    // Styling
    const button = {
        width: '100%',
        height: '5vh',
        backgroundColor: '#773344',
    }

    const inputBox = {
        marginBottom: '2vh'
    }

    const tagFormat = {
        marginBottom: '2vh',
    }

    const singleTag = {
        borderColor: '#773344',
        borderWidth: '3px',
        borderStyle: 'ridge',
        backgroundColor: '#d9d9d9',
        color: '#000000'
    }

    // State Boxes
    //const [inputValue, setInputValue] = useState('')
    type simpleSymptom = {
        id: number;
        value: string;
    }
    const [symptoms, setSymptoms] = useState<simpleSymptom[]> ([])

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()

            // Add to list
            setSymptoms([...symptoms, {
                id: symptoms.length,
                value: event.currentTarget.value
            }])

            event.currentTarget.value = ''
        }
    }

    const deleteTag = (tag: number) => {
        const update = symptoms.filter(
            symptom => symptom.id != tag
        );
        setSymptoms(update)
    }

    // Set response data
    const [responseData, setResponseData] = useState<string|null>(null)
    const makePrediction = () => {
        fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chosen_options: symptoms }),
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Response from FastAPI:', data);
            setResponseData(data.prediction); // Update state with the response
        })
        .catch(error => console.error('Error sending request to FastAPI:', error));
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="Input1" className="form-label">Search</label>
                <Input placeholder="Add symptoms..." size="md" style={inputBox} variant="filled" onKeyDown={handleEnter}/>
                <HStack spacing={4}  style={tagFormat}>
                    {
                        symptoms.map(symptom => (
                            <Tag size="lg" key={symptom.id} borderRadius="full" variant="solid" style={singleTag}>
                                <TagLabel>
                                    {symptom.value}
                                </TagLabel>
                            <TagCloseButton onClick={() => deleteTag(symptom.id)}/>
                            </Tag>))
                    }
                </HStack>
                <Button onClick={makePrediction}>Diagnose Illness</Button>
                {responseData && <Text>{responseData}</Text>}
            </div>
        </>
    )
}

export default SearchBar;