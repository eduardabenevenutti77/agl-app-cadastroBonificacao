import { AuthContext } from "../../auth/Context"; // ajuste o caminho conforme o seu projeto
import { blockUser, findUsers, unblock } from "../../api/user";
import React, { useEffect, useState, useContext } from "react";
import "./style-bloquear.css";
// import usersIcon from "../../assets/svg/users.svg";
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
                toast.error("Erro ao bloquear o usuário.");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Sem permissão.");
            } else {
                toast.error("Erro ao bloquear o usuário.");
            }
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

    // const handleEditClick = (user) => {
    //     setEditingUser(user);
    //     setUpdatedData({ nome: user.nome, email: user.email }); 
    // };

    // const handleUpdateSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await updateUser(editingUser.id, updatedData);
    //         console.log(response)
    //         toast.success("Usuário atualizado com sucesso.");
    //     } catch (error) {
    //         if (error.response && error.response.status === 403) {
    //             toast.error("Sem permissão.");
    //         } else {
    //             toast.error("Erro ao atualizar o usuário. [2]");
    //         }
    //     }
    // };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;

            try {
                const data = await findUsers();
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
                    <p id="subtitle">Essa tela é responsável pela visualização dos usuários cadastrados no banco de dados da AGL. Nela, é possível realizar alterações e bloquear o acesso à aplicação.</p>
                </div>
                <ul id="userList">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li 
                                key={user.id} 
                                className={`user-item ${user.bloqueado ? 'blocked' : ''}`}
                            >
                                <span className="user-name">{user.nome}</span>
                                <span className="user-email">{user.email}</span>
                                <div id="bloquear">
                                    <button className="bloquear" onClick={() => handleSubmit(user.id)}>Bloquear Usuário</button>
                                    <button className="bloquear" onClick={() => handleSubmitUnblock(user.id)}>Desbloquear Usuário</button>
                                    {/* <button className="bloquear" onClick={() => handleEditClick(user)}>Editar</button> */}
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