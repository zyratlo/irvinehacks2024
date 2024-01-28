import { useState, useEffect } from 'react';
import { Checkbox, VStack, Button, Text, Wrap, WrapItem } from '@chakra-ui/react';

const CheckboxComponent = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    // Fetch the list from FastAPI
    fetch('http://localhost:8000/get_symptoms')
      .then(response => response.json())
      .then(data => {
        setOptions(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching options:', error));
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleCheckboxChange = (option: never) => {
    // Toggle the selected state of the checkbox
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSendRequest = () => {
    // Make a request to the FastAPI endpoint with selectedOptions
    fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selected_options: selectedOptions }),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Response from FastAPI:', data);
        setResponseMessage(data.prediction); // Update state with the response
      })
      .catch(error => console.error('Error sending request to FastAPI:', error));
  };

  return (
    <VStack spacing={4} align="start">
      <Wrap spacing={4}>
        {options.map((option, index) => (
          <WrapItem key={index}>
            <Checkbox
              isChecked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            >
              {option}
            </Checkbox>
          </WrapItem>
        ))}
      </Wrap>
      <Button onClick={handleSendRequest}>Diagnose Illness</Button>
      {responseMessage && <Text>{responseMessage}</Text>}
    </VStack>
  );
};

export default CheckboxComponent;