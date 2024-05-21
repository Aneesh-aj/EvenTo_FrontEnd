import React, { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete, Chip } from "@mui/material";
import useGetUser from "../../hook/useGetUser";
import CloseIcon from '@mui/icons-material/Close';
import {  AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { Allcategory, organizerProfileEdit } from "../../api/organizer";
import toast, { Toaster } from "react-hot-toast";

 styled('div')(
    ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
  font-size: 14px;
`,
);

  styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

styled('div')(
    ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}

function Tag(props: TagProps) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    );
}

 styled(Tag)<TagProps>(
    ({ theme }) => `
  display: flex;
  align-items: center;
  
  height: 24px;
  margin: 3px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#ffff'
        };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#ffff'};
  border-radius: 2px;

  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#FFFF'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

 styled('ul')(
    ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: relative;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);



interface FormData {
    name: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    pinCode: string;
    about: string;
    eventCategory: any[];
    email: string;
    building: string;

}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    organizerData: any;
}



const ProfileEdit: React.FC<Props> = ({ isOpen, onClose, organizerData }) => {
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        building: '',


    });
    const currentUser = useGetUser()



    useEffect(() => {

        if (organizerData) {
            async function fetchingCategory() {
                const fetchCategory = await Allcategory()
                console.log(" form the allcate", fetchCategory)
                setCategory(fetchCategory.category)
            }
            fetchingCategory()
            const organizer = organizerData;
            const address = organizer.address[0];
            setFormData({
                name: organizer.name ? organizer.name : "",
                phoneNumber: organizer.phoneNumber ? organizer.phoneNumber : "",
                country: address?.country ? address.country : "",
                state: address?.state ? address.state : "",
                city: address?.city ? address.city : "",
                pinCode: address?.pincode ? address.pincode : "",
                about: organizer.about ? organizer.about : "",
                eventCategory: organizer.category ? organizer.eventCategory : [],
                email: organizer.email ? organizer.email : "",
                building: address?.building ? address.building : "",
            });
        }
    }, [organizerData]);



    useEffect(() => {
        if (organizerData) {
            const selecCate = organizerData.eventCategory.map((ele: any) =>
                category.find((cat: any) => cat.category === ele.category)
            )
            console.log(" the selectrreddd first i", selecCate)
            setSelectedCategory(selecCate);
        }
    }, [organizerData, category]);


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
        console.log("the form data::::______________<<<", formData)
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
            formData.eventCategory =  selectedCategory
            const result = await organizerProfileEdit(currentUser?.id, formData)
             toast.success(result.message)
            console.log(result)

            onClose()
        }

    };
;

    return (
        <Modal open={isOpen} onClose={onClose} className="">
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 5, width: 500, overflowY: 'auto', maxHeight: '90vh' }}>
                <form onSubmit={handleSubmit} className="">
                    <div className="flex gap-3 flex-col scroll-m-2  ">
                    <Toaster position="top-right" reverseOrder={false}/> 
                        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={(e) => handleChange(e as any)} />
                        {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                        {/* <TextField fullWidth label="Email" name="email" value={formData.email} onChange={(e) => handleChange(e as any)} />
                        {errors.email && <FormHelperText error>{errors.email}</FormHelperText>} */}
                        <TextField fullWidth label="About" name="about" value={formData.about} onChange={(e) => handleChange(e as any)} />
                        {errors.about && <FormHelperText error>{errors.about}</FormHelperText>}
                        <TextField fullWidth label="Pincode" name="pinCode" value={formData.pinCode} onChange={(e) => handleChange(e as any)} />
                        {errors.pinCode && <FormHelperText error>{errors.pinCode}</FormHelperText>}
                        <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => handleChange(e as any)} />
                        {errors.phoneNumber && <FormHelperText error>{errors.phoneNumber}</FormHelperText>}

                        <div className="p-2">
                            <Autocomplete
                                multiple
                                fullWidth
                                value={selectedCategory}
                                onChange={(event, newValue: any) => {
                                    setSelectedCategory(newValue);
                                 
                                     handleChange(event as any)
                                }}
                                options={category}
                                getOptionLabel={(option: any) => option.category}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option: any, index) => (
                                        <Chip
                                            label={option.category}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Categories" placeholder="Select Categories" />
                                )}
                            />

                        </div>

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

