import {
    Container,
    CircularProgress,
    Typography,
} from "@mui/material";

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import useQueryParams from "../hooks/useQueryParams";
import CardGallery from "../components/Business Cards/Card Gallery";
import CardSkeltonsPartial from "../components/Business Cards/Skeleton Card";

const FavoritesPage = () => {
    const [originalCardsArr, setOriginalCardsArr] = useState(null);
    const [cardsArr, setCardsArr] = useState(null);

    let qparams = useQueryParams();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    
    useEffect(() => {
        const filterFunc = (data) => {
            if (!originalCardsArr && !data) {
            return;
            }
            let filter = "";
            if (qparams.filter) {
            filter = qparams.filter;
            }
            if (!originalCardsArr && data) {
            /*
                when component loaded and states not loaded
            */
            setOriginalCardsArr(data);
            setCardsArr(data.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
            return;
            }
            if (originalCardsArr) {
            /*
                when all loaded and states loaded
            */
            let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
            setCardsArr(
                newOriginalCardsArr.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter))
            );
            }
        };

        axios
            .get("/cards/get-my-fav-cards")
            .then(({ data }) => {
                console.log("Cards data:", data);
                filterFunc(data);
            })
            .catch((error) => {
                console.log("err from axios", error);
                toast.error("Failed to retrieve buisiness cards data");
            });
    }, [originalCardsArr, qparams.filter]);

    return (

        <Fragment>
            <Container sx={{maxWidth: 'sm', display: 'flex', flexDirection: 'column', m: 'auto', justifyContent: 'center'}}>
                <Typography> Welcome to the "Favorite Cards" page, your personal collection of handpicked business cards. Here, you can easily curate and save your favorite cards for quick access and effortless organization. Take control of your networking endeavors by creating a tailored assortment of top-notch business representations. With just a few clicks, you can assemble a go-to selection of standout designs, ensuring that you never miss an opportunity to showcase your preferred contacts. Simplify your business card management and enjoy the convenience of having your favorite cards readily available, allowing you to effortlessly connect and stay in touch with the key players in your professional network.
                </Typography> 
            </Container>
            <Container maxWidth='false' className='cards-showcase' sx={{ display: "flex"}}>
                {!cardsArr? <CardSkeltonsPartial /> : <CardGallery cardsArr={cardsArr} setCardsArr={setCardsArr} payload={payload}  />}
            </Container>
        </Fragment>
    );
};

export default FavoritesPage;