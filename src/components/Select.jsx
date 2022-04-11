import React from "react";
import Select from 'react-select'

const SelectCurrency = ({setSelectValue}) => {
    
   

    const options = []
    for (const key in namesCurrency) {
        options.push({value: key, label: `${key} - ${namesCurrency[key]}`})
    }
    
    return (
        <Select 
         onChange ={(current) => {
             setSelectValue(current.value)
             console.log(current.value)
         }} 
         options={options} 
         /*defaultValue={options[143]}*/
         theme={(theme) => (styleSelect)}
        />
    )
}

export default SelectCurrency