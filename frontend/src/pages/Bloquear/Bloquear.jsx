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
    const [isOpen, setIsOpen] = useState(false);

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
                toast.success('Usuário foi bloqueado com sucesso!');
            } else {
                toast.error("Erro ao bloquear o usuário.");
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
                toast.success('Usuário desbloqueado com sucesso!');
            } else {
                toast.error("Erro ao desbloquear o usuário.");
            }
        } catch (error) {
            toast.error("Erro ao desbloquear o usuário.");
        }
    };

    const handleUpdateClick = (id) => {
        setCurrentUserId(id);
        setShowForm(true);
        setIsOpen(true);
    };

    const formatCurrency = (value) => {
        const numericValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numericValue);
    };

    const handleFormatacaoFixa = (e) => {
        const valor = e.target.value.replace(/[^0-9]/g, '');
        setRemuneracaoFixa(formatCurrency(valor));
    };

    const handleUpdate = async () => {
        try {
            const cleanedRemuneracaoFixa = remuneracaoFixa
                .replace('R$', '')     
                .replace(/\./g, '')    
                .replace(',', '.');    
    
            const value = parseFloat(cleanedRemuneracaoFixa);
    
            // if (isNaN(value)) {
            //     toast.error('O valor da remuneração fixa é inválido!');
            //     return;
            // }
    
            const response = await cadastroFixa({ remuneracaoFixa: value, userId: currentUser.id });
            
            if (response.message) {
                toast.success('Cadastro de remuneração fixa realizado com sucesso!');
                setShowForm(false);
                setIsOpen(false); 
                setRemuneracaoFixa('');  
            }
        } catch (error) {
            toast.error("Erro ao atualizar a remuneração.");
        }
    };
    
    const closeRemuneracao = () => {
        setIsOpen(false);
        setShowForm(false); 
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;
            try {
                const data = await findUser();
                const filteredUsers = data.filter(user => user.id !== userId);
                const roleUser = filteredUsers.filter(user => user.permissao === 'user');
                
                // Formatar usuários
                const formattedUsers = roleUser.map(user => ({
                    ...user,
                    remuneracaoFixa: user.remuneracaoFixa ? formatCurrency(user.remuneracaoFixa.toString()) : 'Não Definido'
                }));

                setUsers(formattedUsers);
                console.log(formattedUsers); // Verificar os dados que chegaram
            } catch (error) {
                alert("Não foi possível carregar os usuários.");
            }
        };
        fetchUsers();
    }, [token, userId]);

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
                        <li key={user.id} className={`user-item ${user.bloqueado ? 'blocked' : ''}`}>
                            <div id="span">
                                <span className="user-email">{user.email} | </span>
                                <span className="user-remuneracao">{user.remuneracaoFixa}</span>
                            </div>
                            <div id="bloquearDisplay">
                                <button className="Desbloquear" onClick={() => handleSubmitUnblock(user.id)}>
                                    <img src={unblockIcon} alt="Desbloquear" />
                                </button>
                                <button className="bloquear" onClick={() => handleSubmit(user.id)}>
                                    <img src={blockIcon} alt="Bloquear" />
                                </button>
                                <button className="remuneracao" onClick={() => handleUpdateClick(user.id)}>
                                    <img src={dolarIcon} alt="Atualizar Remuneração" />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="no-users">Nenhum usuário encontrado.</li>
                )}
            </ul>

            {showForm && currentUser && isOpen && (
                <div id="updateForm" onClick={handleUpdate}>
                    <form>
                        <button id="closeRemuneracao" onClick={closeRemuneracao}>x</button>
                        <p id="titleUpdate">Remuneração: {currentUser.email}</p>
                        <input
                            id="remuneracao"
                            value={remuneracaoFixa}
                            onChange={handleFormatacaoFixa}
                            placeholder="Informe o valor a ser cadastrado"
                        />
                        <div id="displayButton">
                            <button id="save">Salvar</button>
                            <button id="delete" onClick={closeRemuneracao}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}