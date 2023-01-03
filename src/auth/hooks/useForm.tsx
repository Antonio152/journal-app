import { ChangeEvent, useState,useEffect, useMemo } from 'react'
/*
  issue: The code show an error on object
  info: 
    https://github.com/microsoft/TypeScript/issues/35859
    https://scottw.com/articles/typescript-index-signature/

*/
export const useForm = (initialForm:{[key:string]: any} = {}, formValidations:{[key:string]: any} = {}): any => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidation,setFormValidation] = useState<{[key:string]: any}>({})

  useEffect(() => {
    createValidators()
  }, [formState])

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])
  
  const isFormValid = useMemo(()=>{
    for (const formValue of Object.keys(formValidation)){
      if(formValidation[formValue] !== null) return false;
    }
    return true
  },[formValidation])

  const onChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [target.name]: target.value })
  }
  const resetForm = () => {
    setFormState(initialForm)
  }

  const createValidators = () =>{
    const formCheckedValues:{[key:string]: any} = {};
    //const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];
    for(const formField of Object.keys(formValidations)){
      const [fn, errorMessage] = formValidations[formField]
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }
    setFormValidation(formCheckedValues)
  }
  return {
    ...formState,
    ...formValidation,
    isFormValid,
    resetForm,
    formState,
    onChangeEvent
  }
}
