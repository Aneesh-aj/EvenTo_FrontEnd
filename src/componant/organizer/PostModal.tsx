import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IeventPost } from "../../@types/eventType";
import { eventPostImageUploead } from "../../survices/firebase/uploadImage";
import { createPost } from "../../api/organizer";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    formData: any;
}

export const PostModal: React.FC<Props> = ({ isOpen, onClose, formData }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IeventPost>({
        defaultValues: {
            eventId: formData.eventId,
            organizerId: formData.organizerId,
            title: "",
            subTitle: "",
            seatArrangment: formData.seatArrangment,
            image: "",
            about: "",
            entryFormId: "",
        }
    });

    useEffect(() => {
        setValue("eventId", formData.eventId);
        setValue("organizerId", formData.organizerId);
        setValue("seatArrangment", formData.seatArrangment);
    }, [formData, setValue]);

    async function onSubmit(data: IeventPost) {
        try {
            if (data.image) {
                const created = await createPost(data);
                if (created.success) {
                    toast.success(created.message);
                    onClose();
                } else {
                    toast.error(created.message);
                }
            } else {
                toast.error("Image upload failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create post.");
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            try {
                const url = await eventPostImageUploead(event.target.files[0]);
                setValue('image', url);
                toast.success("Image uploaded successfully.");
            } catch (error) {
                console.error(error);
                toast.error("Image upload failed.");
            }
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 5, width: 600, overflowY: 'auto', maxHeight: '90vh' }}>
                    <Toaster />
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex justify-center p-3">
                            <h1 className="font-bold">Event Posting Details</h1>
                        </div>
                        <TextField
                            id="outlined-basic"
                            sx={{ m: 1, width: '100%', display: 'flex' }}
                            label="Title"
                            variant="outlined"
                            {...register("title", { required: "Title is required" })}
                            error={Boolean(errors.title)}
                            helperText={errors.title && errors.title.message}
                        />
                        <TextField
                            id="outlined-basic"
                            sx={{ m: 1, width: '100%', display: 'flex' }}
                            label="Second Title"
                            variant="outlined"
                            {...register("subTitle", { required: "Second Title is required" })}
                            error={Boolean(errors.subTitle)}
                            helperText={errors.subTitle && errors.subTitle.message}
                        />
                        <TextField
                            id="outlined-basic"
                            sx={{ m: 1, width: '100%', display: 'flex' }}
                            label="About"
                            variant="outlined"
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
                        {selectedFile === null && (
                            <p style={{ color: "red" }}>Please select a file.</p>
                        )}
                        <div className="w-full h-10 m-1 p-1">
                            <Button className="w-full m-1" variant="contained" color="primary" type="submit">Submit</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};
