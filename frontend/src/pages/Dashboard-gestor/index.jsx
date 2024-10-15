import "./style-dash-gestor.css"

export default function DashboardGestor() {
    return (
        <>
        <body className="body-dash">
            <div>
                <canvas id="myChart"></canvas>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src={charts}></script>
        </>
    )
}