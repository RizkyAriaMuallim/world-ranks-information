"use client"
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchInput.module.css'

export default function SearchInput({ placeholder, keyWord, change }) {
    return (
        <div className={styles.wrapper}>
            <SearchIcon color='inherit'/>
            <input className={styles.input} value={keyWord} placeholder={placeholder} onChange={change}/>
        </div>
    )
}