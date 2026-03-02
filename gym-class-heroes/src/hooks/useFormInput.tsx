import { useState } from 'react'

type Validator = (value: string) => string | null;

export function useFormInput(initialValue: string, validator?: Validator) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState("");
    
    function set(newValue: string){
        setValue(newValue);
        setError("");
    }

    function reset() {
        setValue(initialValue);
        setError("");
    }

    function validate() {
        if (!validator) return true;

        const result = validator(value)

        if(result) {
            setError(result);
            return false;
        }

        return true;
    }

    return {
        value,
        error,
        setValue: set,
        reset,
        validate,
    };
}