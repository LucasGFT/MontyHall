import { Inter } from 'next/font/google'
import Porta from '../../components/Porta'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Porta />
    </div>
  )
}
