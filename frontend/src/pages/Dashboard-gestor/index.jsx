import "./style-dash-gestor.css"
import download from '../../assets/svg/cloud.svg'

export default function DashboardGestor() {
    return (
        <>
            <div id="display">
                <div id="displayButton">
                    <button id="download">Download dos gráficos <img src={download} alt="" /></button>
                </div>
            </div>
        </>
    )
}