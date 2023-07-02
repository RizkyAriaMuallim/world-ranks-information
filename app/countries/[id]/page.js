"use client"

import { useEffect, useState } from "react";

const Country = ({ params }) => {
    const { id } = params;
    const [CountriesByID, setCountriesByID] = useState(null);

    useEffect(() => {
        const getCountryByName = async () => {
          const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
          const countries = await res.json();
        
          setCountriesByID(countries);
        };
        getCountryByName();
      }, [id])

    if (CountriesByID) {
        return <div>Country {CountriesByID[0].name.common}</div>
    }else {
        return null;
    }
};

export default Country;