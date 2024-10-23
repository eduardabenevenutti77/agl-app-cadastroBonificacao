// import "./style-gestor.css"
import Cadastrocomissao from "../../components/Cadastro-comissao"
import { AuthContext } from '../../auth/Context';
import { Navigate } from 'react-router-dom'; // Importa o Navigate no lugar de Redirect
import { useContext } from 'react'; // Certifique-se de importar o useContext

export default function Cadastrogestor() {
    const { role } = useContext(AuthContext);

    // Verifica se o usuário tem permissão (admin), se não, redireciona para a página de não autorizado
    if (role !== 'admin') {
        return <Navigate to="/not-authorized" replace />; // Substitui Redirect por Navigate
    }

    return (
        <>
            <Cadastrocomissao />
        </>
    );
}