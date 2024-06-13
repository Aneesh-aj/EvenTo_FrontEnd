import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IeventPost } from "../../@types/eventType";
import { eventPostImageUploead } from "../../survices/firebase/uploadImage";
import {  updatePost } from "../../api/organizer";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    formData: any;
}

export const EventPostEdit: React.FC<Props> = ({ isOpen, onClose, formData }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IeventPost>({
        defaultValues: {
            _id:formData.postId,
            eventId: formData.eventId,
            organizerId: formData.organizerId,
            title: formData.title || "",
            subTitle: formData.subTitle || "",
            seatArrangment: formData.seatArrangment,
            image: formData.image || "",
            about: formData.about || "",
            entryFormId: formData.entryFormId || "",
        }
    });

    console.log(" --------------------the form data-------------------------",formData)

    useEffect(() => {
        setValue("eventId", formData.eventId);
        setValue("organizerId", formData.organizerId);
        setValue("seatArrangment", formData.seatArrangment);
        setValue("title", formData.title);
   
        setValue("image", formData.image);
        setValue("about", formData.about);
     
    }, [formData, setValue]);

    const onSubmit = async (data: IeventPost) => {
        try {
            if (selectedFile) {
                const url = await eventPostImageUploead(selectedFile);
                data.image = url;
            }
            const created = await updatePost(data,formData.postId);
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
            <Modal open={isOpen} onClose={onClose}>
                <Box component="form" className="w-[80%] xl:w-[40%]" onSubmit={handleSubmit(onSubmit)} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 5, overflowY: 'auto', maxHeight: '90vh',borderRadius:'3px' }}>
                    <Toaster />
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex justify-center p-3">
                            <h1 className="font-bold">Event Posting Details</h1>
                        </div>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            {...register("title", { required: "Title is required" })}
                            error={Boolean(errors.title)}
                            helperText={errors.title && errors.title.message}
                        />
                        <TextField
                            label="About"
                            variant="outlined"
                            fullWidth
                            {...register("about", { required: "About is required" })}
                            error={Boolean(errors.about)}
                            helperText={errors.about && errors.about.message}
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
                                <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ width: '100%', height:'12rem', marginTop: '10px' }} />
                            </div>
                        ):<div>
                        <img src={formData.image} alt="Selected" style={{ width: '100%', height:'12rem', marginTop: '10px' }} />
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
