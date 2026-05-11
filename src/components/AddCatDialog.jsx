import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function AddCatDialog({ open, onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', subtitle: '', text: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim())    newErrors.title    = 'Enter a title';
    if (!form.subtitle.trim()) newErrors.subtitle = 'Enter a subtitle';
    if (!form.text.trim())     newErrors.text     = 'Enter a description';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd({
      id: Date.now(),
      header: form.title,
      subhead: form.subtitle,
      title: form.title,
      subtitle: form.subtitle,
      text: form.text,
    });
    setForm({ title: '', subtitle: '', text: '' });
    setErrors({});
  };

  const handleCancel = () => {
    setForm({ title: '', subtitle: '', text: '' });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          bgcolor: '#FFE4D6',
          p: 1,
          minWidth: 300,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        },
      }}
    >
      <DialogTitle sx={{ color: '#1a1a1a', fontWeight: 'bold', pb: 0 }}>
        Add cards
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1.5 }}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            size="small"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            label="Subtitle"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            error={!!errors.subtitle}
            helperText={errors.subtitle}
            fullWidth
            size="small"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            label="Text"
            name="text"
            value={form.text}
            onChange={handleChange}
            error={!!errors.text}
            helperText={errors.text}
            fullWidth
            size="small"
            multiline
            rows={2}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{
            borderRadius: '20px',
            borderColor: '#7D5147',
            color: '#3E2723',
            textTransform: 'none',
            px: 2.5,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: '20px',
            bgcolor: '#FFCDB2',
            color: '#fff',
            boxShadow: 'none',
            textTransform: 'none',
            px: 2.5,
            '&:hover': { bgcolor: '#f5bda0', boxShadow: 'none' },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCatDialog;