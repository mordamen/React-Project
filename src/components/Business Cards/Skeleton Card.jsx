import { Box, Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const CardPreview = () => {
	const skeletonCount = 6;

	return (
		<Grid container spacing={2} className='card-gallery-container' columns={{ xs: 1, sm: 2, md: 4 }}>
			{Array.from({ length: skeletonCount }, (_, index) => (
				<Grid key={index}>
					<Box>
						<Skeleton
							animation='wave'
							variant='rounded'
							sx={{
								bgcolor: 'grey.900',
								width: { xs: 270, sm: 360, md: 480 },
								height: { xs: 180, sm: 240, md: 320 },
							}}
						/>
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

export default CardPreview;
