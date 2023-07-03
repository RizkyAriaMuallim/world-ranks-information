"use client"

import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";

import styles from './countries.module.css'
import Image from "next/image";

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
      //  destruct the object in here
      const { name, flags, region, population, area } = CountriesByID[0];

      return <Layout title={CountriesByID[0].name.common}>
        <div>
          <div className={styles.overview_panel}>
            <div className={styles.overview_image}>
              <Image 
                src={flags.svg}
                alt={name.common}
                fill={true}
                priority={true}
              />
            </div>

            <h1 className={styles.overview_name}>{name.common}</h1>
            <div className={styles.overview_region}>{region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>{population}</div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    }else {
        return null;
    }
};

export default Country;