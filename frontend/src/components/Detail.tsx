import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Livre } from '../types';
import { Box, Toolbar, Container, Grid, Paper, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Button, TextField } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import Title from './Title';
import { Delete } from '@mui/icons-material';


interface IDetailProps {
    author: string,
    id: string
}

export async function loader({ params }: { params: any }) {
    const response = await fetch(`/api/document/${params.author}/${params.id}`);
    const livre : Livre = await response.json();

    const prompts = await(await fetch(`/api/prompt`)).json();

    return {
        livre: livre,
        prompts: prompts
    };
}

const Detail = () => {
    const { livre:{ id, name, author, cover, summary }, prompts } = useLoaderData() as {livre: Livre, prompts: { cover: string }};
    const [sending, setSending] = useState<string[]>([]);
    const [coverPrompt, setCoverPrompt] = useState<string>(prompts.cover);
    const navigate = useNavigate();

    const contentGeneration = async (id: string, author: string, type: string, prompt: string) => {
        setSending([
            ...sending,
            type
        ]);

        const form = new FormData();
        form.append('prompt', prompt);

        fetch(`/api/${type}/${author}/${id}`, {
            method: 'POST',
            body: form
        });
        
        const interval = setInterval(async () => {
            const { livre } = await loader({ params: {id, author}})
    
            //Récupère la valeur de la propriété de la valeur de type
            const typeValue = Object.entries(livre).filter(([key]) => key === type)[0][1]
            
            if(typeValue !== "") {
                setSending(
                    sending.filter(typeFiltered => typeFiltered !== type)
                )

                clearInterval(interval)
                navigate(`/detail/${author}/${id}`)
            };
        }, 5000)
    }

    const deletePromptResult = async (id: string, type: string) => {
        await fetch(`/api/document/${author}/${id}/${type}`, {
            method: 'DELETE',
        });
        navigate(`/detail/${author}/${id}`)
    }

    const dataOrGenerate = (props: any) => {
        const { data, id, author, type, prompt } = props;
        const isTypeInSendingMode = sending.findIndex(val => val === type) !== -1
    
        if(data) {
            return (
                <Grid container spacing={3} p={2}>
                    <Grid item xs={11}>
                        <Typography variant="body1" gutterBottom>
                            {data}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={() => deletePromptResult(id, type)} variant="contained">
                            <Delete />
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        return(
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant='body1' gutterBottom component='div'>Crée un contenu à partir des instructions suivantes :</Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextField  disabled={isTypeInSendingMode} multiline fullWidth value={coverPrompt} onChange={(e) => setCoverPrompt(e.target.value)}  required />
                </Grid>
                <Grid item xs={2}>
                {
                    isTypeInSendingMode ? 
                    (
                        <Button disabled variant="contained" type="submit">
                            <LoopIcon />
                        </Button>
                    ) :
                    (
                        <Button disabled={isTypeInSendingMode} onClick={() => contentGeneration(id, author, type, coverPrompt)} variant="contained">
                            Générer
                        </Button>
                    )  
                }
                </Grid>
            </Grid>
        )
    
    }

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant='h5' color='primary' gutterBottom>{name} : {author}</Typography>
                    </Grid>
                    {/* Books */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" color="primary" gutterBottom component="div">
                                Couverture
                            </Typography>
                            {dataOrGenerate({ data: cover, id: id, author: author, type: 'cover', prompt: prompts.cover })}
                        </Paper>
                        {/* <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" color="primary" gutterBottom component="div">
                                Autre
                            </Typography>
                            {dataOrGenerate({ data: summary, id: id, author: author, type: 'summary' })}
                        </Paper> */}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Detail;