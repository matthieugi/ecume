import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material';

const useStyles = makeStyles({
  theme: {
    border: '1px solid #000',
  },
});

const classes = useStyles();

interface ThemesLivreProps {
  themes : string[],
};

export default function ThemesLivre(props: ThemesLivreProps) {
  const themes = props.themes;
  

  return (
    themes.map(theme => (
        <Typography  component="h2" variant="h6" color="primary" gutterBottom>
          {theme}
        </Typography>
      )
    )
  );
}
