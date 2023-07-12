import {
    Container,
    Typography,
} from "@mui/material";

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import useQueryParams from "../hooks/useQueryParams";
import CardGallery from "../components/Business Cards/Card Gallery";
import CardPreview from "../components/Business Cards/Skeleton Card";


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
            .get("/cards/cards")
            .then(({ data }) => {
            console.log("OG Cards data:", data);
            filterFunc(data);
            })
            .catch((error) => {
            console.log("err from axios", error);
            toast.error("Failed to retrieve buisiness cards data");
            });
        }, [originalCardsArr, qparams.filter]);

        return (
        <Fragment>
            <Container maxWidth='false' className='hero-section' sx={{display: 'flex',}}>
            <Container sx={{maxWidth: 'sm', display: 'flex', flexDirection: 'column', m: 'auto'}}>
                <Typography component="h1" variant="h2" align="center" color="primary.dark" gutterBottom sx={{ fontSize: 'h2.fontSize' }}>
                Card Match
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="primary.dark" maxWidth='sm' margin='auto' sx={{ fontSize: 'h5.fontSize' }} gutterBottom>
                    Whether you're looking for a new partner, client, or supplier, our website is the ultimate resource for finding and connecting with top businesses. So why wait? Start browsing today and discover your next business connection!
                </Typography>
            </Container>
            </Container>
            <Container maxWidth='false' className='cards-showcase' sx={{ display: "flex", flexDirection: 'column'}}>
                {!cardsArr? <CardPreview /> : <CardGallery cardsArr={cardsArr} setCardsArr={setCardsArr} payload={payload}  />}
            </Container>
        </Fragment>
    );
};

export default HomePage;