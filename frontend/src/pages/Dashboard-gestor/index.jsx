import "./style-dash-gestor.css"
// import charts from "../../assets/js/charts-exmaple"

export default function DashboardGestor() {
    return (
        <>
        <body className="body-dash">
            {/* <div id="display-download">
                <button id="button-download"></button>
            </div> 
            
            
            entendendo como funciona a biblioteca do charts
            
            */}
            <div>
                <canvas id="myChart"></canvas>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src={charts}></script>
        </>
    )
}