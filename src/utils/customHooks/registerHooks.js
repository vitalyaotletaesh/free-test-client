import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(true)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    const [passwordRepeatError, setPasswordRepeatError] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break
                case 'isEquals':
                    value === validations[validation] ? setPasswordRepeatError(false) : setPasswordRepeatError(true)
                    break
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || emailError || minLengthError || maxLengthError || passwordRepeatError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, emailError, minLengthError, maxLengthError, passwordRepeatError])

    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
        maxLengthError,
        passwordRepeatError,
    }
}

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const onCloseModal = (value) => {
        setValue(value)
        setDirty(false)
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onBlur = (e) => {
        setDirty(true)
    }
    return {
        value,
        onBlur,
        onChange,
        onCloseModal,
        isDirty,
        ...valid
    }
}