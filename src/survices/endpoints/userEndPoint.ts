const userRoutes={
    signup : '/user/register',
    login:'/user/login',
    verifyOTP:'/user/createUser',
    logout:"/user/logout",
    getUser:"/user/profile",
    profileEdit:"/user/profileEdit",
    uploadProfile:"/user/profileUpload",
    resendOpt:"/user/resendOtp",
    getAllorganizer:'/user/allorganizers',
    getPostDetails:"/user/eventPostDetails",
    getSeats:"/user/seatBooking",
    booking:"/user/Booking",
    payments:'/user/payment',
    searchQuery:"/user/searchQuery",
    getCategory:"/user/allcategory",
    bookings:"/user/allbooking",
    updatePassword:"/user/changepassword",
    otpSenting:"/user/sentotp",
    sendMessage:'/user/sendMessage',
    getChat:"/user/getChat"
}

export default userRoutes