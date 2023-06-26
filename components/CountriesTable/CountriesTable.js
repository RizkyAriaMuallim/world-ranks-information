import styles from './CountriesTable.module.css';

export default function CountriesTable({ countries }) {
    return (
        <div>
            <div className={styles.heading}>
                <button className={styles.heading_name}>
                    <div>Name</div>
                </button>

                <button className={styles.heading_population}>
                    <div>Population</div>
                </button>
            </div>
    
            {countries.map((country, index) => (
                <div className={styles.row} key={index}>
                    <div className={styles.name}>{country.name.common}</div>

                    <div className={styles.population}>{country.population}</div>
                </div>)
            )}
        </div>
    )
}