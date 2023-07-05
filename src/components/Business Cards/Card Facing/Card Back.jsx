import { Fragment } from "react";

import { Box, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';

function CardBack({ setShowFront, handleOpenFull, cardData, canEdit, handleOpenEdit, canDelete, handleDeleteBtnClick, isLoggedIn, likePossible, handleLikeBtnClick, handleDislikeBtnClick, isOwnedBySelf }) {

    return (
        <Fragment>
        <Card raised className="card-back"
            sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                backgroundSize: "cover",
                backgroundPosition: "center",
                background: 'rgba(23,23,23, 0.9)',
            }}
        >
            <Box className='flip-icon' >
                <IconButton color="primary" aria-label="flip card" onClick={() => { setShowFront((v) => !v); } } sx={{zIndex: '1000'}}>
                    <SwitchAccessShortcutIcon />
                </IconButton>
            </Box>
            <CardHeader
                titleTypographyProps={{
                    sx: { fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}},
                }} title={cardData.title}
                subheaderTypographyProps={{
                    sx: { fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}},
                }} subheader={cardData.subTitle}></CardHeader>
            <CardActionArea onClick={handleOpenFull}>
                <CardContent
                    sx={{
                        backgroundColor: "transparent",
                        py: {xs: 0}
                    }}
                >
                    <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                        <Typography variant='body1' sx={{ fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}, fontWeight: "bold" }}>Phone Number:</Typography>
                        <Typography variant='body1' sx={{ fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}, mx: 1 }}> {cardData.phone}</Typography>
                    </Box>
                    <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                        <Typography variant='body1' sx={{ fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}, fontWeight: "bold" }}>Address: </Typography>
                        <Typography variant='body1' sx={{ fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}, mx: 1 }}> {cardData.houseNumber}, {cardData.street}, {cardData.state}, {cardData.country} </Typography>
                    </Box>
                    <Box sx={{ my: 1, display: "flex", flexDirection: "row" }}>
                        <Typography variant='body1' sx={{ fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}, fontWeight: "bold" }}>Card Number:</Typography>
                        <Typography variant='body1' sx={{ fontSize: {xs: '0.5rem', sm: '0.75rem', md:'1rem'}, mx: 1 }}> {cardData.bizNumber}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 0,
                width: '100%'
            }}>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{ ml: 1 }}
                >
                    {canEdit ? (
                            <IconButton variant="text" size='small' color="warning" onClick={handleOpenEdit} sx={{ border: 'none', fontSize: {xs: 'small'}}}>
                                <EditIcon />
                            </IconButton>
                    ) : (
                        ""
                    )}
                    {canDelete ? (
                            <IconButton variant="text" color="error" onClick={handleDeleteBtnClick} sx={{ border: 'none', fontSize: {xs: 'small', md: 'medium'}}}>
                                <DeleteForeverIcon />
                            </IconButton>
                    ) : ("")}
                </ButtonGroup>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{ mr: 3 }}
                >
                    {isLoggedIn && likePossible ?
                        <IconButton variant="text" color="primary" size='small' onClick={handleLikeBtnClick} sx={{ border: 'none'}}>
                            <FavoriteBorderIcon />
                        </IconButton> : isLoggedIn ?
                            <IconButton variant="text" size='small' color="primary" onClick={handleDislikeBtnClick} sx={{ border: 'none'}}>
                                <FavoriteIcon />
                            </IconButton> : ""}
                    {!isOwnedBySelf ?
                        <IconButton variant="text" color="primary" sx={{ border: 'none', fontSize: {xs: 'small'}}}>
                            <PhoneInTalkIcon />
                        </IconButton> : ""}
                </ButtonGroup>
            </CardActions>
        </Card>
        </Fragment>
    );
}

export default CardBack;