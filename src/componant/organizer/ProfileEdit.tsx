import React, { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete } from "@mui/material";
import useGetUser from "../../hook/useGetUser";
import { profileEdit } from "../../api/user";


interface FormData {
    name: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    pinCode: string;
    about: string;
    eventCategory: [];
    email: string;
    building: string;

}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    organizerData: any;
}



const ProfileEdit: React.FC<Props> = ({ isOpen, onClose, organizerData }) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phoneNumber: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        about: "",
        eventCategory: [],
        email: '',
        building: ''

    });
    const currentUser = useGetUser()

    useEffect(() => {
        if (organizerData) {
            const organizer = organizerData;
            const address = organizer.address[0];
            setFormData({
                name: organizer.name ? organizer.name : "",
                phoneNumber: organizer.phoneNumber ? organizer.phoneNumber : "",
                country: address?.country ? address.country : "",
                state: address?.state ? address.state : "", // Use optional chaining here
                city: address?.city ? address.city : "", // Use optional chaining here
                pinCode: address?.pincode ? address.pincode : "", // Use optional chaining here
                about: organizer.about ? organizer.about : "",
                eventCategory: organizer.category ? organizer.category : ["helloos","hiiiiii","nexttttt"],
                email: organizer.email ? organizer.email : "",
                building: address?.building ? address.building : "", // Use optional chaining here
            });
        }
    }, [organizerData]);



    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const getCountries = async () => {
            try {
                const result = await Country.getAllCountries();
                setCountries(result);
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            }
        };

        getCountries();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            if (formData.country) {
                try {
                    const result = await State.getStatesOfCountry(formData.country);
                    setStates(result);
                } catch (error) {
                    console.error('Failed to fetch states:', error);
                }
            }
        };

        getStates();
    }, [formData.country]);

    useEffect(() => {
        const getCities = async () => {
            try {
                if (formData.country && formData.state) {
                    const result = await City.getCitiesOfState(formData.country, formData.state);
                    setCities(result);
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };

        getCities();
    }, [formData.state, formData.country]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
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
        if (!formData.name.trim()) {
            validationErrors.name = "Name is required";
        } else if (!/^[a-zA-Z ]+$/.test(formData.name.trim())) {
            validationErrors.name = "Name must contain only letters and spaces";
        }
        if (!formData.pinCode) {
            validationErrors.pinCode = "Pin code is required";
        } else if (!/^\d{6}$/.test(formData.pinCode)) {
            validationErrors.pinCode = "Pin code must be 6 digits";
        }

        if (!formData.phoneNumber.trim()) {
            validationErrors.phoneNumber = "Phone Number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
            validationErrors.phoneNumber = "Phone Number must be 10 digits";
        }

        // Country validation
        if (!formData.country) {
            validationErrors.country = "Country is required";
        }

        // State validation
        if (!formData.state) {
            validationErrors.state = "State is required";
        }

        if (!formData.city) {
            validationErrors.city = "City is required";
        }

        if (!formData.about) {
            validationErrors.about = "About is required"
        }
        if (!formData.building) {
            validationErrors.building = "building is required"
        }
        if (!formData.email) {
            validationErrors.email = "Email is required"
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {

            console.log(" goign therec")
            const result = await profileEdit(currentUser?.id, formData)
            console.log(result)
            onClose()
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} className="">
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 5, width: 500, overflowY: 'auto', maxHeight: '90vh' }}>
                <form onSubmit={handleSubmit} className="">
                    <div className="flex gap-3 flex-col scroll-m-2  ">
                        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={(e) => handleChange(e as any)} />
                        {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                        <TextField fullWidth label="Email" name="email" value={formData.email} onChange={(e) => handleChange(e as any)} />
                        {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                        <TextField fullWidth label="About" name="about" value={formData.about} onChange={(e) => handleChange(e as any)} />
                        {errors.about && <FormHelperText error>{errors.about}</FormHelperText>}
                        <TextField fullWidth label="Pincode" name="pinCode" value={formData.pinCode} onChange={(e) => handleChange(e as any)} />
                        {errors.pinCode && <FormHelperText error>{errors.pinCode}</FormHelperText>}
                        <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => handleChange(e as any)} />
                        {errors.phoneNumber && <FormHelperText error>{errors.phoneNumber}</FormHelperText>}
                        <FormControl fullWidth error={!!errors.country}>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={(e) => handleChange(e as any)}
                            >
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={country.isoCode}>{country.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth error={!!errors.state}>
                            <InputLabel id="state-label">State</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={(e) => handleChange(e as any)}
                            >
                                {states.map((state, index) => (
                                    <MenuItem key={index} value={state.isoCode}>{state.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.state && <FormHelperText error>{errors.state}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth error={!!errors.city}>
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                                labelId="city-label"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={(e) => handleChange(e as any)}
                            >
                                {cities.map((city, index) => (
                                    <MenuItem key={index} value={city.name}>{city.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.city && <FormHelperText error>{errors.city}</FormHelperText>}
                        </FormControl>
                         

                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );

};

export default ProfileEdit;

