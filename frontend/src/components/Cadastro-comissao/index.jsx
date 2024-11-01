import './style-gestor.css';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { findTime } from '../../api/regra';

export default function Cadastrocomissao() {
    const [campoFormatacao, setCampoForm] = useState('');
    const handleChange = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor/100);
        setCampoForm(formatado);
    } 

    const [campoVariavel, setCampoVariavel] = useState('');
    const handleChangeVariavel = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor/100);
        setCampoVariavel(formatado);
    } 

    const [campoPorcento, setCampoPorcento] = useState('');
    const handleChangePorcento = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = valor ? `${valor}%` : '';

        setCampoPorcento(formatado);
    } 

    const [criterioUm, setCriterioUm] = useState('');
    const handleChangeCriterioUm = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor/100);
        setCriterioUm(formatado);
    } 

    const [criterioDois, setCriterioDois] = useState('');
    const handleChangeCriterioDois = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor/100);
        setCriterioDois(formatado);
    } 

    const [multiplicador, setMultiplicador] = useState('');
    const handleChangeMulti = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = valor ? `${valor}%` : '';

        setMultiplicador(formatado);
    }

    const [campos, setCampos] = useState([{ id: 1 }]);
    const add = () => {
        setCampos([...campos, { id: campos.length + 1 }]);
    };
    const remove = () => {
        if (campos.length > 1) {
            setCampos(campos.slice(0, -1));
        }
    };

    const [time, setTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [loadingTime, setLoadingTime] = useState(true);
    const [errorTime, setErrorTime] = useState(null);

    const [produto, setProduto] = useState([]);
    const [selectedProduto, setSelectedProduto] = useState('');
    const [loadingProduto, setLoadingProduto] = useState(true);
    const [errorProduto, setErrorProduto] = useState(null);

    const [funcionario, setFuncionario] = useState([]);
    const [selectFuncionario, setSelectedFuncionario] = useState('');
    const [loadingFuncionario, setLoadingFuncionario] = useState(true);
    const [errorFuncionario, setErrorFuncionario] = useState(null);

    const [funil, setFunil] = useState([]);
    const [selectFunil, setSelectedFunil] = useState('');
    const [loadingFunil, setLoadingFunil] = useState(true);
    const [errorFunil, setErrorFunil] = useState(null);

    const [fase, setFase] = useState([]);
    const [selectFase, setSelectedFase] = useState('');
    const [loadingFase, setLoadingFase] = useState(true);
    const [errorFase, setErrorFase] = useState(null);

    const fetchTimes = async () => {
        try {
            const response = await findTime();
            console.log("TIMES -> ", response)
            if (response === null) {
                console.log('O objeto retornado da requisição de times está vazio!')
            }
            setTime(response.result || []);
        } catch (err) {
            setErrorTime(err.message);
        } finally {
            setLoadingTime(false);
        }
    };

    const fetchProduto = async () => {
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.product.list');
            if (!response.ok) {
                throw new Error('Erro ao buscar os produtos');
            }
            const data = await response.json();
            // console.log(data.result);
            setProduto(data.result || []);
        } catch (err) {
            setErrorProduto(err.message);
        } finally {
            setLoadingProduto(false);
        }
    };

    const fetchFuncionario = async () => {
        setLoadingFuncionario(true); 
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/user.get');
            if (!response.ok) {
                throw new Error('Erro ao buscar os funcionários');
            }
            const data = await response.json();
            const funcionariosCompletos = data.result.map(funcionario => ({
                id: funcionario.id,
                fullName: `${funcionario.NAME} ${funcionario.LAST_NAME}` // Juntando o nome completo
            }));
            console.log(funcionariosCompletos.result); 
            setFuncionario(funcionariosCompletos || []);
        } catch (err) {
            setErrorFuncionario(err.message);
        } finally {
            setLoadingFuncionario(false);
        }
    };   

    const fetchFunil = async () => {
        setLoadingFunil(true);
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.category.list?entityTypeId=2');
            if (!response.ok) {
                throw new Error('Erro ao buscar funis');
            }
            const data = await response.json();
            console.log('Funis encontrados -> ',data);
            setFunil(Array.isArray(data.result) ? data.result : []);
        } catch (e) {
            setErrorFunil(e.message);
        } finally {
            setLoadingFunil(false);
        }
    }

    // para o fetch a seguir funcionar, preciso armazenar o id do funil selecionado e após disso passar no fetch daqui
    const fetchFase = async () => {
        setLoadingFase(true);
        try {
            const response = await fetch(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.dealcategory.stage.list?id=${idFunil}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar fases');
            }
            const data = await response.json();
            console.log('Fases encontradas -> ', data);
            setFase(Array.isArray(data.result) ? data.result : []);
        } catch (e) {
            setErrorFase(e.message);
        } finally {
            selectFase(false);
        }
    }

    useEffect(() => {
        fetchTimes();
        fetchProduto();
        fetchFuncionario();
        fetchFunil();
        fetchFase();
    }, []);

    return (
        <Card variant="outlined" style={{ maxWidth: '1000px', marginTop: '50px', margin: 'auto', background: '#FCFCF4', borderRadius: '10px', marginBottom: '40px' }}>
            <CardContent>
                <p className='title-cadastro'>Cadastro de Regra de Comissionamento</p>
                <form>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Remuneração fixa *" variant="outlined" size="small" fullWidth margin="normal" value={campoFormatacao} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Remuneração variável" variant="outlined" size="small" fullWidth margin="normal" value={campoVariavel} onChange={handleChangeVariavel} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="% por critério *" variant="outlined" size="small" fullWidth margin="normal" value={campoPorcento} onChange={handleChangePorcento} />
                        </Grid>
                    </Grid>
                    {/* Campos duplicados: Critérios e Multiplicadores */}
                    {campos.map((campo, index) => (
                        <Grid container spacing={1} key={campo.id}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label={`Critério 01 (valor) ${index + 1} *`}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value = {criterioUm}
                                    onChange={handleChangeCriterioUm}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label={`Critério 02 (valor) ${index + 1} *`}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value = {criterioDois}
                                    onChange={handleChangeCriterioDois}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Multiplicadores *"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value = {multiplicador}
                                    onChange={handleChangeMulti}
                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Button onClick={remove} variant="contained" style={{ marginTop: '16px', marginLeft: '10px', borderRadius: '100px', backgroundColor: '#3D7992' }}>
                        -
                    </Button>
                    <Button onClick={add} variant="contained"  style={{ marginTop: '16px', marginLeft: '10px', borderRadius: '100px', backgroundColor: '#2181AA' }}>
                        +
                    </Button>
                    <Grid container spacing={1}>
                                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label='Selecione o funil *'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    margin='normal'
                                    select
                                    value={selectFunil || ''}
                                    onChange={(e) => setSelectedFunil(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Nenhum funil selecionado</em>
                                    </MenuItem>
                                    {Array.isArray(funil) && funil.length > 0 ? (
                                        funil.map((funis) => (
                                            <MenuItem key={funis.id} value={funis.id}>
                                                {funis.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>Nenhum funil encontrado</MenuItem>
                                    )}
                                </TextField>
                                <p id='aviso'>Funil: {selectFunil ? funil.find(f => f.id === Number(selectFunil))?.name : 'Nenhum funil selecionado'}</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                                <TextField
                                    label='Selecione a fase dentro do funil *'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    margin='normal'
                                    select
                                    value={selectFase || ''}
                                    onChange={(e) => setSelectedFase(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Nenhuma fase selecionada</em>
                                    </MenuItem>
                                    {Array.isArray(fase) && fase.length > 0 ? (
                                        fase.map((fases) => (
                                            <MenuItem key={fases.id} value={fases.id}>
                                                {fases.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>Nenhuma fase encontrada</MenuItem>
                                    )}
                                </TextField>
                                <p id='aviso'>Fase: {selectFase ? fase.find(f => f.id === Number(selectFase))?.name : 'Nenhuma fase selecionada'}</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Selecione o produto *"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                select
                                value={selectedProduto || ''}
                                onChange={(e) => setSelectedProduto(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Nenhum produto selecionado</em>
                                </MenuItem>
                                {errorProduto && <MenuItem disabled>{errorProduto}</MenuItem>}
                                {!loadingProduto && !errorProduto && produto.length > 0 ? (
                                    produto.map((produtos) => (
                                        <MenuItem key={produtos.ID}>
                                            {produtos.NAME}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum produto encontrado</MenuItem>
                                )}
                            </TextField>
                            <p id='aviso'>Produto: {selectedProduto ? produto.find(p => p.id === Number(selectedProduto))?.NAME : 'Nenhum produto selecionado'}</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Selecione o time *"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                select
                                value={selectedTime || ''}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Nenhum time selecionado</em>
                                </MenuItem>
                                {errorTime && <MenuItem disabled>{errorTime}</MenuItem>}
                                {!loadingTime && !errorTime && time.length > 0 ? (
                                    time.map((times) => (
                                        <MenuItem key={times.id}>
                                            {times.time}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum time encontrado</MenuItem>
                                )}
                            </TextField>
                            <p id='aviso'>Time: {selectedTime ? time.find(t => t.id === Number(selectedTime))?.time : 'Nenhum time selecionado'}</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Selecione o funcionário"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                select
                                value={selectFuncionario || ''}
                                onChange={(e) => setSelectedFuncionario(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Nenhum funcionário selecionado</em>
                                </MenuItem>
                                {errorFuncionario && <MenuItem disabled>{errorFuncionario}</MenuItem>}
                                {!loadingFuncionario && !errorFuncionario && funcionario.length > 0 ? (
                                    funcionario.map((funcionarios) => (
                                        <MenuItem key={funcionarios.id}>
                                            {funcionarios.fullName}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum funcionário encontrado</MenuItem>
                                )}
                            </TextField>
                            <p id='aviso'>Funcionário: {selectFuncionario ? funcionario.find(f => f.id === Number(selectFuncionario))?.fullName : 'Nenhum funcionário selecionado'}</p>
                        </Grid>
                    </Grid>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Button size="small" variant="contained" color="error" style={{ marginRight: '8px', background: '#5EA8C8' }} startIcon={<DeleteIcon />}>
                            Cancelar o cadastro
                        </Button>
                        <Button size="small" variant="contained" style={{ background: '#2181AA' }} type="submit" endIcon={<SendIcon />}>
                            Efetuar o cadastro
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}