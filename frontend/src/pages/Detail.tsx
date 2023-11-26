import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Livre } from '../types';
import { Box, Toolbar, Container, Grid, Paper, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Button, TextField, Stack } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import Title from '../components/Title';
import { Delete } from '@mui/icons-material';

import pia from '../assets/pia.png';
import francois from '../assets/francois.png';
import jean from '../assets/jean.png';
import olympe from '../assets/olympe.jpg';
import ThemesLivre from '../components/ThemesLivre';
import Livres from './Livres';


interface IDetailProps {
    author: string,
    id: string
}

export async function loader({ params }: { params: any }) {
    const response = await fetch(`/api/document/${params.author}/${params.id}`);
    //const livre : Livre = await response.json();

    const livre: Livre = {
        author: `Camus`,
        id: '1',
        name: `L'étranger`,
        cover: "Venez découvrir l'histoire de Meursault, un homme ordinaire, employé de bureau dans la ville d'Alger. Un télégramme vient bousculer sa vie monotone : sa mère vient de mourir dans un asile de vieillards à Marengo, une petite ville à quatre-vingts kilomètres de là. S'ensuit un voyage à travers l'Algérie coloniale, où chaque détail du paysage, chaque instant de son voyage prend une signification particulière. Meursault assiste à l'enterrement, rencontre les autres pensionnaires de l'asile, comme le vieil homme Parisien devenu concierge, et se confronte à l'absurdité de la mort et de la vie. Il affronte sa solitude, l'indifférence du monde et son incapacité à ressentir des émotions comme les autres. Avec une écriture simple et précise, l'auteur nous plonge dans le quotidien de Meursault, où l'extraordinaire surgit dans les détails les plus banals. Qu'il s'agisse de la couleur du ciel, de l'odeur de la terre, du bruit des trams ou du goût du café, chaque sensation est capturée et décrite avec une acuité remarquable. Les personnages secondaires, comme le concierge de l'asile, l'amie de sa mère ou son voisin Raymond, sont également dessinés avec une grande finesse. L'Algérie coloniale est un personnage à part entière de ce livre, avec ses paysages lumineux, ses villes bruyantes et colorées, et ses habitants marqués par la chaleur et la pauvreté. L'asile de vieillards, l'appartement de Meursault, le bureau où il travaille, la rue où il vit, sont autant de lieux qui prennent vie sous la plume de l'auteur. Ce voyage à travers la vie et la mort, à travers la chaleur et la lumière de l'Algérie, est aussi une quête de sens. Que signifie vivre, aimer, mourir ? Comment réagir face à l'absurdité du monde ? Pourquoi sommes-nous là ? Ce sont ces questions universelles qui hantent chaque page de ce livre. Embarquez dans ce voyage bouleversant et laissez-vous toucher par la beauté poignante de cet homme ordinaire confronté à l'extraordinaire. Quelle sera la révélation finale de Meursault ? Jusqu'où l'emmènera sa quête de sens ? Pour le découvrir, plongez-vous dans ce livre.",
        book_text: "toto",
        summary: "toto",
        status: 'Finised',
        open: false,
        themes: [
            'Science Fiction',
            'Littérature',
            '1900',
            'A lire absoluement'
        ],
        covers: [
            {
                persona_name: 'Pia',
                persona_picture: pia,
                persona_description: "Pia is a bookseller at “L’écume des pages” and a blogger who loves to read and review various books. ",
                content: "Venez découvrir l'histoire de Meursault, un homme ordinaire, employé de bureau dans la ville d'Alger. Un télégramme vient bousculer sa vie monotone : sa mère vient de mourir dans un asile de vieillards à Marengo, une petite ville à quatre-vingts kilomètres de là. S'ensuit un voyage à travers l'Algérie coloniale, où chaque détail du paysage, chaque instant de son voyage prend une signification particulière. Meursault assiste à l'enterrement, rencontre les autres pensionnaires de l'asile, comme le vieil homme Parisien devenu concierge, et se confronte à l'absurdité de la mort et de la vie. Il affronte sa solitude, l'indifférence du monde et son incapacité à ressentir des émotions comme les autres. Avec une écriture simple et précise, l'auteur nous plonge dans le quotidien de Meursault, où l'extraordinaire surgit dans les détails les plus banals. Qu'il s'agisse de la couleur du ciel, de l'odeur de la terre, du bruit des trams ou du goût du café, chaque sensation est capturée et décrite avec une acuité remarquable. Les personnages secondaires, comme le concierge de l'asile, l'amie de sa mère ou son voisin Raymond, sont également dessinés avec une grande finesse. L'Algérie coloniale est un personnage à part entière de ce livre, avec ses paysages lumineux, ses villes bruyantes et colorées, et ses habitants marqués par la chaleur et la pauvreté. L'asile de vieillards, l'appartement de Meursault, le bureau où il travaille, la rue où il vit, sont autant de lieux qui prennent vie sous la plume de l'auteur. Ce voyage à travers la vie et la mort, à travers la chaleur et la lumière de l'Algérie, est aussi une quête de sens. Que signifie vivre, aimer, mourir ? Comment réagir face à l'absurdité du monde ? Pourquoi sommes-nous là ? Ce sont ces questions universelles qui hantent chaque page de ce livre. Embarquez dans ce voyage bouleversant et laissez-vous toucher par la beauté poignante de cet homme ordinaire confronté à l'extraordinaire. Quelle sera la révélation finale de Meursault ? Jusqu'où l'emmènera sa quête de sens ? Pour le découvrir, plongez-vous dans ce livre."
            },
            {
                persona_name: 'François',
                persona_picture: francois,
                persona_description: "François is a retired teacher and a literature lover",
                content: "Venez découvrir l'histoire de Meursault, un homme ordinaire, employé de bureau dans la ville d'Alger. Un télégramme vient bousculer sa vie monotone : sa mère vient de mourir dans un asile de vieillards à Marengo, une petite ville à quatre-vingts kilomètres de là. S'ensuit un voyage à travers l'Algérie coloniale, où chaque détail du paysage, chaque instant de son voyage prend une signification particulière. Meursault assiste à l'enterrement, rencontre les autres pensionnaires de l'asile, comme le vieil homme Parisien devenu concierge, et se confronte à l'absurdité de la mort et de la vie. Il affronte sa solitude, l'indifférence du monde et son incapacité à ressentir des émotions comme les autres. Avec une écriture simple et précise, l'auteur nous plonge dans le quotidien de Meursault, où l'extraordinaire surgit dans les détails les plus banals. Qu'il s'agisse de la couleur du ciel, de l'odeur de la terre, du bruit des trams ou du goût du café, chaque sensation est capturée et décrite avec une acuité remarquable. Les personnages secondaires, comme le concierge de l'asile, l'amie de sa mère ou son voisin Raymond, sont également dessinés avec une grande finesse. L'Algérie coloniale est un personnage à part entière de ce livre, avec ses paysages lumineux, ses villes bruyantes et colorées, et ses habitants marqués par la chaleur et la pauvreté. L'asile de vieillards, l'appartement de Meursault, le bureau où il travaille, la rue où il vit, sont autant de lieux qui prennent vie sous la plume de l'auteur. Ce voyage à travers la vie et la mort, à travers la chaleur et la lumière de l'Algérie, est aussi une quête de sens. Que signifie vivre, aimer, mourir ? Comment réagir face à l'absurdité du monde ? Pourquoi sommes-nous là ? Ce sont ces questions universelles qui hantent chaque page de ce livre. Embarquez dans ce voyage bouleversant et laissez-vous toucher par la beauté poignante de cet homme ordinaire confronté à l'extraordinaire. Quelle sera la révélation finale de Meursault ? Jusqu'où l'emmènera sa quête de sens ? Pour le découvrir, plongez-vous dans ce livre."
            },
            {
                persona_name: 'Jean',
                persona_picture: jean,
                persona_description: "Jean is a student and a science fiction fan who reads novels in the train",
                content: "Venez découvrir l'histoire de Meursault, un homme ordinaire, employé de bureau dans la ville d'Alger. Un télégramme vient bousculer sa vie monotone : sa mère vient de mourir dans un asile de vieillards à Marengo, une petite ville à quatre-vingts kilomètres de là. S'ensuit un voyage à travers l'Algérie coloniale, où chaque détail du paysage, chaque instant de son voyage prend une signification particulière. Meursault assiste à l'enterrement, rencontre les autres pensionnaires de l'asile, comme le vieil homme Parisien devenu concierge, et se confronte à l'absurdité de la mort et de la vie. Il affronte sa solitude, l'indifférence du monde et son incapacité à ressentir des émotions comme les autres. Avec une écriture simple et précise, l'auteur nous plonge dans le quotidien de Meursault, où l'extraordinaire surgit dans les détails les plus banals. Qu'il s'agisse de la couleur du ciel, de l'odeur de la terre, du bruit des trams ou du goût du café, chaque sensation est capturée et décrite avec une acuité remarquable. Les personnages secondaires, comme le concierge de l'asile, l'amie de sa mère ou son voisin Raymond, sont également dessinés avec une grande finesse. L'Algérie coloniale est un personnage à part entière de ce livre, avec ses paysages lumineux, ses villes bruyantes et colorées, et ses habitants marqués par la chaleur et la pauvreté. L'asile de vieillards, l'appartement de Meursault, le bureau où il travaille, la rue où il vit, sont autant de lieux qui prennent vie sous la plume de l'auteur. Ce voyage à travers la vie et la mort, à travers la chaleur et la lumière de l'Algérie, est aussi une quête de sens. Que signifie vivre, aimer, mourir ? Comment réagir face à l'absurdité du monde ? Pourquoi sommes-nous là ? Ce sont ces questions universelles qui hantent chaque page de ce livre. Embarquez dans ce voyage bouleversant et laissez-vous toucher par la beauté poignante de cet homme ordinaire confronté à l'extraordinaire. Quelle sera la révélation finale de Meursault ? Jusqu'où l'emmènera sa quête de sens ? Pour le découvrir, plongez-vous dans ce livre."
            },
            {
                persona_name: 'Olympe',
                persona_picture: olympe,
                persona_description: "Olympe is a retired art historian and a rare book collector ",
                content: "Venez découvrir l'histoire de Meursault, un homme ordinaire, employé de bureau dans la ville d'Alger. Un télégramme vient bousculer sa vie monotone : sa mère vient de mourir dans un asile de vieillards à Marengo, une petite ville à quatre-vingts kilomètres de là. S'ensuit un voyage à travers l'Algérie coloniale, où chaque détail du paysage, chaque instant de son voyage prend une signification particulière. Meursault assiste à l'enterrement, rencontre les autres pensionnaires de l'asile, comme le vieil homme Parisien devenu concierge, et se confronte à l'absurdité de la mort et de la vie. Il affronte sa solitude, l'indifférence du monde et son incapacité à ressentir des émotions comme les autres. Avec une écriture simple et précise, l'auteur nous plonge dans le quotidien de Meursault, où l'extraordinaire surgit dans les détails les plus banals. Qu'il s'agisse de la couleur du ciel, de l'odeur de la terre, du bruit des trams ou du goût du café, chaque sensation est capturée et décrite avec une acuité remarquable. Les personnages secondaires, comme le concierge de l'asile, l'amie de sa mère ou son voisin Raymond, sont également dessinés avec une grande finesse. L'Algérie coloniale est un personnage à part entière de ce livre, avec ses paysages lumineux, ses villes bruyantes et colorées, et ses habitants marqués par la chaleur et la pauvreté. L'asile de vieillards, l'appartement de Meursault, le bureau où il travaille, la rue où il vit, sont autant de lieux qui prennent vie sous la plume de l'auteur. Ce voyage à travers la vie et la mort, à travers la chaleur et la lumière de l'Algérie, est aussi une quête de sens. Que signifie vivre, aimer, mourir ? Comment réagir face à l'absurdité du monde ? Pourquoi sommes-nous là ? Ce sont ces questions universelles qui hantent chaque page de ce livre. Embarquez dans ce voyage bouleversant et laissez-vous toucher par la beauté poignante de cet homme ordinaire confronté à l'extraordinaire. Quelle sera la révélation finale de Meursault ? Jusqu'où l'emmènera sa quête de sens ? Pour le découvrir, plongez-vous dans ce livre."
            },
        ]
    }

    const prompts = await (await fetch(`/api/prompt`)).json();

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

    const coversLayout = (props: any) => {
        const { data, id, author, type, covers, prompt } = props;
        const isTypeInSendingMode = sending.findIndex(val => val === type) !== -1

        if (data) {
            return (
                <Grid container key={id} spacing={3} p={2} >
                    {
                        covers.map((cover: any) => {
                            return (
                                <Stack m={2} mb={4}>
                                    <Grid item xs={12} mb={2}>
                                        <Stack spacing={2} direction='row' alignItems='center' color='primary'>
                                            <img style={{ width: '80px', height: '80px', borderRadius: '10%', objectFit: 'cover' }} src={cover.persona_picture} />
                                            <div>
                                                <Typography variant="h6" color='primary' gutterBottom>
                                                    {cover.persona_name}
                                                </Typography>
                                                <Typography variant="subtitle2" color='primary' gutterBottom>
                                                    {cover.persona_description}
                                                </Typography>
                                            </div>
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
                    <Typography variant='h6' color='primary' gutterBottom>Thèmes</Typography>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                        <ThemesLivre themes={themes} />
                    </Paper>

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