import { AuthContext } from "../../auth/Context";
import { blockUser, findUser, unblock } from "../../api/user";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import blockIcon from "../../assets/svg/block.svg";
import unblockIcon from "../../assets/svg/unblock.svg";
import dolarIcon from "../../assets/svg/dollar.svg";
import { cadastroFixa } from "../../api/regra";
import "./style-bloquear.css";

export default function Bloquear() {
    const [users, setUsers] = useState([]);
    const { token, userId } = useContext(AuthContext); 
    const [remuneracaoFixa, setRemuneracaoFixa] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

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
            toast.error("Erro ao bloquear o usuário.");
            console.error(error);
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
            toast.error("Erro ao desbloquear o usuário.");
        }
    };

    const handleUpdateClick = (id) => {
        setCurrentUserId(id);
        setShowForm(true); // Exibe o formulário ao clicar no botão
    };

    const handleUpdate = async () => {
        try {
            const response = await cadastroFixa(currentUserId, remuneracaoFixa);
            if (response.message) {
                console.log('Cadastro de remuneração realizado com sucesso');
                toast.success('Cadastro de remuneração fixa realizado com sucesso!');
                setShowForm(false); // Esconde o formulário após o envio
                setRemuneracaoFixa('');
            } else {
                toast.warning('O cadastro não foi concluído com sucesso.');
            }
        } catch (error) {
            toast.error("Erro ao atualizar a remuneração.");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;
            try {
                const data = await findUser();
                const filteredUsers = data.filter(user => user.id !== userId);
                const roleUser = filteredUsers.filter(user => user.permissao === 'user');
                setUsers(roleUser);
            } catch (error) {
                alert("Não foi possível carregar os usuários.");
            }
        };
        fetchUsers();
    }, [token, userId]);

    // Encontra o usuário atual a ser editado
    const currentUser = users.find(user => user.id === currentUserId);

    return (
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
                                <button className="Desbloquear" onClick={() => handleSubmitUnblock(user.id)}><img src={unblockIcon} alt="Desbloquear" /></button>
                                <button className="bloquear" onClick={() => handleSubmit(user.id)}><img src={blockIcon} alt="Bloquear" /></button>
                                <button className="remuneracao" onClick={() => handleUpdateClick(user.id)}><img src={dolarIcon} alt="Atualizar Remuneração" /></button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="no-users">Nenhum usuário encontrado.</li>
                )}
            </ul>

            {/* Exibe o formulário para atualizar a remuneração fixa */}
            {showForm && currentUser && (
                <div id="updateForm">
                    <p id="titleUpdate">Remuneração - {currentUser.email}</p>
                    <input
                        // type="number"
                        id="remuneracao"
                        value={remuneracaoFixa}
                        onChange={(e) => setRemuneracaoFixa(e.target.value)}
                        placeholder="Informe o valor a ser cadastrado"
                    />
                    <button id="save" onClick={handleUpdate}>Salvar</button>
                    <button id="delete" onClick={() => setShowForm(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
}