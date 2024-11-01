import { AuthContext } from "../../auth/Context"; 
import { blockUser, findUser, unblock } from "../../api/user";
import React, { useEffect, useState, useContext } from "react";
import "./style-bloquear.css";
import { toast } from "react-toastify";

export default function Bloquear () {
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext);

    const handleSubmit = async (id) => {
        try {
            const response = await blockUser(id);
            if (response.message) {
                console.log('Usuário Bloqueado!');
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === id ? { ...user, bloqueado: true } : user
                    )
                );
            } else {
                toast.error("Erro ao bloquear o usuário. [1]");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Sem permissão.");
            } else {
                toast.error("Erro ao bloquear o usuário. [2]");
            }
            console.log(error)
        }
    };

    const handleSubmitUnblock = async (id) => {
        try {
            const response = await unblock(id);
            if (response.message) {
                console.log('Usuário Desbloqueado!');
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === id ? { ...user, bloqueado: false } : user
                    )
                );
            } else {
                toast.error("Erro ao desbloquear o usuário.");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Sem permissão.");
            } else {
                toast.error("Erro ao desbloquear o usuário.");
            }
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;
            try {
                const data = await findUser();
                console.log(data)
                setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error.response?.data || error.message);
                alert("Não foi possível carregar os usuários.");
            }
        };
        fetchUsers();
    }, [token]);

    return (
        <>
            <div id="containerBloquear">
                <p id="titleBloquear">Gestão de Usuários</p>
                <div>
                    <p id="subtitle">Essa tela é responsável pela visualização dos usuários cadastrados no banco de dados da AGL. Nela, é possível bloquear e desbloquear o acesso à aplicação.</p>
                </div>
                <ul id="userList">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li 
                                key={user.id} 
                                className={`user-item ${user.bloqueado ? 'blocked' : ''}`}
                            >
                            <div id="span">
                                <span className="user-email">{user.email}</span>
                                <span className="user-name">{user.permissao}</span>
                            </div>
                                <div id="bloquearDisplay">
                                    <button className="bloquear" onClick={() => handleSubmit(user.id)}>Bloquear Usuário</button>
                                    <button className="Desbloquear" onClick={() => handleSubmitUnblock(user.id)}>Desbloquear Usuário</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="no-users">Nenhum usuário encontrado.</li>
                    )}
                </ul>
            </div>
        </>
    );
}