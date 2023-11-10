import { Avatar, Box, Button, Collapse, Container, Grid, IconButton, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, createStyles, makeStyles } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import React, { useEffect } from "react";
import Title from "./Title";
import { Livre } from "../types";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";

let livresdefaut = [
    {
        id: "1",
        name: "Le Seigneur des Anneaux",
        author: "J.R.R. Tolkien",
        status: "In ",
        book_text: "",
        summary: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum facilis nihil architecto ullam ipsa suscipit fugiat quaerat voluptates nobis, quasi voluptatem illo blanditiis necessitatibus ipsum modi laborum velit doloribus eos minima? Alias molestiae perspiciatis commodi quam omnis non, corporis, inventore error consectetur possimus ipsam? Illo libero veritatis ipsam excepturi esse, aperiam ipsum voluptas nesciunt molestiae repudiandae quasi dolorum omnis, autem dolorem quod debitis commodi atque nostrum molestias error modi itaque delectus dignissimos! Quo veritatis est culpa provident molestias perferendis ducimus. Nisi fuga iste et eveniet? Qui voluptatibus perferendis quod molestias illum! Hic ea odit voluptas veritatis perspiciatis vitae, excepturi sequi, adipisci officiis exercitationem ipsam ut minima at. Debitis, asperiores veniam atque mollitia, sint voluptatem earum quis iure nemo ducimus repellat quibusdam dolor quidem obcaecati voluptatum ut voluptates ipsam? Perferendis dignissimos ducimus eum quia repellat facilis velit veritatis mollitia! Aut officiis voluptates distinctio rerum velit odit, placeat adipisci non tempore totam corrupti praesentium est quis optio nam sed amet dicta maxime ullam quaerat. Voluptatem fugit dolor quis harum odit beatae corrupti delectus facilis corporis architecto expedita fuga, enim, inventore sapiente rerum accusantium voluptas. Corrupti dicta illo ratione eos, incidunt animi at consequuntur laborum odit repellendus culpa officiis tenetur quaerat optio fuga eum sint provident unde tempora voluptate exercitationem quas saepe cupiditate? Commodi dolorum, exercitationem voluptatum sit quidem aliquam aperiam saepe ullam at cum? Nobis doloremque ea dolores aperiam autem ex, amet praesentium, quaerat voluptates sequi deserunt deleniti tempora unde reiciendis perspiciatis dignissimos dolore, iste veritatis iusto ut. Minus dicta illum labore quam dolore. Maiores, laudantium explicabo tempore ratione cumque pariatur suscipit similique quas esse excepturi culpa quasi praesentium saepe ea eos dolor libero a! Incidunt facere natus et minima tempora fugiat cumque tempore magnam harum est voluptas quibusdam reiciendis quis, quas dicta suscipit aperiam dignissimos voluptates labore eos impedit ducimus expedita?",
        cover: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, fuga velit architecto veritatis voluptatum ut delectus alias, blanditiis autem et, doloribus magnam explicabo. Ipsam, est ratione? Numquam perspiciatis doloribus autem aspernatur laborum amet sapiente quidem vitae nulla enim. Est, excepturi mollitia! Assumenda quo similique quia earum tempora accusantium amet ad hic dignissimos, sunt quis placeat maiores, laborum in fuga laboriosam provident, consectetur iste nostrum? Quia debitis iure eius excepturi neque? Necessitatibus eveniet minus nulla distinctio illo itaque saepe blanditiis tempore. Ratione debitis necessitatibus blanditiis quae suscipit. Nulla esse facilis quisquam ipsam iusto dolor animi deserunt voluptatem laborum quae. Odit explicabo excepturi laboriosam mollitia autem quo repellendus ullam libero veniam aliquid expedita dolor eaque, consectetur similique ducimus voluptates cumque. Eaque esse pariatur dolore omnis veniam facilis, illo hic error ab eos, placeat unde ipsum nisi rem! Fugit magni consequatur dolorum nobis? Praesentium nihil, consequuntur eveniet quia ratione, libero asperiores sint explicabo dolorem obcaecati quidem! Voluptas explicabo exercitationem labore assumenda minima commodi debitis dicta quis quisquam quod dolorem saepe doloremque molestiae cum animi, non reiciendis deleniti ab, aut et sit iste facilis? Accusamus ex accusantium quod nobis repellat odit eius rerum voluptate ullam eos deserunt quibusdam reiciendis sit voluptas, vitae sapiente commodi? Dolorum ducimus numquam cupiditate sequi cumque alias dolores similique sed, neque dignissimos aliquid, debitis exercitationem magnam unde sunt expedita veritatis quasi maxime! Qui iure, molestias nulla aliquid dolores tempore enim magnam deleniti ullam natus consequatur eum officiis iste fugiat, similique commodi amet eveniet repellendus omnis blanditiis excepturi cupiditate temporibus eius et. Et, labore quis inventore eius sequi magnam unde maxime dolore dicta illum temporibus velit exercitationem praesentium consequuntur voluptatem iusto nesciunt corrupti quod consectetur! Rem dolorem iusto culpa iure ea, harum ducimus tenetur, unde sit quibusdam fugit, est aperiam consectetur veniam nostrum at necessitatibus? Unde possimus ab quam corporis veritatis!",
        open: false
    }
]

export const loader = async () => {
    const response = await fetch('/api/document');
    const livres = await response.json();
    return livres;
  }

export default function Livres() {
    const livresdefaut = useLoaderData() as Livre[];
    const [livres, setLivres] = React.useState<Livre[]>(livresdefaut);

    const open = (id: string) => {
        const newLivres = livres.map((livre : Livre) => {
            if (livre.id == id) {
                livre.open = !livre.open;
            }
            return livre;
        });

          setLivres(newLivres);
    }

    const deleteBook = async (e:any, author: string, id: string) => {
        e.preventDefault();
        await fetch(`/api/document/${author}/${id}`, {
            method: 'DELETE',
        });
        const newLivres = livres.filter(livre => livre.id != id);
        setLivres(newLivres);
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
                    <Grid item xs={1} >
                        <Button href="/add" variant="contained">
                            Ajouter
                        </Button>
                    </Grid>
                    {/* Books */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                            <Title>Livres</Title>
                            <List>
                                {
                                    livres.map(livre => (
                                        <ListItem key={livre.id}>
                                            <ListItemButton
                                                href={`/detail/${livre.author}/${livre.id}`}
                                                disabled = {livre.status === "In Progress"}
                                                key={livre.id} >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={livre.name}
                                                    secondary={livre.author}
                                                />
                                                {
                                                    livre.status == "In Progress" &&
                                                    <IconButton sx={{ ml: 4 }} edge="end" aria-label="supprimer">
                                                        <LoopIcon />
                                                    </IconButton>
                                                }
                                                <IconButton onClick={(e) => deleteBook(e, livre.author, livre.id)} sx={{ ml: 4 }} edge="end" aria-label="supprimer">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}