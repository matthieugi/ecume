import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Grid, Paper, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, createTheme, ThemeProvider, Toolbar, Box, Container, Button, TextField, FormControl, InputLabel, styled } from '@mui/material';
import React, { useState } from 'react';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Livre } from '../types';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(new Blob());
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', title);
        formData.append('author', author);
        formData.append('book', file);

        const response: Livre = await(await fetch('/api/document', {
            method: 'POST',
            body: formData
        })).json();

        fetch(`api/summary/${author}/${response.id}`,
        {
            method: 'POST'
        });
        navigate('/');
    };

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
                    {/* Books */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 1, display: 'flex', flexGrow: '1', flexDirection: 'column' }}>
                            <Title>Ajouter un livre</Title>
                            <form onSubmit={handleSubmit}>
                                <List>
                                    <ListItem >
                                        <TextField sx={{ flexGrow: 1 }} label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    </ListItem>
                                    <ListItem>
                                        <TextField sx={{ flexGrow: 1 }} label="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                                    </ListItem>
                                    <ListItem>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Télécharger le livre
                                            <VisuallyHiddenInput onChange={((e) => e.target.files && setFile(e.target.files[0]))} type="file" />
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button variant="contained" type="submit">Envoyer</Button>
                                    </ListItem>
                                </List>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default AddBook;