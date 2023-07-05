import { Grid } from "@mui/material";
import BusinessCard from "./Business Card";

const CardGallery = ({cardsArr, setCardsArr, payload}) => {

    return (
        <Grid className='card-gallery-container' columns={{ xs: 2, sm: 8, md: 12 }}justifyContent='space-evenly' sx={{m:'auto',}}>
            {cardsArr.map((item) => (
                <Grid item id='grid2' xs={2} sm={4} md={4} key={item._id + Date.now()} sx={{m:'1rem'}} >
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