import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Livre } from '../types';
import { Box, Toolbar, Container, Grid, Paper, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Button, TextField, Stack } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import Title from '../components/Title';
import { Delete } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import pia from '../assets/pia.png';
import francois from '../assets/francois.png';
import jean from '../assets/jean.png';
import olympe from '../assets/olympe.jpg';
import ThemesLivre from '../components/ThemesLivre';
import Livres from './Livres';

const cover_images = {
    'Pia': pia,
    'François': francois,
    'Jean': jean,
    'Olympe': olympe
};

const cover_description = {
    'Pia': `Pia is a bookseller at “L’écume des pages” and a blogger who loves to read and review various books.`,
    'François': "François is a retired teacher and a literature lover",
    'Jean': "Jean is a student and a science fiction fan who reads novels in the train",
    'Olympe': "Olympe is a retired art historian and a rare book collector"
}

interface IDetailProps {
    author: string,
    id: string
}

export async function loader({ params }: { params: any }) {
    const response = await fetch(`/api/document/${params.author}/${params.id}`);
    const answer: Livre = await response.json();
    const prompts = await (await fetch(`/api/prompt`)).json();

    let livre = answer;

    if (livre.covers) {
        livre = {
            ...livre,
            covers: livre.covers.map(cover => ({
                persona_name: cover.persona_name,
                persona_picture: cover_images[cover.persona_name as keyof typeof cover_images] as string,
                persona_description: cover_description[cover.persona_name as keyof typeof cover_description] as string,
                content: cover.content
            }))
        }
    }

    return {
        livre: livre,
        prompts: prompts
    };
}

const Detail = () => {
    const { livre: { id, name, author, cover, covers, themes, summary }, prompts } = useLoaderData() as { livre: Livre, prompts: { cover: string } };
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
            const { livre } = await loader({ params: { id, author } })

            //Récupère la valeur de la propriété de la valeur de type
            const typeValue = Object.entries(livre).filter(([key]) => key === type)[0][1]

            if (typeValue !== "") {
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

    const playText = async (text: string) => {
        console.log(text);
    }

    const coversLayout = (props: any) => {
        const { data, id, author, type, covers, prompt } = props;
        const isTypeInSendingMode = sending.findIndex(val => val === type) !== -1

        if (covers) {
            return (
                <Grid container key={id} spacing={3} p={2} >
                    {
                        covers.map((cover: any) => {
                            return (
                                <Stack m={2} mb={4}>
                                    <Grid item xs={12} mb={2}>
                                        <Stack spacing={2} direction='row' alignItems='center' color='primary'>
                                            <img style={{ width: '80px', height: '80px', borderRadius: '7%', objectFit: 'cover' }} src={cover.persona_picture} />
                                            <div style={{ flexGrow: 1 }}>
                                                <Typography variant="h6" color='primary' gutterBottom>
                                                    {cover.persona_name}
                                                </Typography>
                                                <Typography variant="subtitle2" color='primary' gutterBottom>
                                                    {cover.persona_description}
                                                </Typography>
                                            </div>
                                            <Button variant='outlined' onClick={() => playText(cover.content)} >
                                                <PlayArrowIcon />
                                            </Button>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" gutterBottom>
                                            {cover.content}
                                        </Typography>
                                    </Grid>
                                </Stack>
                            )
                        })
                    }
                </Grid>
            );
        }

        if (data) {
            return (
                <Grid container key={id} spacing={3} p={2} >
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            {data}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant='body1' gutterBottom component='div'>Crée un contenu à partir des instructions suivantes :</Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextField disabled={isTypeInSendingMode} multiline fullWidth value={coverPrompt} onChange={(e) => setCoverPrompt(e.target.value)} required />
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
            <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
                <Typography variant='h5' color='primary' gutterBottom>{name} : {author}</Typography>

                <Stack spacing={3} mt={2}>

                    {
                        themes && (
                            <>
                                <Typography variant='h6' color='primary' gutterBottom>Thèmes</Typography>
                                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'row', }}>
                                    <ThemesLivre themes={themes} />
                                </Paper>
                            </>
                        )
                    }

                    <Typography variant='h6' color='primary' gutterBottom>Couvertures</Typography>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                        {coversLayout({ data: cover, id: id, author: author, type: 'cover', covers: covers, prompt: prompts.cover })}
                    </Paper>
                </Stack>

            </Container>
        </Box>
    )
}

export default Detail;