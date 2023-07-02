"use client"

import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import styles from './CountriesTable.module.css';
import { useState } from 'react';
import Link from 'next/link';

const orderBy = ( countries, value, direction ) => {
    if (direction === 'asc') {
        return countries.sort((a, b) => (a[value] > b[value] ? 1 : -1));
    }

    if (direction === 'desc') {
        return countries.sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }
    return countries;
}

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }
    if (direction === 'desc') {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color='inherit'/>
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color='inherit'/>
            </div>
        );
    }
}

export default function CountriesTable({ countries }) {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {
        if(!direction) {
            setDirection("desc");
        } else if (direction === 'desc') {
            setDirection('asc')
        } else {
            setDirection(null)
        }
    }

    const setValueAndSetDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    return (
        <div>
            <div className={styles.heading}>
                <button className={styles.heading_name}
                onClick={() => setValueAndSetDirection("name")}>
                    <div>Name</div>

                    <SortArrow />
                </button>

                <button className={styles.heading_population} 
                onClick={() => setValueAndSetDirection("population")}>
                    <div>Population</div>

                    <SortArrow direction={direction}/>
                </button>
            </div>
    
            {orderedCountries.map((country, index) => (
                <Link href={`/countries/${country.name.common}`} key={index}>
                    <div className={styles.row} key={index}>
                        <div className={styles.name}>{country.name.common}</div>

                        <div className={styles.population}>{country.population}</div>
                    </div>
                </Link>
                )
            )
            }
        </div>
    )
}