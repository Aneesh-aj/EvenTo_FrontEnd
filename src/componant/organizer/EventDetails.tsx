import { Divider, Box, Typography, Button, Grid, Container, Paper } from "@mui/material";
import Nav from "../common/Nav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { geteventDetails } from "../../api/organizer";
import { Ievents } from "../../@types/eventType";
import { Iorganizer } from "../../@types/organizer";
import { PostModal } from "./PostModal";

export const EventDetails = () => {
  const [event, setEvent] = useState<Ievents>();
  const [organizer, setOrganizer] = useState<Iorganizer>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    eventId: "",
    organizerId: "",
    seatArrangment: []
  });

  const { id } = useParams();

  useEffect(() => {
    async function getDetails() {
      console.log(" the id", id);
      const response = await geteventDetails(id as string);
      if (response.success) {
        const { details } = response;
        setOrganizer(details.organizer);
        setEvent(details.event);
        setFormData({
          eventId: details.event._id,
          organizerId: details.organizer?._id,
          seatArrangment: details.event.seatArrangement
        });
      }
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
              <Typography variant="body1">{event?.name || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
              <Typography variant="body1">{event?.email || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Phone Number
              </Typography>
              <Typography variant="body1">{event?.phoneNumber || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Country
              </Typography>
              <Typography variant="body1">{event?.country || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                State
              </Typography>
              <Typography variant="body1">{event?.state || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                City
              </Typography>
              <Typography variant="body1">{event?.city || "N/A"}</Typography>
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
              <Typography variant="body1">{organizer?.name || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Category
              </Typography>
              <Typography variant="body1">{event?.eventCategory?.category || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Event Type
              </Typography>
              <Typography variant="body1">{event?.eventType || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Date & Time
              </Typography>
              <Typography variant="body1">
                {event && event.date && event.startingTime && event.endingTime
                  ? `${formatDate(event.date)} from ${formatTime(event.startingTime)} to ${formatTime(event.endingTime)}`
                  : "No event details available."}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Country
              </Typography>
              <Typography variant="body1">{event?.eventCountry || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                State
              </Typography>
              <Typography variant="body1">{event?.eventState || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                City
              </Typography>
              <Typography variant="body1">{event?.eventCity || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Location
              </Typography>
              <Typography variant="body1">{event?.location || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Booking
              </Typography>
              <Typography variant="body1">{event?.eventBooking || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Single Payment
              </Typography>
              <Typography variant="body1">{event?.paymentAmount || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Method
              </Typography>
              <Typography variant="body1">{event?.paymentMethod || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Entry
              </Typography>
              <Typography variant="body1">{event?.seatNumber || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total Amount
              </Typography>
              <Typography variant="body1">{event?.totalAmount || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Event Status
              </Typography>
              <Typography variant="body1">{event?.status || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {event && event.status === "upcoming" && event.eventType === "Public" && (
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
              Post
            </Button>
          )}
        </Box>

        <PostModal isOpen={isModalOpen} onClose={handleCloseModal} formData={formData} />
      </Container>
    </>
  );
};
