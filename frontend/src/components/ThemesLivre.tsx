import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';


const ThemeKeyword = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '4px',
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
}));

interface ThemesLivreProps {
  themes : string[],
};

export default function ThemesLivre(props: ThemesLivreProps) {
  const themes = props.themes;
  

  return (
    themes.map(theme => (
        <ThemeKeyword color="primary" gutterBottom>
          {theme}
        </ThemeKeyword>
      )
    )
  );
}
