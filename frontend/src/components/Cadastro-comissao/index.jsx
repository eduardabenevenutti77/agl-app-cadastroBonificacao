import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, useScrollTrigger, MenuItem  } from '@mui/material';

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
        <Card variant="outlined" style={{ maxWidth: '1000px', margin: 'auto' }}>
            <CardContent>
                <p className='title'>Cadastro de Regra de Comissionamento</p>
                <form>
                    <TextField label="Remuneração fixa *" variant="outlined" fullWidth margin="normal" />
                    <TextField label="Remuneração variável *" variant="outlined" fullWidth margin="normal" />
                    <TextField label="% por critério *" variant="outlined" fullWidth margin="normal" />
                    <TextField label="Critério 01 (valor) *" variant="outlined" fullWidth margin="normal" />
                    <TextField label="Critério 02 (valor)" variant="outlined" fullWidth margin="normal" />
                    <TextField label="Multiplicadores *" variant="outlined" fullWidth margin="normal" />

                    <Grid container spacing={2} style={{ marginTop: '16px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Selecione o time *" variant="outlined" fullWidth margin="normal" select>
                                {loading && <MenuItem disabled>Carregando...</MenuItem>}
                                {error && <MenuItem disabled>{error}</MenuItem>}
                                {!loading && !error && time.map((times) => (
                                    <MenuItem key={times.id} value={times.id}> 
                                        {times.nome} 
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Selecione o funcionário" variant="outlined" fullWidth margin="normal" select>
                                {/* Options */}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Selecione o produto *" variant="outlined" fullWidth margin="normal" select>
                                {/* Options */}
                            </TextField>
                        </Grid>
                    </Grid>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Button variant="contained" color="error" style={{ marginRight: '8px' }}>Cancelar o cadastro</Button>
                        <Button variant="contained" color="primary" type="submit">Efetuar o cadastro</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
