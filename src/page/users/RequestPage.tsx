import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, colors } from '@mui/material';
import Box from '@mui/material/Box';
import { City, Country, State } from 'country-state-city';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { createEvent, getCategory } from '../../api/organizer';
import useGetUser from '../../hook/useGetUser';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { eventFormData } from '../../@types/eventType';
import { setEvent } from '../../redux/eventSlice';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import toast, { Toaster } from 'react-hot-toast';
import { sentRequest } from '../../api/user';

dayjs.extend(utc);
dayjs.extend(timezone);

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

type FormValues = {
    name: string;
    email: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    eventCountry: string;
    eventState: string;
    eventCity: string;
    location: string;
    eventType: string;
    eventCategory: string;
    date: Date | null,
    startingTime: Date | null;
    endingTime: Date | null;
    eventBooking: string;
    paymentMethod: string;
    paymentAmount: string;
    seatNumber: number;
    seatArrangement: Seat[],
    organizerId: string,
    userId: string,
    about: string,
    totalAmount: number
}
interface Seat {
    row: string; // Change row type to string for alphabet letters
    column: number;
    booked: boolean;
    selected: boolean;
}


const RequestPage: React.FC = () => {

    const currentUser = useGetUser()
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
    const [selectedState, setSelectedState] = useState<string | undefined>();
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const [booking, setBooking] = useState<boolean>()
    const [formPart, setFormPart] = useState<boolean>(true)
    const [seatPart, setSeatPart] = useState<boolean>(false)
    const [eventCountry, setEventCountry] = useState<string | undefined>()
    const [eventState, setEventState] = useState<string | undefined>()
    const [eventCity, setEventCity] = useState<string | undefined>()
    const [eventType, setEventType] = useState<boolean>()
    const [eventCitys, setEventCitys] = useState<City[]>([])
    const [eventStates, setEventStates] = useState<State[]>([]);
    const [eventCountrys, setEventCountys] = useState<Country[]>([]);
    const [payment, setPayment] = useState<boolean>(false)
    const [category, setCategory] = useState([])
    useSelector((states: eventFormData) => states)
    const navigate = useNavigate()
    const { id } = useParams()


    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            country: '',
            state: '',
            city: '',
            eventCountry: '',
            eventState: '',
            eventCity: "",
            location: "",
            eventType: "",
            eventCategory: "",
            date: null,
            startingTime: null,
            endingTime: null,
            eventBooking: "",
            paymentMethod: "",
            paymentAmount: "",
            seatNumber: undefined,
            seatArrangement: [],
            organizerId: id,
            about: '',
            userId: currentUser.id,
            totalAmount: undefined

        }
    });




    const onSubmit = async (data: FormValues) => {

        console.log("and the dataa-----------------------  ", data.seatArrangement)
        console.log(" the data from the form", data)

        setValue('organizerId', currentUser.id)
        const date = dayjs(data.date);
        let startTime = dayjs(data.startingTime);
        let endTime = dayjs(data.endingTime);

        startTime = startTime.set('date', date.date());
        if (endTime.isBefore(startTime)) {
            endTime = endTime.set('date', date.date());
            if (endTime.isBefore(startTime)) {
                endTime = endTime.add(1, 'day');
            }
        }
        const startDate = date.toDate();
        const startingTime = startTime.toDate();
        const endingTime = endTime.toDate();

        setValue('date', startDate);
        setValue('startingTime', startingTime);
        setValue('endingTime', endingTime);

        data.date = startDate
        data.startingTime = startingTime,
            data.endingTime = endingTime

        //    console.log(" ---------final----------",data)
        const response = await sentRequest(data)
        console.log(" the resposne ss", response)
        if (response.success == true) {

            toast.success(response.message)
            setTimeout(() => {
                navigate('/user/booking')
            }, 2000)
        }


    };

    useEffect(() => {
        const getCountries = async () => {
            const result: Country[] = await Country.getAllCountries();
            const getCategorys = await getCategory(id as string)
            console.log(" the getting categorysss", getCategorys)
            setCategory(getCategorys.category)
            setCountries(result);
            setEventCountys(result)
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
                if (eventCountry && eventState) {
                    const result: City[] = await City.getCitiesOfState(eventCountry, eventState);
                    setCities(result);
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };

        getCities();
    }, [selectedState, selectedCountry, eventState, eventCountry]);

    useEffect(() => {
        const getEventCities = async () => {
            try {

                if (eventCountry && eventState) {
                    const result: City[] = await City.getCitiesOfState(eventCountry, eventState);
                    setEventCitys(result);
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };

        getEventCities();
    }, [eventState, eventCountry]);


    useEffect(() => {
        const getEventStates = async () => {

            if (eventCountry) {
                const result: State[] = await State.getStatesOfCountry(eventCountry)
                setEventStates(result)
            }
        };

        getEventStates();
    }, [selectedCountry, eventCountry]);

    function seatArranging(seat: Seat[]) {
        setValue('seatArrangement', seat)

        handleSubmit(onSubmit)
    }

    return (
        <>
            <div className="w-full  bg-white border flex items-center flex-col shadow-md ">
                <h1 className=' m-6 w-full flex justify-center text-3xl font-extrabold'>Request Form</h1>
                <div className="w-full flex justify-center ">
                    <Toaster position='top-center'></Toaster>
                    <Box component="form" sx={{ m: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-[100%]  flex items-center flex-col justify-center'>

                            <div className='w-full  xl:w-[50%] flex  justify-center p-3'>
                                <p> *provide user information</p>
                            </div>

                            <div className='w-full  xl:w-[50%]'>
                                <Box sx={{ m: 1, width: '100%', display: 'flex', }}>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{ m: 1, width: '45%', display: 'flex' }}
                                        label="Name"
                                        type='name'
                                        variant="outlined"
                                        {...register("name", { required: "Name is required" })}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name && errors.name.message}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        sx={{ m: 1, width: '45%', display: 'flex' }}
                                        label="Email"
                                        type='email'
                                        variant="outlined"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Invalid email format."
                                            }
                                        })}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email && errors.email.message}
                                    />
                                </Box>
                                <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                    <TextField id="outlined-basic" sx={{ m: 1, width: '45%', display: 'flex' }} label="Phone" variant="outlined"
                                        {...register("phoneNumber", {
                                            required: "PhoneNumber required",
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message: "Phone number should be 10 numbers"
                                            }
                                        })}
                                        error={Boolean(errors.phoneNumber)}
                                        helperText={errors.phoneNumber && errors.phoneNumber.message}
                                    />
                                    <FormControl error={Boolean(errors.country)} sx={{ m: 1, width: '45%', display: 'flex' }}>
                                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Country"
                                            {...register("country", { required: "Please select a country" })}
                                            onChange={(e) => {
                                                setSelectedCountry(e.target.value);
                                                trigger("country"); // Manually trigger validation for the country field
                                            }}
                                            value={selectedCountry}
                                        >
                                            {countries.map(({ isoCode, name }) => (
                                                <MenuItem key={isoCode} value={isoCode}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                    <FormControl error={Boolean(errors.state)} sx={{ m: 1, width: '45%', display: 'flex' }} >
                                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("state", { required: "Please Select a State" })}
                                            onChange={(e) => {
                                                setSelectedState(e.target.value)
                                                trigger("state")
                                            }}
                                            label="State"
                                            value={selectedState}  >

                                            {states.map(({ isoCode, name }) => (
                                                <MenuItem key={isoCode} value={isoCode}>
                                                    {name}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                        {errors.state && <FormHelperText>{errors.state.message}</FormHelperText>}

                                    </FormControl>
                                    <FormControl error={Boolean(errors.state)} sx={{ m: 1, width: '45%', display: 'flex' }} >
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("city", { required: "Please Select a City" })}
                                            onChange={(e) => {
                                                setSelectedCity(e.target.value)
                                                trigger("city")
                                            }}
                                            label="City"
                                            value={selectedCity}

                                        >
                                            {cities.map(({ name }) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.city && <FormHelperText>{errors.city.message}</FormHelperText>}
                                    </FormControl>
                                </Box>
                                <div className='w-[100%] flex  justify-center p-3'>
                                    <p> *provide information about the event</p>
                                </div>
                                <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                    <FormControl error={Boolean(errors.eventCountry)} sx={{ m: 1, width: '45%', display: 'flex' }}>
                                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Country"
                                            {...register("eventCountry", { required: "Please select a country" })}
                                            onChange={(e) => {
                                                setEventCountry(e.target.value);
                                                trigger("eventCountry"); // Manually trigger validation for the country field
                                            }}
                                            value={selectedCountry}
                                        >
                                            {eventCountrys.map(({ isoCode, name }) => (
                                                <MenuItem key={isoCode} value={isoCode}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.eventCountry && <FormHelperText>{errors.eventCountry.message}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error={Boolean(errors.eventState)} sx={{ m: 1, width: '45%', display: 'flex' }} >
                                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("eventState", { required: "Please Select a State" })}
                                            onChange={(e) => {
                                                setEventState(e.target.value)
                                                trigger("eventState")
                                            }}
                                            label="State"
                                            value={selectedState}  >

                                            {eventStates.map(({ isoCode, name }) => (
                                                <MenuItem key={isoCode} value={isoCode}>
                                                    {name}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                        {errors.eventState && <FormHelperText>{errors.eventState.message}</FormHelperText>}

                                    </FormControl>
                                </Box>
                                <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                    <FormControl error={Boolean(errors.eventCity)} sx={{ m: 1, width: '45%', display: 'flex' }} >
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("eventCity", { required: "Please Select a City" })}
                                            onChange={(e) => {
                                                setEventCity(e.target.value)
                                                trigger("eventCity")
                                            }}
                                            label="City"
                                            value={selectedCity}

                                        >
                                            {eventCitys.map(({ name }) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.eventCity && <FormHelperText>{errors.eventCity.message}</FormHelperText>}
                                    </FormControl>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{ m: 1, width: '45%', display: 'flex' }}
                                        label="Location"
                                        type='location'
                                        variant="outlined"
                                        {...register("location", { required: "location is required" })}
                                        error={Boolean(errors.location)}
                                        helperText={errors.location && errors.location.message}
                                    />
                                </Box>
                                <Box sx={{ m: 1, width: '100%', display: 'flex', }}>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{ m: 1, width: '100%', display: 'flex', marginRight: '3rem' }}
                                        label="About"
                                        type=''

                                        variant="outlined"
                                        {...register("about", { required: "about is required" })}
                                        error={Boolean(errors.about)}
                                        helperText={errors.about && errors.about.message}
                                    />

                                </Box>
                                <Box sx={{ m: 1, width: '100%' }}>

                                    <InputLabel id="demo-simple-select-label" className='ms-2'>Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker sx={{ width: '92%', marginLeft: 1 }}
                                            {...register("date", { required: "Date is required" })}
                                            disablePast
                                            onChange={(newValue: any) => setValue('date', newValue)} // Set value manually
                                        />
                                    </LocalizationProvider>

                                    {errors.date && (
                                        <FormHelperText className='ps-4' error>{errors.date.message}</FormHelperText>
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', gap: 4, width: '100%' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Box sx={{ width: '45%' }}>
                                            <DemoContainer components={['TimePicker', 'TimePicker']} sx={{ margin: 2, width: '100%' }}>
                                                <TimePicker
                                                    sx={{ width: '100%', display: 'flex' }}
                                                    label="Start"
                                                    {...register('startingTime', { required: "Select Starting time " })}
                                                    onChange={(newValue: any) => setValue('startingTime', newValue)} // Set value manually
                                                />

                                            </DemoContainer>
                                            {errors.startingTime && (
                                                <FormHelperText className='ps-5' error>{errors.startingTime.message}</FormHelperText>
                                            )}
                                        </Box>
                                        <Box sx={{ width: '45%' }}>

                                            <DemoContainer components={['TimePicker', 'TimePicker']} sx={{ margin: 2, marginLeft: 0, marginRight: 5, width: '100%' }}>

                                                <TimePicker
                                                    sx={{ width: '100%', display: 'flex' }}
                                                    label="End"
                                                    {...register('endingTime', { required: "Select Ending time" })}
                                                    onChange={(newValue: any) => setValue('endingTime', newValue)}
                                                />

                                            </DemoContainer>
                                            {errors.endingTime && (
                                                <FormHelperText className='ps-2' error>{errors.endingTime.message}</FormHelperText>
                                            )}
                                        </Box>

                                    </LocalizationProvider>
                                </Box>
                                <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                    <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} error={Boolean(errors.eventType)} >
                                        <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("eventType", { required: "Select EventType" })}
                                            onChange={(e) => { e.target.value == "Private" ? setEventType(false) : setEventType(true) }}
                                            label="evenType" >
                                            <MenuItem value={"Public"}>Public</MenuItem>
                                            <MenuItem value={"Private"}>Private</MenuItem>

                                        </Select>
                                        {errors.eventType && (
                                            <FormHelperText error>{errors.eventType.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} error={Boolean(errors.eventCategory)}  >
                                        <InputLabel id="demo-simple-select-label">EventCategory</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("eventCategory", { required: "Select Event Category" })}

                                            label="eventCategory" >
                                            {
                                                category && category.map((ele: any) => {
                                                    return (
                                                        <MenuItem value={ele}>{ele.category}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        {errors.eventCategory && (
                                            <FormHelperText error>{errors.eventCategory.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                    <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} error={Boolean(errors.eventBooking)} >
                                        <InputLabel id="demo-simple-select-label">Event booking</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("eventBooking", { required: "Select BookingType" })}
                                            onChange={(e) => { e.target.value == "Registration" ? setBooking(true) : setBooking(false) }}
                                            label="eventBooking" >
                                            <MenuItem value={"SeatArrangment"}>SeatArrangment</MenuItem>
                                            <MenuItem value={"Registration"}>Registration</MenuItem>

                                        </Select>
                                        {errors.eventBooking && (
                                            <FormHelperText error>{errors.eventBooking.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} error={Boolean(errors.paymentMethod)}  >
                                        <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("paymentMethod", { required: "Select Payment Method" })}
                                            onChange={(e) => { e.target.value != "Free" ? setPayment(true) : setPayment(false) }}
                                            label="paymentMethod" >
                                            <MenuItem value={"Online"}>Online</MenuItem>
                                            <MenuItem value={"Offline"}>Offline</MenuItem>
                                            <MenuItem value={"Free"}>Free</MenuItem>
                                        </Select>
                                        {errors.paymentMethod && (
                                            <FormHelperText error>{errors.paymentMethod.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                                {
                                    booking && <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                        <FormControl error={Boolean(errors.seatNumber)} className='w-[92%]'>

                                            <TextField id="outlined-basic"
                                                sx={{ m: 1, width: '100%', display: 'flex', marginRight: '3rem' }}
                                                label="seatNumber" variant="outlined"
                                                {...register("seatNumber", { required: "Seat Limit is required" })} />
                                            {errors.seatNumber && (
                                                <FormHelperText error>{errors.seatNumber.message}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                }
                                {
                                    payment && <Box sx={{ m: 1, width: '100%', display: 'flex' }}>
                                        <FormControl error={Boolean(errors.paymentAmount)} className='w-[92%]'>

                                            <TextField id="outlined-basic"
                                                sx={{ m: 1, width: '100%', display: 'flex', marginRight: '3rem' }}
                                                label="PaymentAmount" variant="outlined"
                                                type='number'
                                                {...register("paymentAmount", { required: "Amount for each seat is required" })} />
                                            {errors.paymentAmount && (
                                                <FormHelperText error>{errors.paymentAmount.message}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                }
                                <Box sx={{ m: 1, width: '100%', display: 'flex', }}>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{ m: 1, width: '100%', display: 'flex', marginRight: '3rem' }}
                                        label="TotalAmount"
                                        type='number'

                                        variant="outlined"
                                        {...register("totalAmount", { required: "Total Amount is required" })}
                                        error={Boolean(errors.totalAmount)}
                                        helperText={errors.totalAmount && errors.totalAmount.message}
                                    />

                                </Box>
                                <div className='w-[100%] p-4'>
                                    <button type='submit' className='w-[97%] py-3  font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center'>submit</button>
                                </div>
                            </div>

                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default RequestPage


