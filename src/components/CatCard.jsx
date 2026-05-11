import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function CardIllustration() {
  return (
    <Box sx={{
      bgcolor: '#FFCDB2',
      mx: 1.5,
      borderRadius: '10px',
      height: 150,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg width="160" height="120" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="12" width="44" height="44" rx="10" fill="#7D5147" />
        <path d="M118 14 C120 14 122 18 124 21 C128 20 132 21 134 24 C138 26 138 30 135 33 C138 36 138 40 134 42 C132 45 128 46 124 45 C122 48 120 52 118 52 C116 52 114 48 112 45 C108 46 104 45 102 42 C98 40 98 36 101 33 C98 30 98 26 102 24 C104 21 108 20 112 21 C114 18 116 14 118 14 Z" fill="#7D5147" />
        <path d="M80 104 C80 104 62 88 62 74 C62 66 68 61 75 64 C78 66 79 68 80 70 C81 68 82 66 85 64 C92 61 98 66 98 74 C98 88 80 104 80 104 Z" fill="#7D5147" />
      </svg>
    </Box>
  );
}

function CatCard({ header, subhead, title, subtitle, text }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text && text.length > 55;

  return (
    <Card sx={{
      bgcolor: '#FFE4D6',
      borderRadius: '16px',
      boxShadow: 'none',
      border: 'none',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#FFCDB2', width: 36, height: 36 }} />}
        action={<IconButton sx={{ color: '#7D5147' }}><MoreVertIcon /></IconButton>}
        title={<Typography variant="body2" sx={{ color: '#3E2723' }}>{header}</Typography>}
        subheader={<Typography variant="body2" sx={{ fontWeight: 'bold', color: '#3E2723' }}>{subhead}</Typography>}
        sx={{ pb: 0, flexShrink: 0 }}
      />

      <CardIllustration />

      <CardContent sx={{ flexGrow: 1, pt: 1.5, pb: 0, overflow: 'hidden' }}>
        <Typography variant="body1" sx={{ color: '#3E2723' }}>{title}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#3E2723', mb: 0.5 }}>{subtitle}</Typography>

        <Typography variant="body2" sx={{ color: '#6D4C41' }}>
          {expanded || !isLong ? text : text.slice(0, 55) + '...'}
        </Typography>

        {isLong && (
          <Typography variant="caption" onClick={() => setExpanded(p => !p)} sx={{
            color: '#7D5147', cursor: 'pointer', fontWeight: 'bold', mt: 0.5, display: 'block',
          }}>
            {expanded ? 'Скрыть' : 'Ещё...'}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2, pt: 1, flexShrink: 0 }}>
        <Button variant="outlined" size="small" sx={{
          borderRadius: '20px', borderColor: '#7D5147', color: '#3E2723',
          textTransform: 'none',
          '&:hover': { borderColor: '#3E2723', bgcolor: 'transparent' },
        }}>
          Secondary
        </Button>
        <Button variant="contained" size="small" sx={{
          borderRadius: '20px', bgcolor: '#FFCDB2', color: '#fff',
          boxShadow: 'none', textTransform: 'none',
          '&:hover': { bgcolor: '#f5bda0', boxShadow: 'none' },
        }}>
          Primary
        </Button>
      </CardActions>
    </Card>
  );
}

export default CatCard;