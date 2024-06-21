import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IorganizerFormData } from '../../@types/organizer';
import { isValidEmail, isValidName, isValidOTP, isValidPhoneNumber } from "../../utils/organizerValidation/formValidation"
import UploadImage from '../../survices/firebase/uploadImage'
import { organizerSignup, otpSenting, resendOtp, verifyOtp } from '../../api/organizer';
import toast, { Toaster } from 'react-hot-toast';
import { currentUser } from '../../@types/allTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';

interface OrganizerRegistrationProps { }

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

const OrganizerRegistration: React.FC<OrganizerRegistrationProps> = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedState, setSelectedState] = useState<string | undefined>();
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [ownerName, setOwnername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [Cpassword, setCpassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('')

  const [building, setBuilding] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [ownerId, setOwnerId] = useState<File | null>(null);
  const [license, setLicense] = useState<File | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);
  const [passbook, setPassbook] = useState<File | null>(null);

  useSelector((state: currentUser) => state)
  const dispatch = useDispatch()

  const formData = new FormData()
  const [errors, setErrors] = useState<Record<string, string | undefined>>({
    ownerName: '',
    email: '',
    phoneNumber: '',
    password: '',
    Cpassword: '',
    building: '',
    pincode: '',
    ownerId: '',
    license: '',
    insurance: '',
    passbook: '',
    otp: ''
  });

  const [showOtp, setShowotp] = useState<boolean>(false);
  const [partOne, setPartOne] = useState<boolean>(true);
  const [partTwo, setPartTwo] = useState<boolean>(false);


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


  async function handler(e: React.FormEvent) {
    e.preventDefault();
    formData.append("name", ownerName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("Cpassword", Cpassword);
    formData.append("building", building);
    formData.append("pincode", pincode);
    formData.append("country", selectedCountry || "");
    formData.append("state", selectedState || "");
    formData.append("city", selectedCity || "");
    formData.append("otp", otp);

    try {
      const ownerIdUrls: any = await UploadImage(ownerId);
      const licenseUrls: any = await UploadImage(license);
      const insuranceUrls: any = await UploadImage(insurance);
      const passbookUrls: any = await UploadImage(passbook);

      formData.append('ownerId', ownerIdUrls); // Assuming you want the first URL
      formData.append('companyLicense', licenseUrls);
      formData.append('companyInsurance', insuranceUrls);
      formData.append('bankPassbook', passbookUrls);

      const convertedData: IorganizerFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phoneNumber: formData.get('phoneNumber') as string,
        password: formData.get('password') as string,
        confirm_password: formData.get('confirm_password') as string,
        building: formData.get('building') as string,
        pincode: formData.get('pincode') as string,
        country: formData.get('country') as string,
        state: formData.get('state') as string,
        city: formData.get('city') as string,
        otp: formData.get('otp') as string,
        ownerId: formData.get('ownerId') as string,
        companyLicense: formData.get('companyLicense') as string,
        companyInsurance: formData.get('companyInsurance') as string,
        bankPassbook: formData.get('bankPassbook') as string
      };
      try {
        setLoading(true);
        const result = await organizerSignup(convertedData);
        console.log("the result of the registration", result);
        if (result.success) {
          toast.success(result.message);
          dispatch(setUser({
            role: result.role,
            name: result.organizer.name,
            email: result.organizer.email,
            id: result.organizer._id,
            blocked: result.organizer.blocked,
            approve: false
          }));

          setLoading(false);
          navigate('/organizer/pending');
        } else {
          toast.error(result.response.data.message);
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
    }
  }

  // Validating the OTP
  async function otpValidation(e: React.FormEvent) {
    e.preventDefault();
    let newErrors = { ...errors };
    setLoading(true);

    if (!otp.trim()) {
      newErrors.otp = 'OTP is required.';
      setErrors(newErrors);
      setLoading(false);
      return;
    } else if (!isValidOTP(otp)) {
      newErrors.otp = 'Invalid OTP (should be 4 digits).';
      setErrors(newErrors);
      setLoading(false);
      return;
    } else {
      newErrors.otp = '';
      setErrors(newErrors);

      const response = await verifyOtp(email, otp);
      console.log("the response", response);
      setLoading(false);
      if (response.success) {
        toast.success(response.message);
        await handler(e);
      } else if (response.success === false) {
        toast.error(response.message);
      } else {
        toast.error("OTP expired!!");
      }
    }
  }

  const validationOne = () => {
    let newErrors = { ...errors };

    // Validate owner name (no numbers or special characters allowed)
    if (!ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required.';
    } else if (!isValidName(ownerName)) {
      newErrors.ownerName = 'Owner name should only contain letters.';
    } else {
      newErrors.ownerName = '';
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email address.';
    } else {
      newErrors.email = "";
    }

    // Validate phone number
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (should be 10 digits).';
    } else {
      newErrors.phoneNumber = "";
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else {
      newErrors.password = "";
    }

    // Validate confirm password
    if (!Cpassword.trim()) {
      newErrors.Cpassword = 'Confirm Password is required.';
    } else if (Cpassword !== password) {
      newErrors.Cpassword = 'Passwords do not match.';
    } else {
      newErrors.Cpassword = "";
    }

    console.log("all errors", newErrors);

    if (Object.values(newErrors).every((value) => value === "")) {
      console.log("entering");
      setPartOne(false);
      setPartTwo(true);
    }
    console.log("after");
    setErrors(newErrors);
  };

  const isValidPincode = (pincode: string): boolean => {
    // Check if pincode is a 6-digit number
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validationTwo = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    let allError = { ...errors };

    // Validate building
    if (!building.trim()) {
      allError.building = 'Building/floor is required.';
    } else {
      allError.building = '';
    }

    // Validate pincode
    if (!pincode.trim()) {
      allError.pincode = 'Pincode is required';
    } else if (!isValidPincode(pincode)) {
      allError.pincode = 'Invalid pincode (should be 6 digits).';
    } else {
      allError.pincode = '';
    }

    if (!selectedCity) {
      allError.city = 'Select a city.';
    } else {
      allError.city = "";
    }

    if (!selectedCountry) {
      allError.country = 'Select a country';
    } else {
      allError.country = "";
    }
    if (!selectedState) {
      allError.state = 'Select a state.';
    }

    // Validate owner id
    if (!ownerId) {
      allError.ownerId = 'Owner id card is required.';
    } else {
      allError.ownerId = '';
    }

    // Validate license
    if (!license) {
      allError.license = 'Company license is required.';
    } else {
      allError.license = "";
    }

    // Validate insurance
    if (!insurance) {
      allError.insurance = 'Company insurance is required.';
    } else {
      allError.insurance = "";
    }

    if (!passbook) {
      allError.passbook = 'Bank passbook is required.';
    } else {
      allError.passbook = "";
    }

    console.log("before");
    console.log("second all errors", errors);

    // Check if there are no errors
    if (Object.values(allError).every((value) => value === "")) {
      try {
        const result = await otpSenting(email, ownerName);
        console.log("the result", result);
        if (result.status === 200) {
          toast.success(result.data.message);
          setPartTwo(false);
          setShowotp(true);
        } else {
          toast.error(result.response.data.message);
        }
      } catch (error) {
        throw error;
      }
    }
    console.log("after");
    setLoading(false);
    setErrors(allError);
  };

  const resendOtpHandler = async () => {
    const otpResponse = await resendOtp(email);
    if (otpResponse.status === 200) {
      toast.success("OTP resent to your email.");
    } else {
      toast.error("Failed to resend OTP.");
    }
  };



  return (
    <div className='h-auto overflow-y-scroll bg-[#f0f2f0] w-full flex justify-center custom-scrollbar'>
      <div className="md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto my-10 bg-white p-6 md:p-12 rounded-xl shadow-md shadow-slate-300">
        <div className='flex justify-center '>
          <Toaster position="top-right" reverseOrder={false} />
          <h1 className="text-4xl font-medium pb-4">Register</h1>
        </div>
        <form action="" onSubmit={handler} className="my-6 md:my-10 space-y-5">
          {partOne && (
            <>
              <label htmlFor="ownerName">
                <p className="font-medium text-slate-700 pb-2">Company name</p>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  className="w-full py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  onChange={(e) => setOwnername(e.target.value)}
                  placeholder="Enter your company"
                />
                {errors.ownerName && <div className="text-red-500 p-1.5">{errors.ownerName}</div>}

              </label>
              <label htmlFor="email">
                <p className="font-medium text-slate-700 mt-2 mb-1 pb-2">Email address</p>
                <InputText
                  keyfilter="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full  py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
                {errors.email && <div className="text-red-600 p-2">{errors.email}</div>}
              </label>
              <label htmlFor="phoneNumber">
                <p className="font-medium  mt-1 mb-1 text-slate-700 pb-2">Phone number</p>
                <InputText
                  keyfilter="pint"
                  id="phone"
                  placeholder='Enter your number'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  maxLength={14}
                />
                {errors.phoneNumber && <div className="text-red-600 p-2">{errors.phoneNumber}</div>}
              </label>
              <label htmlFor="password">
                <p className="font-medium  mt-1 mb-1 text-slate-700 pb-2">Password</p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your password"
                />
                {errors.password && <div className="text-red-600 p-2">{errors.password}</div>}
              </label>
              <label htmlFor="Cpassword">
                <p className="font-medium  mt-1 mb-1 text-slate-700 pb-2">conform Password</p>
                <input
                  id="Cpassword"
                  name="Cpassword"
                  type="password"
                  onChange={(e) => setCpassword(e.target.value)}
                  className="w-full py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your password"
                />
                {errors.Cpassword && <div className="text-red-600 p-2">{errors.Cpassword}</div>}

              </label>

              <button type='button' disabled={loading} onClick={validationOne} className={loading ? 'w-full disabled:submit py-3 font-medium text-white bg-indigo-400 hover:bg-indigo-300 rounded-lg border-indigo-300 hover:shadow inline-flex space-x-2 items-center justify-center' : "w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"}>{loading ? "Loading" : "next"}</button>
            </>
          )}
          {partTwo && (
            <>
              <div className='w-full flex justify-between'>
                <label htmlFor="country" className='w-6/12 me-3 '>
                  <p className="font-medium text-slate-700 pb-2">Country</p>
                  <select
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full py-3 border border-black bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  >
                    {countries.map(({ isoCode, name }) => (
                      <option key={isoCode} value={isoCode}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.country && <div className="text-red-600 p-2">{errors.coutnry}</div>}
                </label>
                <label htmlFor="state" className='w-6/12 '>
                  <p className="font-medium text-slate-700 pb-2">State</p>
                  <select
                    id="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full py-3 border border-black bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  >
                    {states.map(({ isoCode, name }) => (
                      <option key={isoCode} value={isoCode}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.state && <div className="text-red-600 p-2">{errors.state}</div>}
                </label>
              </div>
              <div className='w-full flex justify-between'>
                <label htmlFor="city" className='w-6/12 me-3 '>
                  <p className="font-medium text-slate-700 pb-2">City</p>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full py-3.5  border  border-black bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  >
                    {cities.map(({ name }) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.city && <div className="text-red-600 p-2">{errors.city}</div>}
                </label>
                <label htmlFor="building">
                  <p className="font-medium text-slate-700 pb-2"> Building/floor</p>
                  <input
                    id="building"
                    name="building"
                    type="text"
                    onChange={(e) => setBuilding(e.target.value)}
                    className="w-full  py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter company Phone number"
                  />
                  {errors.building && <div className="text-red-600 p-2">{errors.building}</div>}
                </label>
              </div>
              <div className='w-full flex gap-3 '>
                <label htmlFor="pincode" className='w-full'>
                  <p className="font-medium text-slate-700 pb-2">Pincode</p>
                  <InputText
                    id="picode"
                    name="pincode"
                    keyfilter="pint"
                    maxLength={6}
                    onChange={(e) => setPincode(e.target.value)}

                    className="w-full   py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password"
                  />
                  {errors.pincode && <div className="text-red-600 p-2">{errors.pincode}</div>}
                </label>
                <label htmlFor="ownerId" className='w-full'>
                  <p className="font-medium text-slate-700 pb-2">Owner id card</p>
                  <FileUpload
                    mode="basic"
                    name="ownerId"
                    accept="image/*"
                    onSelect={(e) => {
                      if (e.files.length > 0) {
                        setOwnerId(e.files[0]);
                      }
                    }}

                    className="bg-white w-full h-12 overflow-hidden py-2 border border-black rounded-lg px-3 flex items-center focus:outline-none focus:border-slate-500 hover:shadow"
                    chooseLabel="Choose file"
                  />
                  {errors.ownerId && <div className="text-red-600 p-2">{errors.ownerId}</div>}
                </label>
              </div>
              <label htmlFor="license">
                <p className="font-medium text-slate-700 pb-2">Company license </p>
                <FileUpload
                  mode="basic"
                  accept="image/*"
                  id="license"
                  name="license"
                  onSelect={(e) => {
                    console.log("heyyyy-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->>>>>>>>>>", e.files[0].name)
                    // e.files is an array of selected files
                    if (e.files.length > 0) {
                      setLicense(e.files[0]);
                    }
                  }}
                  className="bg-white w-full h-12 overflow-hidden py-2 border border-black rounded-lg px-3 flex items-center focus:outline-none focus:border-slate-500 hover:shadow"
                  chooseLabel="Choose file"
                />
                {errors.license && <div className="text-red-600 p-2">{errors.license}</div>}
              </label>
              <div className='w-full flex gap-3'>
                <label htmlFor="insurance" className=' w-full'>
                  <p className="font-medium text-slate-700 pb-2">Company insurance</p>
                  <FileUpload
                    mode="basic"
                    id="insurance"
                    name="insurance"
                    onSelect={(e) => {
                      if (e.files.length > 0) {
                        setInsurance(e.files[0]);
                      }
                    }}
                    className="bg-white w-full h-12 overflow-hidden py-2 border border-black rounded-lg px-3 flex items-center focus:outline-none focus:border-slate-500 hover:shadow"
                    chooseLabel="Choose file"
                  />
                  {errors.insurance && <div className="text-red-600 p-2">{errors.insurance}</div>}
                </label>
                <label htmlFor="passbook" className='bg-yellow w-full'>
                  <p className="font-medium text-slate-700 pb-2">Bank passbook</p>
                  <FileUpload
                    mode='basic'
                    id="passbook"
                    name="passbook"
                    accept="image/*"
                    onSelect={(e) => {
                      if (e.files.length > 0) {
                        setPassbook(e.files[0]);
                      }
                    }}
                    className="bg-white w-full h-12 overflow-hidden py-2 border border-black rounded-lg px-3 flex items-center focus:outline-none focus:border-slate-500 hover:shadow"
                  />
                  {errors.passbook && <div className="text-red-600 p-2">{errors.passbook}</div>}
                </label>
              </div>
              <button onClick={(e) => validationTwo(e)} disabled={loading} type='button' className={loading ? 'w-full disabled:submit py-3 font-medium text-white bg-indigo-400 hover:bg-indigo-300 rounded-lg border-indigo-300 hover:shadow inline-flex space-x-2 items-center justify-center' : "w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"}> {loading ? "Loading" : "next"}</button>
            </>
          )}

          <div className="flex flex-row justify-between">
            <div></div>
          </div>
          {
            showOtp && <>
              <div className='w-full h-[350px] flex flex-col gap-8'>
                <label htmlFor="otp">
                  <p className="font-medium  mt-1 mb-1 text-slate-700 pb-2">OTP</p>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full py-3 border border-black rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your otp"
                  />
                  {errors.otp && <div className="text-red-600 p-2">{errors.otp}</div>}

                </label>

                <button disabled={loading} onClick={(e) => otpValidation(e)} className={loading ? 'w-full disabled:submit py-3 font-medium text-white bg-indigo-400 hover:bg-indigo-300 rounded-lg border-indigo-200 hover:shadow inline-flex space-x-2 items-center justify-center' : "w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>{loading ? "Loading" : "Register"}</span>
                </button>
                <div className="text-sm text-slate-500 mt-4">Didn't receive code? <p className="font-medium text-indigo-500 hover:text-indigo-600" onClick={()=>resendOtpHandler()}>Resend</p></div>

              </div>

            </>
          }
          <p className="text-center">
            Already an Organizer?{' '}
            <a href="#" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
              {' '}
              <Link to='/auth/organizerLogin'>
                <span>Login </span>
              </Link>{' '}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OrganizerRegistration;
