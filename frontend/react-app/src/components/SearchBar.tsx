import 'bootstrap/dist/css/bootstrap.min.css'
import {HStack, Input, TagCloseButton, Tag, TagLabel,} from "@chakra-ui/react";
import React, { useState } from 'react';

function SearchBar() {
    const url = "https://localhost:8000"
    const url_prediction = url + "/"
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

    // const [prediction, setPrediction] = useState(null)
    // const makePrediction = (event: MouseEvent) => {
    //     const response = await fetch(url_prediction, {
    //         method: 'post',
    //         body: {
    //
    //         }
    //     })
    // }

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
                <button className="btn btn-primary" style={button} onClick={}>Search</button>
            </div>
        </>
    )
}

export default SearchBar;