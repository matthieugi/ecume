import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Livre } from '../types';
import { Box, Toolbar, Container, Grid, Paper, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Button } from '@mui/material';
import Title from './Title';

interface IDetailProps {
    author: string,
    id: string
}

export async function loader({ params }: any) {
    const response = await fetch(`/api/document/${params.author}/${params.id}`);
    const livre = await response.json();
    return livre;
}

const sendRequest = async (id: string, author: string, type: string) => {
    fetch(`/api/${type}/${author}/${id}`, {
        method: 'POST',
    });
}

const dataOrGenerate = (props: any) => {
    const { data, id, author, type } = props;

    if(data) {
        return (
            <Typography variant="body1" gutterBottom>
                {data}
            </Typography>
        );
    }

    return(
        <Button onClick={() => sendRequest(id, author, type)} variant="contained">
            Générer
        </Button>
    )

}

const Detail = () => {
    const { id, name, author, cover, summary } = useLoaderData() as Livre;
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
                        <Title>{name} : {author}</Title>
                    </Grid>
                    {/* Books */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" color="primary" gutterBottom component="div">
                                Couverture
                            </Typography>
                            {dataOrGenerate({ data: cover, id: id, author: author, type: 'cover' })}
                        </Paper>
                        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" color="primary" gutterBottom component="div">
                                Résumé
                            </Typography>
                            {dataOrGenerate({ data: summary, id: id, author: author, type: 'summary' })}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Detail;