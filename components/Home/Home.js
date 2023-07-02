"use client"
import SearchInput from '../SearchInput/SearchInput';
import styles from './Home.module.css'
import CountriesTable from '../CountriesTable/CountriesTable';
import Layout from '../Layout/Layout';
import { useState } from 'react';

export default function HomeComponents({ Countries }) {
  const [keyword, setKeyword] = useState("");

  const getfilterCountries = (Countries, keyword) => {
    const filterCountries = Countries.filter(
      (country) =>
        (country.name.common)?.toLowerCase().includes(keyword) ||
        (country.region)?.toLowerCase().includes(keyword) ||
        (country.subregion)?.toLowerCase().includes(keyword)
    );
    return filterCountries;
  }

  const onInputChange = (e) => {
    setKeyword((e.target.value).toLowerCase());
  }
  
  if (Countries) {
    return (
      <Layout>
        <div className={styles.counts}>Found {Countries.length} countries</div>
        <SearchInput placeholder="Filter by Name, Region or SubRegion" keyWord={keyword} change={onInputChange}/>

        <CountriesTable countries={getfilterCountries(Countries, keyword)}/>
      </Layout>
    )
  }else {
    return null;
  }
}