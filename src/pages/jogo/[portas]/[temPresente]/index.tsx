import { useEffect, useState } from "react"
import { atualizarPortas, criarPortas } from "../../../../../functions/portas"
import Porta from "../../../../../components/Porta"
import styles from '../../../../styles/Jogo.module.css'
import Link from "next/link"
import { useRouter } from "next/router"
import PortaModel from "../../../../../model/porta"

export default function Jogo() {
    const router = useRouter()
    const [portas, setPortas] = useState<PortaModel[]>([])
    const [valido, setValido] = useState(false)

    useEffect(() => {
        if (router.query.portas && router.query.temPresente) {
            const qtdPortas = +router.query.portas
            const temPresente = +router.query.temPresente
            setPortas(criarPortas(qtdPortas, temPresente))
        }
    }, [router?.query])

    useEffect(() => {
        if (router.query.portas && router.query.temPresente) {
            const qtdPortas = +router.query.portas
            const temPresente = +router.query.temPresente
            const qtdePortasValidas = qtdPortas >= 3 && qtdPortas <= 100
            const temPresenteValido = temPresente >= 1 && temPresente <= qtdPortas
            setValido(qtdePortasValidas && temPresenteValido)
        }

    }, [portas, router?.query])


    function renderizarPortas() {
        return portas.map(porta => {
            return <Porta key={porta.numero} porta={porta}
                onChange={novaPorta => setPortas(atualizarPortas(portas, novaPorta))} />
        })
    }

    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
                {valido ? renderizarPortas() : <h2>Valores inválidos</h2>}
            </div>
            <div className={styles.botoes}>
                <Link href="/">
                    <button>Reiniciar Jogo</button>
                </Link>
            </div>
            {/*  on change é um parametro que recebe uma função */}
        </div>
    )
}