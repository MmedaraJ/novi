import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SP } from './CurrencyConverterStyles';

function CurrencyConverter({ fromCurrency, toCurrency, value }) {
    const [convertedValue, setConvertedValue] = useState(null);
    const locale = navigator.language;

    let myHeaders = new Headers();
    myHeaders.append("apikey", process.env.API_LAYER_API_KEY);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    useEffect(() => {
        axios.get(
            `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${value}`,
            requestOptions,
            { withCredentials: true },
        ).then(res => {
            setConvertedValue(res.data.result);
        }).catch(err => {
            console.log(err);
        });
    }, [fromCurrency, toCurrency]);

    return (
        <SP>
            {
                convertedValue && convertedValue.toLocaleString(locale, { style: 'currency', currency: toCurrency })
            }
        </SP>
    );
}

export default CurrencyConverter;
