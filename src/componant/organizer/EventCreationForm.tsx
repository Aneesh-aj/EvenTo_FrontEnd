import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
// import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import dayjs, { Dayjs } from 'dayjs';
// import * as yup from 'yup';
import { City, Country, State } from 'country-state-city';
// import { yupResolver } from '@hookform/resolvers/yup';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
;
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm } from 'react-hook-form';
// import { Controller, useForm } from 'react-hook-form';
// import { validateEmail } from '../../utils/validation';


interface Country {
    isoCode: string;
    name: string;
}

interface State {
    isoCode: string;
    name: string;
}

interface City {
    name: string;
}

type FormValues={
    name:string;
    email:string,
}


const EventCreationForm: React.FC = () => {

    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
    const [selectedState, setSelectedState] = useState<string | undefined>();
    const [selectedCity, setSelectedCity] = useState<string | undefined>();

  const forms = useForm<FormValues>({
     defaultValues:{
        name:"",
        email:"",
     }
  })
    
  const {register,handleSubmit,formState} = forms
  const {errors} = formState

  const onSubmit= (data:FormValues)=>{
       console.log(data)
  }

    useEffect(() => {
        const getCountries = async () => {
            const result: Country[] = await Country.getAllCountries();
            setCountries(result);
        };

        getCountries();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            if (selectedCountry) {
                const result: State[] = await State.getStatesOfCountry(selectedCountry);

                setStates(result);
            }
        };

        getStates();
    }, [selectedCountry]);

    useEffect(() => {
        const getCities = async () => {
            try {
                if (selectedCountry && selectedState) {
                    const result: City[] = await City.getCitiesOfState(selectedCountry, selectedState);
                    setCities(result);
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };

        getCities();
    }, [selectedState, selectedCountry]);




    // const [startTime, setStartTime] = useState(null);
    // const [endTime, setEndTime] = useState(null);
    return (
        <>
            <div className="w-full  bg-white border flex items-center flex-col shadow-md ">
                <h1 className=' m-6 w-full flex justify-center text-3xl font-extrabold'>Event Creation Form</h1>
                <div className="w-full flex justify-center ">
                    <Box component="form" sx={{ m: 1, width: '50%' }}>
                        <div className='w-full flex  justify-center p-3'>
                            <p> *provide information about the event</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} >

                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <TextField id="outlined-basic" sx={{ m: 1, width: '45%', display: 'flex' }}   label="Name" type='name' variant="outlined" {...register("name",{required:"Name is required"})} error={!errors.name} helperText={errors.name?.message}/>
                                <TextField id="outlined-basic" sx={{ m: 1, width: '45%', display: 'flex' }}  label="Email" type='email' variant="outlined" {...register("email",{required:"Email is required"})} error={!errors.email} helperText={errors.email?.message} />
                            </Box>
                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <TextField id="outlined-basic" sx={{ m: 1, width: '45%', display: 'flex' }} label="Phone" variant="outlined" />
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        label="Country" >
                                        {countries.map(({ isoCode, name }) => (
                                            <MenuItem key={isoCode} value={isoCode}>
                                                {name}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(e) => setSelectedState(e.target.value)}
                                        value={selectedState}
                                        label="State" >

                                        {states.map(({ isoCode, name }) => (
                                            <MenuItem key={isoCode} value={isoCode}>
                                                {name}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        label="City" >
                                        {cities.map(({ name }) => (
                                            <MenuItem key={name} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <div className='w-full flex  justify-center p-3'>
                                <p> *provide information about the event</p>
                            </div>
                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="City" >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="State" >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="City" >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id="outlined-basic" sx={{ m: 1, width: '45%', display: 'flex' }} label="location" variant="outlined" />
                            </Box>
                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="City" >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">Event Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="State" >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ width: "100%", paddingRight: '3.5rem' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} sx={{ margin: 2, width: '100%' }}>
                                        <DatePicker label="Basic date picker" sx={{ width: '100%', display: 'flex' }} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}   >
                                    <DemoContainer components={['TimePicker', 'TimePicker']} sx={{ margin: 2, paddingRight: 3 }} >

                                        <TimePicker sx={{ width: '50%', display: 'flex' }}
                                            label="Starting Time"
                                        //   value={value}
                                        //   onChange={(newValue) => setValue(newValue)}
                                        />
                                        <TimePicker sx={{ width: '50%', display: 'flex' }}
                                            label="Ending Time"
                                        //   value={value}
                                        //   onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">Event booking</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="City" >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} >
                                    <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="State" >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                <TextField id="outlined-basic" sx={{ m: 1, width: '100%', display: 'flex', marginRight: '3rem' }} label="Payment amount" variant="outlined" />
                            </Box>
                            <div className='w-full p-4'>
                                <button type='submit' className='w-[97%] py-3  font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center'>submit</button>
                            </div>

                        </form>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default EventCreationForm

// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { TextField, Button, Typography } from '@mui/material';
// import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver

// import * as yup from 'yup';

// const validationSchema = yup.object().shape({
//     name: yup.string().required('Name is required'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     age: yup.number().typeError('Age must be a number').positive('Age must be positive').integer('Age must be an integer').required('Age is required'),
// });

// const EventCreationForm = () => {
//     const { handleSubmit, control, formState: { errors } } = useForm({
//         resolver: yupResolver(validationSchema),
//     });

//     const onSubmit = (data:any) => {
//         console.log(data);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Controller
//                 name="name"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                     <TextField
//                         {...field}
//                         label="Name"
//                         error={Boolean(errors.name)}
//                         helperText={errors.name ? errors.name.message : ''}
//                     />
//                 )}
//             />
//             <Controller
//                 name="email"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                     <TextField
//                         {...field}
//                         label="Email"
//                         error={Boolean(errors.email)}
//                         helperText={errors.email ? errors.email.message : ''}
//                     />
//                 )}
//             />
//             <Controller
//                 name="age"
//                 control={control}

//                 render={({ field }) => (
//                     <TextField
//                         {...field}
//                         label="Age"
//                         type="number"
//                         error={Boolean(errors.age)}
//                         helperText={errors.age ? errors.age.message : ''}
//                     />
//                 )}
//             />
//             <Button type="submit">Submit</Button>
//         </form>
//     );
// };

// export default EventCreationForm;

