// import Image from 'next/image'
import SearchInput from '@/components/SearchInput/SearchInput';
import styles from './page.module.css'
// import Link from 'next/link'
import Layout from '@/components/Layout/Layout'

export default async function Home() {
  const Countries = await getData();
  return (
    <Layout>
      <div className={styles.counts}>Found {Countries.length} countries</div>

      <SearchInput />
    </Layout>
  )
}

export const getData = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return countries;
};