import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IeventPost } from "../../@types/eventType";
import { eventPostImageUploead } from "../../survices/firebase/uploadImage";
import { createPost, postCreation, updatePost } from "../../api/organizer";
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
import { post } from "../../@types/post";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    organizerId: any;
}

export const PostAddModal: React.FC<Props> = ({ isOpen, onClose, organizerId }) => {
    console.log(" id ", organizerId);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<post>({
        defaultValues: {
            organizerId: organizerId,
            postImage: "",
            description: "",

        }
    });

    const onSubmit = async (data: post) => {
        try {
            if (selectedFile) {
                const url = await eventPostImageUploead(selectedFile);
                data.postImage = url;
            }

            console.log(" the data -----------", data)
            const created = await postCreation(data);
            if (created.success) {
                toast.success(created.message);
                onClose();
            } else {
                toast.error(created.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while creating the post.");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <>
            <Modal open={isOpen} onClose={onClose} sx={{borderRadius:'5px',}}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ position: "absolute", borderRadius:'5px',top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 5, width: 600, overflowY: 'auto', maxHeight: '90vh' }}>
                    <Toaster />
                    <div className="w-full p-4 flex justify-end">
                        <CloseIcon onClick={onClose}></CloseIcon>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex justify-center ">
                            <h1 className="font-bold">Post Creation</h1>
                        </div>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            {...register("description", { required: "Title is required" })}
                            error={Boolean(errors.description)}
                            helperText={errors.description && errors.description.message}
                        />
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span">
                                Upload Image
                            </Button>
                        </label>
                        {selectedFile ? (
                            <div className="border-2 rounded-md">
                                <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ width: '100%', height: '12rem', marginTop: '10px' }} />
                            </div>
                        ) : <div>

                        </div>}
                        <div className="w-full h-10 m-1 p-1">
                            <Button className="w-full m-1" variant="contained" color="primary" type="submit">Submit</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};
