import { useEffect, useState } from 'react'
import WeatherForm from './weatherForm'
import WeatherMainInfo from './weatherMainInfo'
import styles from './weatherApp.module.css'
import Loading from './loading'


// Normalmente estos datos irian en un archivo .env pero para que puedas probar la app te dejo la app key con validez hasta el 14/09/22
// Normally this data would go in an .env file but so you can test the app I leave you the app key valid until 09/14/22
//const{REACT_APP_KEY, REACT_APP_URL} = process.env


const REACT_APP_URL = `http://api.weatherapi.com/v1/current.json?aqi=no`
const REACT_APP_KEY = '48015561a92f499fb11164827220308'

// ------------------------------------------------------------------------------------------------------------------------------------------//

export default function WeatherApp() {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        loadInfo()
    }, [])

    useEffect(() => {
        document.title = `Weather form ${weather?.location.name ?? ""}`
    }, [weather])

    async function loadInfo(city = 'london') {
        try {
            const request = await fetch(
                `${REACT_APP_URL}&key=${REACT_APP_KEY}&q=${city}`
            )
            const json = await request.json()
            console.log(json)

            setTimeout(() => {
                setWeather(json)
            }, 2000)


        } catch (error) { }
    }

    function handleChangeCity(city) {
        setWeather(null);
        loadInfo(city)
    }

    return (
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleChangeCity} />
            {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
        </div>
    )
}