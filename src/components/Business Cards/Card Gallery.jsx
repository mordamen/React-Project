// import { Grid } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import BusinessCard from "./Business Card";

const CardGallery = ({cardsArr, setCardsArr, payload}) => {

    return (
        <Grid container spacing={2} className='card-gallery-container' columns={{ xs: 1, sm: 2, md: 4 }} >
            {cardsArr.map((item) => (
                <Grid key={item._id + Date.now()} >
                    <BusinessCard
                        cardData={item}
                        setCardsArr={setCardsArr}
                        canEdit={payload && (payload.biz || payload.isAdmin) && item.user_id === payload._id }
                        canDelete={payload && (payload.isAdmin || (payload.biz && item.user_id === payload._id))}
                        canLike={payload && !item.likes.includes(payload._id)}
                        isOwnedBySelf={payload && item.user_id === payload._id}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CardGallery;