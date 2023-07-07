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
        const getCountryCCA = async (cca) => {
          const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca}`);
          const countries = await res.json();

          const { flags } = countries[0];
          const { svg } = flags;

          setBordersNeighbour( bordersNeighbour => [...bordersNeighbour, svg] )
        };

        const getCountryByName = async () => {
          const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
          const countries = await res.json();
        
          setCountriesByID(countries);

          const { borders } = countries[0];

          if (borders !== undefined) {
            borders.map(async (border) => {
              getCountryCCA(border)
            });
          }
        };
        
        getCountryByName();
      }, [id])

    if (CountriesByID) {
      const { name, flags, region, population, area, capital, languages, currencies, borders, gini } = CountriesByID[0];
      const { nativeName, common } = name;

      var dataGini;
      if (gini !== undefined) {
        dataGini = Object.keys(gini).map((key) => gini[key]).map((data) => data);
      }
      var fullCurrencies;
      if (currencies !== undefined) {
        fullCurrencies = Object.keys(currencies).map((key) => currencies[key].name).join(", ");
      }
      var fullLanguage;
      if (languages !== undefined) {
        fullLanguage = Object.keys(languages).map((key) => languages[key]).join(", ");
      }
      var fullNativeNames;
      if (nativeName !== undefined) {
        fullNativeNames = Object.keys(nativeName).map((key) => nativeName[key].common).join(", ");
      }

      return <Layout title={name.common}>
        <div className={styles.container}>
          <div className={styles.container_left}>
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
                  <div className={styles.overview_value}>
                  {area !== -1 && area || 0}
                  </div>
                  <div className={styles.overview_label}>Area</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container_right}>
            <div className={styles.details_panel}>
              <h4 className={styles.details_panel_heading}>Details</h4>

              {capital !== undefined && 
                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Capital</div>
                  <div className={styles.details_panel_value}>{capital}</div>
                </div>
              }

              {fullLanguage !== undefined && 
                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Language</div>
                  <div className={styles.details_panel_value}>{fullLanguage}</div>
                </div>
              }

              {fullCurrencies !== undefined &&
                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Currencies</div>
                  <div className={styles.details_panel_value}>{fullCurrencies}</div>
                </div>
              }

              {nativeName !== undefined && 
                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Native name</div>
                  <div className={styles.details_panel_value}>{fullNativeNames}</div>
                </div>
              }

              {gini !== undefined && 
                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Gini</div>
                  <div className={styles.details_panel_value}>{dataGini} %</div>
                </div>
              }

              <div>
                {borders !== undefined &&
                <div className={styles.details_panel_borders}>
                  <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>

                  <div className={styles.details_panel_borders_container}>
                    {bordersNeighbour.map((data, index) => (
                        <div className={styles.details_panel_borders_country} key={index}>
                          <div className={styles.details_panel_borders_image} >
                            <Image 
                              src={data}
                              alt={borders[index]}
                              fill={true}
                              sizes="100vh"
                              style={{
                                objectFit: 'contain'
                              }}
                            />
                          </div>

                          <div className={styles.details_panel_borders_name}>{borders[index]}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              }
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