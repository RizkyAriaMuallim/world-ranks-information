"use client"
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchInput.module.css'

export default function SearchInput({ ...rest }) {
    return (
        <div className={styles.wrapper}>
            <SearchIcon />
            <input className={styles.input} {...rest}/>
        </div>
    )
}