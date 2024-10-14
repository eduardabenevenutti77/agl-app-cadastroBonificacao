import './style-gestor.css';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, useScrollTrigger, MenuItem  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function Cadastrocomissao() {
    const [time, setTime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchTimes = async () => {
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/department.get?NAME');
            if (!response.ok) {
                throw new Error('Erro ao buscar os times');
            }
            const data = await response.json();
            setTime(data);
        } catch (err) {
             setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTimes(); 
    }, []);
    return (
        <body>
            
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
                                <TextField label="Selecione o time *" variant="outlined" size="small" fullWidth margin="normal" select>
                                    {loading && <MenuItem disabled>Carregando...</MenuItem>}
                                    {error && <MenuItem disabled>{error}</MenuItem>}
                                    {!loading && !error && time.map((times) => (
                                        <MenuItem key={times.id} value={times.id}> 
                                            {times.nome} 
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Selecione o funcionário" variant="outlined" size="small" fullWidth margin="normal" select>
                                    {/* Options */}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Selecione o produto *" variant="outlined" size="small" fullWidth margin="normal" select>
                                    {/* Options */}
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
        </body>
    );
}
