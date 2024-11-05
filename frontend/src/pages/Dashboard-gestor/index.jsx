import "./style-dash-gestor.css"
import download from '../../assets/svg/cloud.svg'
import refesh from '../../assets/svg/refresh.svg'
import { toast } from 'react-toastify'
import { findVendasAnual } from "../../api/regra"
import { useEffect, useState } from "react"
// import ChartsAnual from "../../components/ChartsAnual/charts"

export default function DashboardGestor() {
    const [vendasAnual, setVendasAnual] = useState('');

    useEffect(() => {
        const fetchVendasAnual = async () => {
            const data = await findVendasAnual();
            console.log('Dados recebidos: ', data)
            setVendasAnual(data)
        }
        fetchVendasAnual();
    }, []);

    const jump = (event) => {
        event.stopPropagation();
        const card = event.currentTarget.closest('#backgroundNumerico1');
        if (card) {
            card.classList.add('jump');
            setTimeout(() => {
                card.classList.remove('jump');
            }, 500); 
        }
    }
    return (
        <>
            <div id="display">
                <div id="displayButton">
                    <button id="download">Download dos gráficos <img src={download} alt="" /></button>
                </div>
            </div>
            <div id="displayGraficoNumerico">
                <div id="backgroundNumerico1">
                    <img src={refesh} alt="" onClick={jump}/>
                    <p className="titleGrafico">Valor total de vendas - anual</p>
                    <p className="campoGrafico">{vendasAnual ? vendasAnual: 'Carregando...'}</p>
                </div>
                <div id="backgroundNumerico2">
                    <img src={refesh} alt=""/>
                    <p className="titleGrafico">Valor total de vendas - mensal</p>
                    <p className="campoGrafico">1554</p>
                </div>
                <div id="backgroundNumerico3">
                    <img src={refesh} alt=""/>
                    <p className="titleGrafico">Quantidades de produtos vendidos</p>
                    <p className="campoGrafico">1554</p>
                </div>
            </div>
            {/* <ChartsAnual /> */}
        </>
    )
}