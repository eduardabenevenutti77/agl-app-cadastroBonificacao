import './style-gestor.css';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { cadastroRegra, findFase, findFuncionario, findFunil, findProduto, findTime } from '../../api/regra';
import { toast } from 'react-toastify';

export default function Cadastrocomissao() {
    const [campoFormatacao, setCampoForm] = useState('');
    const handleChange = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor / 100);
        setCampoForm(formatado);
    }

    const [campoVariavel, setCampoVariavel] = useState('');
    const handleChangeVariavel = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor / 100);
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
        }).format(valor / 100);
        setCriterioUm(formatado);
    }

    const [criterioDois, setCriterioDois] = useState('');
    const handleChangeCriterioDois = (event) => {
        const valor = event.target.value.replace(/[^0-9]/g, '');
        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor / 100);
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

    const [quantidade, setQuantidade] = useState([])

    const fetchTimes = async () => {
        try {
            const response = await findTime();
            console.log("TIMES -> ", response)
            if (!response) {
                console.log('O objeto retornado da requisição de times está vazio!')
            }
            setTime(response || []);
        } catch (err) {
            setErrorTime(err.message);
        } finally {
            setLoadingTime(false);
        }
    };

    const fetchProduto = async () => {
        try {
            const response = await findProduto();
            console.log("Produtos = ", response)
            if (!response) {
                console.log('O objeto retornado da requisição de times está vazio!')
            }
            setProduto(response || []);
        } catch (err) {
            setErrorProduto(err.message);
        } finally {
            setLoadingProduto(false);
        }
    };

    const fetchFuncionario = async () => {
        setLoadingFuncionario(true);
        try {
            const response = await findFuncionario();
            console.log('Funcionários = ', response)
            if (!response) {
                console.log('O objeto retornado da requisição de times está vazio!')
            }
            setFuncionario(response || [])
        } catch (err) {
            setErrorFuncionario(err.message);
        } finally {
            setLoadingFuncionario(false);
        }
    };

    const fetchFunil = async () => {
        setLoadingFunil(true);
        try {
            const response = await findFunil();
            if (!response) {
                console.log('O objeto retornado da requisição de times está vazio!')
            }
            console.log('Funis encontrados -> ', response);
            setFunil(response || []);
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
            const response = await findFase();
            if (!response) {
                console.log('O objeto retornado da requisição de times está vazio!')
            }
            console.log('Fases encontradas -> ', response);
            setFase(response || []);
        } catch (e) {
            setErrorFase(e.message);
        }
    }

    useEffect(() => {
        fetchTimes();
        fetchProduto();
        fetchFuncionario();
        fetchFunil();
        fetchFase();
    }, []);

    const removendoFormatacao = (campo) => {
        return campo.replace(/[^0-9]/g, '')
    }
    const regra = { campoPorcento:  removendoFormatacao(campoPorcento), criterioUm: removendoFormatacao(criterioUm), selectFunil, selectFase, selectedProduto, quantidade, selectedTime, selectFuncionario};
    const handleSubmitForms = async (e) => {
        e.preventDefault();
        try {
            const response = await cadastroRegra({...regra});
            if (response.id) {
                toast.success('Cadastro de comissão bem-sucedido!');
                setCampoForm('');
                setCampoPorcento('');
                setCampoVariavel('');
                setCriterioDois('');
                setCriterioUm('');
                setMultiplicador('');
                setQuantidade('');  
            } else {
                toast.error('Cadastro de comissão falhou!')
            }
        } catch (e) {
            console.log(e);
            if (e.status === 403) {
                toast.dark("Sem permissão.");
            } else if (!campoPorcento || !criterioUm || !selectFunil || !selectFase || !selectedProduto || !selectedTime) {
                toast.info('Todos os campos obrigátorios precisam estar preenchidos para prosseguir com o cadastro.')
            } else {
                toast.dark('Erro inesperado, tente novamente mais tarde!');
            }
        }
    }

    return (
        <Card variant="outlined" style={{ maxWidth: '1000px', marginTop: '50px', margin: 'auto', background: '#FCFCF4', borderRadius: '10px', marginBottom: '40px' }}>
            <CardContent>
                <p className='title-cadastro'>Cadastro de Regra de Comissionamento</p>
                <form>
                    <Grid container spacing={1}>
                    {campos.map((campo, index) => (
                        <Grid container spacing={1} key={campo.id}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={`Critério 01 (valor) ${index + 1} *`}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value={criterioUm}
                                    onChange={handleChangeCriterioUm}
                                    sx={{ '& .MuiInputLabel-root': { color: '#01638C' },  '& .MuiInputLabel-root.Mui-focused': { color: '#01638C' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="% por critério *" variant="outlined" size="small" fullWidth margin="normal" value={campoPorcento} onChange={handleChangePorcento} sx={{ '& .MuiInputLabel-root': { color: '#01638C' },  '& .MuiInputLabel-root.Mui-focused': { color: '#01638C' } }}/>
                            </Grid>
                        </Grid>
                    ))}
                    </Grid>
                    <Button onClick={remove} variant="contained" style={{ marginTop: '16px', marginLeft: '10px', borderRadius: '100px', backgroundColor: '#3D7992' }}>
                        -
                    </Button>
                    <Button onClick={add} variant="contained" style={{ marginTop: '16px', marginLeft: '10px', borderRadius: '100px', backgroundColor: '#2181AA' }}>
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
                                sx={{ '& .MuiInputLabel-root': { color: '#01638C' },  '& .MuiInputLabel-root.Mui-focused': { color: '#01638C' } }}
                            >
                                <MenuItem value="">
                                    <em>Nenhum funil selecionado</em>
                                </MenuItem>
                                {errorFunil && <MenuItem disabled>{errorFunil}</MenuItem>}
                                {!loadingFunil && !errorFunil && funil.length > 0 ? (
                                    funil.map((funis) => (
                                        <MenuItem key={funis.id} value={funis.id}>
                                            {funis.funil}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum funil encontrado</MenuItem>
                                )}
                            </TextField>
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
                                sx={{ '& .MuiInputLabel-root': { color: '#01638C' },  '& .MuiInputLabel-root.Mui-focused': { color: '#01638C' } }}
                            >
                                <MenuItem value="">
                                    <em>Nenhuma fase selecionada</em>
                                </MenuItem>
                                {Array.isArray(fase) && fase.length > 0 ? (
                                    fase.map((fases) => (
                                        <MenuItem key={fases.id} value={fases.id}>
                                            {fases.fase}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhuma fase encontrada</MenuItem>
                                )}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Selecione o produto"
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
                                        <MenuItem key={produtos.id} value={produtos.id}>
                                            {produtos.produtos}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum produto encontrado</MenuItem>
                                )}
                            </TextField>
                        </Grid>
                        {/* <Grid item xs={12} sm={4}>
                            <TextField
                                label="Quantidade de produto "
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                            />
                        </Grid> */}
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
                                sx={{ '& .MuiInputLabel-root': { color: '#01638C' },  '& .MuiInputLabel-root.Mui-focused': { color: '#01638C' } }}
                            >
                                <MenuItem value="">
                                    <em>Nenhum time selecionado</em>
                                </MenuItem>
                                {errorTime && <MenuItem disabled>{errorTime}</MenuItem>}
                                {!loadingTime && !errorTime && time.length > 0 ? (
                                    time.map((times) => (
                                        <MenuItem key={times.id} value={times.id}>
                                            {times.time}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum time encontrado</MenuItem>
                                )}
                            </TextField>
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
                                    funcionario.map((func) => (
                                        <MenuItem key={func.id} value={func.id}>
                                            {func.funcionario}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum funcionário encontrado</MenuItem>
                                )}
                            </TextField>
                        </Grid>
                    </Grid>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Button size="small" variant="contained" color="error" style={{ marginRight: '8px', background: '#5EA8C8' }} startIcon={<DeleteIcon />}>
                            Cancelar o cadastro
                        </Button>
                        <Button size="small" variant="contained" style={{ background: '#2181AA' }} type="submit" endIcon={<SendIcon />} onClick={handleSubmitForms}>
                            Efetuar o cadastro
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}