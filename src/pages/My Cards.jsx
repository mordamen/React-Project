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

const HomePage = () => {
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
            .get("/cards/my-cards")
            .then(({ data }) => {
                console.log("Cards data:", data);
                filterFunc(data);
            })
            .catch((error) => {
                console.log("err from axios", error);
                toast.error("Failed to retrieve buisiness cards data");
            });
    }, [originalCardsArr, qparams.filter]);

    if (!cardsArr) {
        return <CircularProgress />;
    }

    return (
        <Fragment>
            <Container sx={{maxWidth: 'sm', display: 'flex', flexDirection: 'column', m: 'auto', justifyContent: 'center'}}>
                <Typography sx={{color: 'text.primary'}} > Welcome to the "My Cards" page, your personal gallery of stunning business cards! Here, you can proudly showcase the collection of business cards you have personally created. Each card represents your unique brand, creativity, and professionalism. Whether you're an entrepreneur, freelancer, or aspiring professional, this is your space to shine. Browse through your carefully crafted designs, admire the intricate details, and share your business card masterpieces with the world. From bold and modern to elegant and sophisticated, your creativity knows no bounds. Embrace the power of a great first impression as you present your exceptional cards to potential clients, partners, and colleagues. Start exploring your collection and unleash the full potential of your personal brand on the "My Cards" page!
                </Typography> 
            </Container>
            <Container maxWidth='false' sx={{ display: "flex", m:'auto', height: 1}}>
                <CardGallery cardsArr={cardsArr} setCardsArr={setCardsArr} payload={payload} />
        </Container>
        </Fragment>
        
    );
};

export default HomePage;
