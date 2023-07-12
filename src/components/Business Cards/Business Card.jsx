import { Fragment, useState } from "react";
import { CSSTransition } from "react-transition-group"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import EditCard from "./Modals/Edit Card";
import FullCard from "./Modals/View Full Card";
import CardFront from "./Card Facing/Card Front";
import CardBack from "./Card Facing/Card Back";

import { Box } from '@mui/material';



const BusinessCard = ({ setCardsArr, cardData, canDelete, canEdit, canLike, isOwnedBySelf}) => {

    const location = useLocation();
    const currentPage = location.pathname; // Current page path

    const currentCardData = {
        id: `${cardData._id}`,
        title: `${cardData.title}`,
        subTitle: `${cardData.subTitle}`,
        description: `${cardData.description}`,
        email: `${cardData.email}`,
        houseNumber: `${cardData.houseNumber}`,
        street: `${cardData.street}`,
        state: `${cardData.state}`,
        country: `${cardData.country}`,
        city: `${cardData.city}`,
        phone: `${cardData.phone}`,
        web: `${cardData.web}`,
        url: `${cardData.image.url}`,
        alt: `${cardData.image.alt}`,
    }
    
    //The following code sets the state and the functions for opening or closing the modal:
    const [openEdit, setOpenEdit] = useState(false);
    
    function handleOpenEdit() {
        setOpenEdit(true);
    }

    const [openFull, setOpenFull] = useState(false);

    function handleOpenFull() {
        setOpenFull(true);
    }

    function handleCloseFull() {
        setOpenFull(false);
    }

    const [showFront, setShowFront] = useState(true);
    const [likePossible, setLikePossible] = useState(canLike);
    const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

    const handleDeleteBtnClick = async () => {
        try {
        let response = await axios.delete("/cards/" + currentCardData.id);
        if(response.status === 200){
            setCardsArr((newCardsArr) => newCardsArr.filter((item) => item._id !== cardData._id));
            toast.success("Card deletion successful");
        }
        else{
            toast.error("Card Deletion Failed");
        }
        } catch (error) {
        toast.error("Error when deleting card");
        }
    };

    const handleLikeBtnClick = async () => {
        setLikePossible(!likePossible);
        console.log('card data: ', currentCardData);
        try {
            await axios.patch("/cards/card-like/" + currentCardData.id);
            toast.success("Added to Favorites");
        } catch (error) {
            console.log("err from axios", error);
            toast.error("Failed to Favorite Card");
        }
    }

    const handleDislikeBtnClick = async (event) => {
        setLikePossible(!likePossible);
        try {
            await axios.patch("/cards/card-like/" + currentCardData.id);
            toast.success("Removed from Favorites");
            if (currentPage === '/my_favs') {
                setCardsArr((newCardsArr) => newCardsArr.filter((item) => item._id !== currentCardData.id));
            }
        } catch (error) {
            toast.error("Failed to remove card from favorites");
        }
    }

    return (
        <Fragment>
        <Box className="flippable-card-container" sx={{width: { xs: 270, sm: 360, md: 480 }, height: { xs: 180, sm: 240, md: 320 }, m: 'auto'}}>
            <CSSTransition
                in={showFront} timeout={300} classNames='flip'
            >
                <Box className="card">
                    <CardFront 
                        img={cardData.image.url} setShowFront={setShowFront}
                    />
                    <CardBack 
                        setShowFront={setShowFront} handleOpenFull={handleOpenFull} cardData={cardData} canEdit={canEdit} handleOpenEdit={handleOpenEdit} canDelete={canDelete} handleDeleteBtnClick={handleDeleteBtnClick} isLoggedIn={isLoggedIn} likePossible={likePossible} handleLikeBtnClick={handleLikeBtnClick} handleDislikeBtnClick={handleDislikeBtnClick} isOwnedBySelf={isOwnedBySelf}
                    />
                </Box>
            </CSSTransition>
        </Box>
        <EditCard
            openEdit={openEdit} setOpenEdit={setOpenEdit} cardData={currentCardData} setCardsArr={setCardsArr}
        />
        <FullCard 
            openFull={openFull} handleClose={handleCloseFull} cardData={cardData}
        />
        </Fragment>
    );
}

export default BusinessCard;