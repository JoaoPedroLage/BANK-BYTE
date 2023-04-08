import styles from '../styles/page.module.css';
import Header from '../components/Header';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Header />
      </div>
    </main>
  )
}