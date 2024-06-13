import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { eventPostImageUploead } from "../../survices/firebase/uploadImage";
import {  postUpdate } from "../../api/organizer";
import toast, { Toaster } from "react-hot-toast";
import { post } from "../../@types/post";
import CloseIcon from '@mui/icons-material/Close';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    postData: any;
}

export const PostEditModal: React.FC<Props> = ({ isOpen, onClose, postData }) => {
console.log(" post idss ",postData.postId);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading,setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<post>({
        defaultValues: {
            organizerId:postData.organizerId,
            postImage: postData.postImage,
            description: postData.description,

            
        }
    });
    
    useEffect(() => {
        if (postData) {
            setValue("organizerId", postData.organizerId);
            setValue("postImage", postData.postImage);
            setValue("description", postData.description);
           
        }
    }, [postData, setValue]);
    // setSelectedFile(postData.postImage)

    const onSubmit = async (data: post) => {
        try {
            setLoading(true)
            if (selectedFile) {
                const url = await eventPostImageUploead(selectedFile);
                data.postImage = url;
            }

            console.log(" the data -----------",data)
            const created = await postUpdate(postData.postId,data);
            if (created.success) {
                toast.success(created.message);
                setLoading(false)
                onClose();
            } else {
                setLoading(false)
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
            <Modal open={isOpen} onClose={onClose}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24,borderRadius:'5px', p: 5, width: 600, overflowY: 'auto', maxHeight: '90vh' }}>
                    <Toaster />
                    <div className="w-full p-4 flex justify-end">
                        <CloseIcon onClick={onClose}></CloseIcon>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex justify-center p-3">
                            <h1 className="font-bold">Event Posting Edit</h1>
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
                            <img src={postData.postImage} alt="Selected" style={{ width: '100%', height:'12rem', marginTop: '10px' }} />
                        </div>}
                        <div className="w-full h-10 m-1 p-1">
                            {
                                loading ? <Button disabled className="w-full m-1 bg-blue-300" variant="contained" color="primary"  type="submit">Loading</Button>:<Button className="w-full m-1" variant="contained" color="primary" type="submit">Submit</Button>
                            }
                        </div>
                        
                    </div>
                </Box>
            </Modal>
        </>
    );
};
