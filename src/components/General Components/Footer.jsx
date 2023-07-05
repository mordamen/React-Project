import { Container, Typography, IconButton, AppBar} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {

    return (
        <AppBar position="static" sx={{ width:'100%', opacity: 0.8, pt: 1 }} component='footer'>
            <Container maxWidth='false' className='page-footer' >
                <Typography variant="body2" align="center" fontWeight={600}>
                    © {new Date().getFullYear()} Yehuda Sapir
                </Typography>
                <Typography variant="body2" align="center">
                    <IconButton href="https://www.linkedin.com/in/yehuda-sapir/">
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton href="https://github.com/Mordamen">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href="https://wa.me/97254547893">
                        <WhatsAppIcon />
                    </IconButton>
                </Typography>
            </Container>
        </AppBar>
    );
};

export default Footer;
