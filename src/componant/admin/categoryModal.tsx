import { Box, Button, FormHelperText, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { editCategory } from "../../api/admin";


interface CategoryData{
    id:string,
    category:string
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    categoryData: any;
    onEditSuccess: (updatedCategories: any[]) => void;

}

export const CategoryModal:React.FC<Props> = ({isOpen,onClose,categoryData})=>{
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData,setFormdata] = useState<CategoryData>({
        id:"",
        category:""
    })


    useEffect(()=>{
       setFormdata({
          id:categoryData?.id,
          category:categoryData?.category
       })
    },[categoryData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors: { [key: string]: string } = {};
        
        if(!formData.category){
            validationErrors.category = "Please enter valid Name"
        }


        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {

            console.log(" goign therec")
            const result = await editCategory(formData?.id, formData.category)
            console.log(result)
            if(result.success ===false){
                validationErrors.category = result.message
            }
            else if(result.success === true){
                
                onClose()
            }else{

            }
        }
    };

    return(
        <>
        <Modal open={isOpen} onClose={onClose} className="">
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 5, width: 500, overflowY: 'auto', maxHeight: '90vh' }}>
                <form onSubmit={handleSubmit} className="">
                    <div className="flex gap-3 flex-col scroll-m-2  ">
                        <TextField fullWidth label="category" name="category" value={formData.category} onChange={(e) => handleChange(e as any)} />
                        {errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                </form>
            </Box>
        </Modal>
        </>
    )
}