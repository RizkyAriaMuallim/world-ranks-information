"use client"

import HomeComponents from "@/components/Home/Home";
import { useEffect, useState } from 'react';

export default function Home() {
  const [Countries, setCountries] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries = await res.json();
    
      setCountries(countries);
    };
    getData();
  }, [])

  if (Countries) {
    return (
      <HomeComponents Countries={Countries}/>
    )
  }else {
    return null;
  }
}