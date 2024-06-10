import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { City, Country, State } from 'country-state-city';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import {  getCategory, geteventDetails, updateEvent } from '../../api/organizer';
import useGetUser from '../../hook/useGetUser';
import {  useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { eventFormData } from '../../@types/eventType';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import toast, { Toaster } from 'react-hot-toast';


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
    eventCategory: object;
    date: Dayjs | Date | null,
    startingTime: Dayjs | Date | null;
    endingTime: Dayjs | Date | null;
    eventBooking: string;
    paymentMethod: string;
    paymentAmount: string;
    seatNumber: number;
    seatArrangement: Seat[],
    organizerId: string,
    totalAmount: number
}
interface Seat {
    row: string; // Change row type to string for alphabet letters
    column: number;
    booked: boolean;
    selected: boolean;
}


const EventEdit: React.FC = () => {

    const currentUser = useGetUser()
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
    const [selectedState, setSelectedState] = useState<string | undefined>();
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const [booking, setBooking] = useState<boolean>()
    const [formPart, setFormPart] = useState<boolean>(true)
    const [eventCountry, setEventCountry] = useState<string | undefined>()
    const [eventState, setEventState] = useState<string | undefined>()
    const [eventCity, setEventCity] = useState<string | undefined>()
    const [eventType, setEventType] = useState<boolean>()
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [startingTime, setStartingTime] = useState<Dayjs | null>(null)
    const [endingTime, setEndingTime] = useState<Dayjs | null>(null)

    const [eventCitys, setEventCitys] = useState<City[]>([])
    const [eventStates, setEventStates] = useState<State[]>([]);
    const [eventCountrys, setEventCountys] = useState<Country[]>([]);
    const [payment, setPayment] = useState<boolean>(false)
    const [category, setCategory] = useState([])
    const [currentEvent, setCurrentEvent] = useState<any>([])
    useSelector((states: eventFormData) => states)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetching() {
            const events = await geteventDetails(id as string)
            setCurrentEvent(events.details.event)
        }
        fetching()
    }, [])



    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm<FormValues>({
        defaultValues: {
            name: currentEvent?.name || '',
            email: currentEvent?.email || '',
            phoneNumber: currentEvent?.phoneNumber || '',
            country: currentEvent?.country || '',
            state: currentEvent?.state || '',
            city: currentEvent?.city || '',
            eventCountry: '',
            eventState: '',
            eventCity: "",
            location: "",
            eventType: "",
            eventCategory: undefined,
            date: null,
            startingTime: null,
            endingTime: null,
            eventBooking: "",
            paymentMethod: "",
            paymentAmount: "",
            seatNumber: undefined,
            seatArrangement: [],
            organizerId: currentUser.id,
            totalAmount: undefined

        }
    });

    const onSubmit = async (data: FormValues) => {

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

        const response = await updateEvent(data, id as string)
        if (response.event.success == true) {
         
            // window.location.reload()
            navigate(`/organizer/events/${currentUser.id}`)
            toast.success(response.event.message)
        }else{
            toast.success(response.event.message)
        }
        // }

    };
    useEffect(() => {
        if (currentEvent) {
            setSelectedCountry(currentEvent.country)
            setSelectedState(currentEvent.state)
            // setEventCountys()
            setEventCountry(currentEvent.eventCountry)
            setEventState(currentEvent.eventState)
            setValue("name", currentEvent.name)
            setValue("email", currentEvent.email)
            setValue("phoneNumber", currentEvent.phoneNumber)
            setValue('country', currentEvent.country)
            setValue('state', currentEvent.state)
            setValue('city', currentEvent.city)
            setValue('eventCountry', currentEvent.eventCountry)
            setValue('eventState', currentEvent.eventState)
            setValue('eventCity', currentEvent.eventCity)
            setValue('location', currentEvent.location)


            const eventDate = dayjs(currentEvent.date);
            setSelectedDate(eventDate);
            setValue('date', eventDate);
            const starting = dayjs(currentEvent.startingTime);
            setStartingTime(starting);
            setValue('startingTime', starting);

            const ending = dayjs(currentEvent.endingTime);
            setEndingTime(ending);
            setValue('endingTime', ending);

            setValue('eventType', currentEvent.eventType)
            setValue('eventCategory', currentEvent.eventCategory)
            setValue('eventBooking', currentEvent.eventBooking)
            setValue('paymentMethod', currentEvent.paymentMethod)
            setValue('seatNumber', currentEvent.seatNumber)
            setValue('paymentAmount', currentEvent.paymentAmount)
            setValue("totalAmount", currentEvent.totalAmount)
            setValue('seatArrangement', currentEvent.seatArrangement)
        }
    }, [setValue, currentEvent])

    useEffect(() => {
        const getCountries = async () => {
            const result: Country[] = await Country.getAllCountries();
            const getCategorys = await getCategory(currentUser.id)

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

 


    return (
        <>
            <div className="w-full  bg-white border flex items-center flex-col shadow-md ">
                <h1 className=' m-6 w-full flex justify-center text-3xl font-extrabold'>Event Edit Form</h1>
                <div className="w-full flex justify-center ">
                    <Toaster position='top-center'></Toaster>
                    <Box component="form" sx={{ m: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-[100%] flex items-center flex-col justify-center'>
                            {
                                formPart && <>
                                    <div className='w-[50%] flex  justify-center p-3'>
                                        <p> *provide information about the creaters</p>
                                    </div>

                                    <Box sx={{ m: 1, width: '50%', display: 'flex', }}>
                                        <TextField
                                            id="outlined-basic"
                                            focused
                                            sx={{ m: 1, width: '45%', display: 'flex' }}
                                            defaultValue={currentEvent.name}
                                            // value={useForm.name}
                                            label="Name"
                                            type='text'
                                            variant="outlined"
                                            {...register("name", { required: "Name is required" })}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name && errors.name.message}
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            sx={{ m: 1, width: '45%', display: 'flex' }}
                                            defaultValue={currentEvent.email}
                                            label="Email"
                                            focused
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
                                    <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                        <TextField id="outlined-basic" focused sx={{ m: 1, width: '45%', display: 'flex' }} label="Phone" variant="outlined"
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
                                            <InputLabel id="demo-simple-select-country-label">Country</InputLabel>
                                            <Select
                                                value={selectedCountry || ''}
                                                labelId="demo-simple-select-country-label"
                                                id="demo-simple-select-country"
                                                label="Country"
                                                {...register("country", { required: "Please select a country" })}
                                                onChange={(e) => {
                                                    setSelectedCountry(e.target.value);
                                                    setSelectedState(''); // Reset state when country changes
                                                    trigger("country"); // Manually trigger validation for the country field
                                                }}
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
                                    <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                        <FormControl error={Boolean(errors.state)} sx={{ m: 1, width: '45%', display: 'flex' }}>
                                            <InputLabel id="demo-simple-select-state-label">State</InputLabel>
                                            <Select
                                                value={selectedState || ''}
                                                labelId="demo-simple-select-state-label"
                                                id="demo-simple-select-state"
                                                label="State"
                                                {...register("state", { required: "Please select a state" })}
                                                onChange={(e) => {
                                                    setSelectedState(e.target.value);
                                                    trigger("state"); // Manually trigger validation for the state field
                                                }}
                                            >
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
                                                defaultValue={currentEvent.city}
                                                key={currentEvent.city}
                                                {...register("city", { required: "Please Select a City" })}
                                                onChange={(e) => {
                                                    setSelectedCity(e.target.value)
                                                    trigger("city")
                                                }}
                                                label="City"


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
                                    <div className='w-[50%] flex  justify-center p-3'>
                                        <p> *provide information about the event</p>
                                    </div>
                                    <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                        <FormControl error={Boolean(errors.eventCountry)} sx={{ m: 1, width: '45%', display: 'flex' }}>
                                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                defaultValue={currentEvent.eventCountry}
                                                key={currentEvent.eventCountry}
                                                id="demo-simple-select"
                                                label="Country"
                                                {...register("eventCountry", { required: "Please select a country" })}
                                                onChange={(e) => {
                                                    setEventCountry(e.target.value);
                                                    trigger("eventCountry"); // Manually trigger validation for the country field
                                                }}

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
                                                defaultValue={currentEvent.eventState}
                                                key={currentEvent.eventState}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                {...register("eventState", { required: "Please Select a State" })}
                                                onChange={(e) => {
                                                    setEventState(e.target.value)
                                                    trigger("eventState")
                                                }}
                                                label="State"
                                            >

                                                {eventStates.map(({ isoCode, name }) => (
                                                    <MenuItem key={isoCode} value={isoCode}>
                                                        {name}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                            {errors.eventState && <FormHelperText>{errors.eventState.message}</FormHelperText>}

                                        </FormControl>
                                    </Box>
                                    <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                        <FormControl error={Boolean(errors.eventCity)} sx={{ m: 1, width: '45%', display: 'flex' }} >
                                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={currentEvent.eventCity}
                                                key={currentEvent.eventCity}
                                                {...register("eventCity", { required: "Please Select a City" })}
                                                onChange={(e) => {
                                                    setEventCity(e.target.value)
                                                    trigger("eventCity")
                                                }}
                                                label="City"


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
                                            focused
                                            type='location'
                                            variant="outlined"
                                            {...register("location", { required: "location is required" })}
                                            error={Boolean(errors.location)}
                                            helperText={errors.location && errors.location.message}
                                        />
                                    </Box>
                                    <Box sx={{ m: 1, width: '50%' }}>
                                        <InputLabel id="demo-simple-select-label" className="ms-2">Date</InputLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{ width: '92%', marginLeft: 1 }}
                                                value={selectedDate}
                                                disablePast
                                                {...register("date", { required: "Date is required" })}
                                                onChange={(newValue) => {
                                                    setSelectedDate(newValue);
                                                    setValue('date', newValue);
                                                }}
                                            // renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        {errors.date && (
                                            <FormHelperText className="ps-4" error>
                                                {errors.date.message}
                                            </FormHelperText>
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 4, width: '50%' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Box sx={{ width: '45%' }}>
                                                <DemoContainer components={['TimePicker', 'TimePicker']} sx={{ margin: 2, width: '100%' }}>
                                                    <TimePicker
                                                        value={startingTime || null} // Use value instead of defaultValue and handle initial null case
                                                        key={startingTime ? startingTime.toString() : ''} // Ensure key changes when value changes
                                                        sx={{ width: '100%', display: 'flex' }}
                                                        label="Starting Time"
                                                        {...register('startingTime', { required: "Select Starting time" })}
                                                        onChange={(newValue) => setValue('startingTime', newValue)}
                                                    />
                                                </DemoContainer>
                                                {errors.startingTime && (
                                                    <FormHelperText className='ps-5' error>{errors.startingTime.message}</FormHelperText>
                                                )}
                                            </Box>
                                            <Box sx={{ width: '45%' }}>
                                                <DemoContainer components={['TimePicker', 'TimePicker']} sx={{ margin: 2, marginLeft: 0, marginRight: 5, width: '100%' }}>
                                                    <TimePicker
                                                        value={endingTime || null} // Use value instead of defaultValue and handle initial null case
                                                        key={endingTime ? endingTime.toString() : ''} // Ensure key changes when value changes
                                                        sx={{ width: '100%', display: 'flex' }}
                                                        label="Ending Time"
                                                        {...register('endingTime', { required: "Select Ending time" })}
                                                        onChange={(newValue) => setValue('endingTime', newValue)}
                                                    />
                                                </DemoContainer>
                                                {errors.endingTime && (
                                                    <FormHelperText className='ps-2' error>{errors.endingTime.message}</FormHelperText>
                                                )}
                                            </Box>
                                        </LocalizationProvider>
                                    </Box>

                                    <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                        <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} error={Boolean(errors.eventType)} >
                                            <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                defaultValue={currentEvent.eventType}
                                                key={currentEvent.eventType}
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
                                        <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} error={Boolean(errors.eventCategory)}>
                                            <InputLabel id="demo-simple-select-label">Event Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={currentEvent.eventCategory?.id || ''}
                                                label="Event Category"
                                                {...register("eventCategory", { required: "Select Event Category" })}
                                                onChange={(e) => setValue('eventCategory', e.target.value)}
                                            >
                                                {category && category.map((ele: any) => (
                                                    <MenuItem key={ele._id} value={ele._id}>
                                                        {ele.category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.eventCategory && (
                                                <FormHelperText error>{errors.eventCategory.message}</FormHelperText>
                                            )}
                                        </FormControl>


                                    </Box>

                                    <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                        <FormControl sx={{ m: 1, width: '45%', display: 'flex' }} error={Boolean(errors.eventBooking)} >
                                            <InputLabel id="demo-simple-select-label">Event booking</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                defaultValue={currentEvent.eventBooking}
                                                key={currentEvent.eventBooking}
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
                                                defaultValue={currentEvent.paymentMethod}
                                                key={currentEvent.paymentMethod}
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
                                        booking && <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                            <FormControl error={Boolean(errors.seatNumber)} className='w-[92%]'>

                                                <TextField id="outlined-basic"
                                                    defaultValue={currentEvent.seatNumber}
                                                    key={currentEvent.seatNumber}
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
                                        payment && <Box sx={{ m: 1, width: '50%', display: 'flex' }}>
                                            <FormControl error={Boolean(errors.paymentAmount)} className='w-[92%]'>

                                                <TextField id="outlined-basic"
                                                    defaultValue={currentEvent.paymentAmouunt}
                                                    key={currentEvent.paymentAmount}
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
                                    <Box sx={{ m: 1, width: '50%', display: 'flex', }}>
                                        <TextField
                                            id="outlined-basic"
                                            defaultValue={currentEvent.paymentAmount}
                                            key={currentEvent.paymentAmount}
                                            sx={{ m: 1, width: '100%', display: 'flex', marginRight: '3rem' }}
                                            label="TotalAmount"
                                            type='number'

                                            variant="outlined"
                                            {...register("totalAmount", { required: "Total Amount is required" })}
                                            error={Boolean(errors.totalAmount)}
                                            helperText={errors.totalAmount && errors.totalAmount.message}
                                        />


                                    </Box>
                                    <div className='w-[50%] p-4'>
                                        <button type='submit' className='w-[97%] py-3  font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center'>submit</button>
                                    </div>
                                </>


                            }
                        </div>

                    </Box>
                </div>
            </div>
        </>
    )
}

export default EventEdit

