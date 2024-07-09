import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	useTheme,
} from '@mui/material';

import { aboutContent } from '../../../../constants';

const InfoCard = () => {
	const theme = useTheme();

	const Content = (title, text) => (
		<Grid item xs={12} md={6}>
			<CardContent>
				<Typography variant='h6' component='h3' gutterBottom>
					{title}
				</Typography>
				<Typography variant='body1' component='p'>
					{text}
				</Typography>
			</CardContent>
		</Grid>
	);

	return (
		<Grid item xs={12}>
			<Card sx={{ backgroundColor: theme.palette.info.main, padding: '1rem' }}>
				<Grid container alignItems={'center'}>
					<Content title={aboutContent[0].title} text={aboutContent[0].text} />
					<Grid item xs={12} md={6}>
						<CardMedia
							component='img'
							alt='Screenshot'
							image={aboutContent[0].image}
						/>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
};

export default InfoCard;
