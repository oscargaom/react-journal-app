import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [formValues, setFormValues] = useState(initialState);

    const reset = (resetState = initialState) => {
      setFormValues(resetState);
    };  

    /* Esta función esta ligada a un handleSubmit (e).
      {target} = e
    */
    const formHandleInputChange = ({ target }) => {
        setFormValues({
          ...formValues,
          [target.name]: target.value
        });
      }
      
    return [formValues, formHandleInputChange, reset];

}