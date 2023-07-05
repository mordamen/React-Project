import { AppBar, Box, Container, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { forwardRef } from "react";


import CloseIcon from '@mui/icons-material/Close';

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
                <Toolbar sx={{flexDirection: 'row'}}>
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
                </Toolbar>
            </AppBar>
            <Container maxWidth={"md"} sx={{ m:'auto' }}>
                <Box  sx={{
                    backgroundImage: `url(${cardData.image.url})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat',
                    height: '25rem',
                    m: '2rem'
                }} />
                <Typography sx={{ my: 1 }}>{cardData.description}</Typography>
                <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Industry: </Typography>
                    <Typography sx={{ mx: 1 }}> {cardData.subTitle}</Typography>
                </Box>
                <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
                    <Typography sx={{ mx: 1 }}> {cardData.phone}</Typography>
                </Box>
                <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Address: </Typography>
                    <Typography sx={{ mx: 1 }}> {cardData.houseNumber}, {cardData.street}, {cardData.state}, {cardData.country} </Typography>
                </Box>
                <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Card Number:</Typography>
                    <Typography sx={{ mx: 1 }}> {cardData.bizNumber}</Typography>
                </Box>
            </Container>
        </Dialog>
    )
}

export default FullCard;