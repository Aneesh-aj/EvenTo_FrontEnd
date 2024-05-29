import { Divider, Box, Typography, Button, Grid, Container, Paper } from "@mui/material";
import Nav from "../common/Nav";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApproveRequest, RejectRequest, getRequestDetails, geteventDetails } from "../../api/organizer";
import { Ievents } from "../../@types/eventType";


export const RequestDetails = () => {
  const [details, setDetails] = useState<Ievents>();
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    async function getDetails() {
      console.log(" the id", id);
      const response = await getRequestDetails(id as string);
      console.log(" the request Details -----", response)

      setDetails(response);


    }
    getDetails();
  }, [id]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date format:', dateString);
      return 'Invalid date';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString: string): string => {
    const time = new Date(timeString);
    if (isNaN(time.getTime())) {
      console.error('Invalid time format:', timeString);
      return 'Invalid time';
    }
    let hours = time.getHours();
    let minutes: any = time.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  const Approve = async(id:string) => {
      const approved = await ApproveRequest(id)
  };

  const Reject = async(id:string) => {
     const rejected = await RejectRequest(id)
  };


  return (
    <>
      <Nav />
      <Container sx={{ pt: 12, pb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Event Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Name
              </Typography>
              <Typography variant="body1">{details?.name || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
              <Typography variant="body1">{details?.email || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Phone Number
              </Typography>
              <Typography variant="body1">{details?.phoneNumber || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Country
              </Typography>
              <Typography variant="body1">{details?.country || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                State
              </Typography>
              <Typography variant="body1">{details?.state || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                City
              </Typography>
              <Typography variant="body1">{details?.city || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Event Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Organizer
              </Typography>
              <Typography variant="body1">{"N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Category
              </Typography>
              <Typography variant="body1">{details?.eventCategory?.category || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Event Type
              </Typography>
              <Typography variant="body1">{details?.eventType || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Date & Time
              </Typography>
              <Typography variant="body1">
                {details && details.date && details.startingTime && details.endingTime
                  ? `${formatDate(details.date)} from ${formatTime(details.startingTime)} to ${formatTime(details.endingTime)}`
                  : "No event details available."}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Country
              </Typography>
              <Typography variant="body1">{details?.eventCountry || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                State
              </Typography>
              <Typography variant="body1">{details?.eventState || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                City
              </Typography>
              <Typography variant="body1">{details?.eventCity || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Location
              </Typography>
              <Typography variant="body1">{details?.location || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Booking
              </Typography>
              <Typography variant="body1">{details?.eventBooking || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Single Payment
              </Typography>
              <Typography variant="body1">{details?.paymentAmount || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Method
              </Typography>
              <Typography variant="body1">{details?.paymentMethod || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Entry
              </Typography>
              <Typography variant="body1">{details?.seatNumber || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total Amount
              </Typography>
              <Typography variant="body1">{details?.totalAmount || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Event Status
              </Typography>
              <Typography variant="body1">{details?.status || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {details && details.status === "Approved" && (
            <Button variant="contained" color="primary" onClick={()=>navigate(`/organizer/requestEventCreation/${id}`)}>
              Create Event
            </Button>
          )}
          {details && details.status === "pending" && (
            <>
            <div className="flex gap-2">

              <Button variant="contained" color="error" onClick={()=>Reject(id as string)}>
                Reject
              </Button>
              <Button variant="contained" color="primary" onClick={()=>Approve(id as string)}>
                Approve
              </Button>
            </div>
            </>
          )}
        </Box>

        {/* <PostModal isOpen={isModalOpen} onClose={handleCloseModal} formData={formData} /> */}
      </Container>
    </>
  );
};
