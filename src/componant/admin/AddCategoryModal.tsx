// src/componant/admin/AddCategoryModal.tsx

import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { addCategory } from '../../api/admin';
import toast from 'react-hot-toast';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSuccess: (newCategory: any) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAddSuccess }) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleAddCategory = async () => {
        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }
        setError(null);

        const response = await addCategory(categoryName);
        console.log(" categoey added",response)
        if (response.success) {
            toast.success(" category added!!")
            onAddSuccess(response.category);
            onClose();
        } else {
            setError(response.message || 'Failed to add category');
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Add New Category
                </Typography>
                <TextField
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    fullWidth
                    error={!!error}
                    helperText={error}
                    sx={{ mt: 2 }}
                />
                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddCategory}
                        sx={{ mr: 2 }}
                    >
                        Add
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddCategoryModal;

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};
