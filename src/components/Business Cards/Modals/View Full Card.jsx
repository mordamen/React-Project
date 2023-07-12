import { AppBar, Box, Container, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { forwardRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Unstable_Grid2";

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FullCard({openFull, handleClose, cardData}) {

    return (
        <Dialog
            fullScreen
            open={openFull}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative'}} color='secondary'>
                <Toolbar sx={{my: 'auto'}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2}} variant="h5">
                        {cardData.title}
                    </Typography>
                    <Typography sx={{ mt: 1, ml: 1, fontSize: '1rem'}}>
                        {cardData.subTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={"md"} sx={{ m:'auto', flexGrow: 1}}>
                <Box  sx={{
                    backgroundImage: `url(${cardData.image.url})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat',
                    height: '15rem',
                    m: '2rem'
                }} />
                    <Grid container justifyContent='space-evenly' sx={{ flexGrow: 1 }}>
                        <Grid xs={12}>
                            <Typography sx={{ m: 'auto' }}>{cardData.description}</Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Typography sx={{ my: 1, fontSize: '1.5rem'}}>Communications: </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} >
                            <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Email:</Typography>
                                <Typography sx={{ mx: 1 }}> {cardData.email}</Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} >
                            <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
                                <Typography sx={{ mx: 1 }}> {cardData.phone}</Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} >
                            <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Website:</Typography>
                                <Typography sx={{ mx: 1 }}> {cardData.web}</Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <Typography sx={{ my: 1, fontSize: '1.5rem' }}>Location: </Typography>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Country:</Typography>
                                <Typography sx={{ mx: 1 }}> {cardData.country}, {cardData.state}</Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Address:</Typography>
                                <Typography sx={{ mx: 1 }}> {cardData.houseNumber}, {cardData.street}</Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Zip Code:</Typography>
                                <Typography sx={{ mx: 1 }}> {cardData.zip} </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <Typography sx={{ my: 1, fontSize: '1.5rem' }}>Other: </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Card Number:</Typography>
                                <Typography sx={{ mx: 1 }}> {cardData.bizNumber} </Typography>
                            </Box>
                        </Grid>
                    </Grid>
            </Container>
        </Dialog>
    )
}

export default FullCard;