import './style-gestor.css';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, useScrollTrigger, MenuItem  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function Cadastrocomissao() {
    const [time, setTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [loadingTime, setLoadingTime] = useState(true);
    const [errorTime, setErrorTime] = useState(null);
    // const selectedTimeId = Number(selectedTime);

    const [produto, setProduto] = useState([]);
    const [selectedProduto, setSelectedProduto] = useState('');
    const [loadingProduto, setLoadingProduto] = useState(true);
    const [errorProduto, setErrorProduto] = useState(null);

    const [funcionario, setFuncionario] = useState([]);
    const [selectFuncionario, setSelectedFuncionario] = useState('');
    const [loadingFuncionario, setLoadingFuncionario] = useState(true);
    const [errorFuncionario, setErrorFuncionario] = useState(null);

    const fetchTimes = async () => {
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/department.get?select[]=name');
            if (!response.ok) {
                throw new Error('Erro ao buscar os times');
            }
            const data = await response.json();
            console.log(data.result);
            setTime(data.result || []);
        } catch (err) {
            setErrorTime(err.message);
        } finally {
            setLoadingTime(false);
        }
    };

    const fetchProduto = async () => {
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/catalog.document.list');
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

    useEffect(() => {
        fetchTimes(),
        fetchProduto(),
        fetchFuncionario();
    }, []);
    return (
            <Card variant="outlined" style={{ maxWidth: '1000px', margin: 'auto', background: '#FCFCF4', borderRadius: '10px' }}>
                <CardContent>
                    <p className='title-cadastro'>Cadastro de Regra de Comissionamento</p>
                    <form>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Remuneração fixa *" variant="outlined" size="small" fullWidth margin="normal"/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Remuneração variável *" variant="outlined" size="small" fullWidth margin="normal"/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="% por critério *" variant="outlined" size="small" fullWidth margin="normal"/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Critério 01 (valor) *" variant="outlined" size="small" fullWidth margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Critério 02 (valor)" variant="outlined" size="small" fullWidth margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Multiplicadores *" variant="outlined" size="small" fullWidth margin="normal"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Selecione o time *" variant="outlined" size="small" fullWidth margin="normal" select value={selectedTime || ''} onChange={(e) => setSelectedTime(e.target.value)}>
                            <MenuItem value="">
                                <em>Nenhum time selecionado</em>
                            </MenuItem>
                            {errorTime && <MenuItem disabled>{errorTime}</MenuItem>}
                            {!loadingTime && !errorTime && time.length > 0 ? (
                                time.map((times) => (
                                    <MenuItem key={times.id} value={times.id}>
                                        {times.NAME}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>Nenhum time encontrado</MenuItem>
                            )}
                        </TextField>
                        <div>
                             <p id='aviso'>Time Selecionado: {selectedTime ? time.find(t => t.id === Number(selectedTime))?.NAME : 'Nenhum time selecionado'}</p>
                        </div>
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
                                        <MenuItem key={funcionarios.id} value={funcionarios.id}>
                                            {funcionarios.fullName}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum funcionário encontrado</MenuItem>
                                )}
                            </TextField>
                                <div>
                                    <p id='aviso'>Funcionário Selecionado: {selectFuncionario ? funcionario.find(f => f.id === Number(selectFuncionario))?.NAME : 'Nenhum funcionário selecionado'}</p>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Selecione o produto *" variant="outlined" size="small" fullWidth margin="normal" select>
                                    {/* {loadingProduto && <MenuItem disabled>Carregando...</MenuItem>}
                                    {errorProduto && <MenuItem disabled>{errorProduto}</MenuItem>}
                                    {!loadingProduto && !errorProduto && produto.map((produtos) => (
                                        <MenuItem key={produtos.id} value={produtos.id}> 
                                            {produtos.name} 
                                        </MenuItem>
                                    ))} */}
                                </TextField>
                            </Grid>
                        </Grid>
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <Button size="small" variant="contained" color="error" style={{ marginRight: '8px', background: '#5EA8C8' }} startIcon={<DeleteIcon />}>Cancelar o cadastro</Button>
                            <Button size="small" variant="contained" style={{background: '#2181AA'}} type="submit" endIcon={<SendIcon />}>Efetuar o cadastro</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
    );
}
