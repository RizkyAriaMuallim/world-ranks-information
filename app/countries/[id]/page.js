"use client"

import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";

import styles from './countries.module.css'
import Image from "next/image";

const Country = ({ params }) => {
    const { id } = params;
    const [CountriesByID, setCountriesByID] = useState(null);
    const [bordersNeighbour, setBordersNeighbour] = useState([])

    useEffect(() => {
        const getCountryByName = async () => {
          const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
          const countries = await res.json();
        
          setCountriesByID(countries);
        };
        getCountryByName();
        
        const { borders } = countries[0];
        setBordersNeighbour(
          // next works in here!!!
        )
      }, [id])

    if (CountriesByID) {
      //  destruct the object in here
      const { name, flags, region, population, area, capital, languages, currencies } = CountriesByID[0];
      const { nativeName, common } = name;

      const fullLanguage = Object.keys(languages).map((key) => languages[key]).join(", ")
      const fullCurrencies = Object.keys(currencies).map((key) => currencies[key].name).join(", ")
      const fullNativeNames = Object.keys(nativeName).map((key) => nativeName[key].common).join(", ")

      // console.log(fullNativeNames)

      return <Layout title={name.common}>
        <div>
          <div className={styles.overview_panel}>
            <div className={styles.overview_image}>
              <Image 
                src={flags.svg}
                alt={common}
                fill={true}
                priority={true}
              />
            </div>

            <h1 className={styles.overview_name}>{common}</h1>
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

          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>{capital}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Language</div>
              <div className={styles.details_panel_value}>{fullLanguage}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>{fullCurrencies}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>{fullNativeNames}</div>
            </div>
          </div>
        </div>
      </Layout>
    }else {
        return null;
    }
};

export default Country;