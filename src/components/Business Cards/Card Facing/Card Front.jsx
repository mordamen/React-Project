import { Box, Card, IconButton } from "@mui/material";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import { Fragment } from "react";


function CardFront({ img, setShowFront }) {

    return (
        <Fragment>
        <Card raised className="card-front"
            sx={{
                backgroundImage: `url(${img})`,
            }}
        >
            <Box className='flip-icon'>
                <IconButton color="primary" aria-label="flip card" onClick={() => { setShowFront((v) => !v); } }>
                    <SwitchAccessShortcutIcon />
                </IconButton>
            </Box>
        </Card>
        </Fragment>
    );
}

export default CardFront;