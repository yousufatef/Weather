import { useState, useEffect, ChangeEvent } from 'react'
import { forecastType, optionType } from '../../types'

const BASE_URL = 'http://api.openweathermap.org'

const useForecast = () => {
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)

const getSearchOptions = async (term: string) => {
  fetch(
    `${BASE_URL}/geo/1.0/direct?q=${term.trim()}&limit=5&lang=en&appid=${
      process.env.REACT_APP_API_KEY
    }`
  )
    .then((res) => res.json())
    .then((data) => setOptions(data))
    .catch((e) => console.log({ e }))
}
const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(e.target.value)

    if (value !== '') {
      getSearchOptions(value)
    }
}
const getForecast = (data: optionType) => {
  fetch(
    `${BASE_URL}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 16),
      }

      setForecast(forecastData)
    })
    .catch((e) => console.log({ e }))
}
const onSubmit = () => {
    if (!city) return
    getForecast(city)
}
const onOptionSelect = (option: optionType) => {
   setCity(option)
 }

useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
}, [city])

return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
}
}

export default useForecast
