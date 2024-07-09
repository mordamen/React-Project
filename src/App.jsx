import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	ThemeProvider,
	createTheme,
	CssBaseline,
	// CircularProgress,
	Box,
	Container,
	responsiveFontSizes,
	Typography,
	Button,
} from '@mui/material';
import Router from './routes/Router';
import useLoggedIn from './hooks/useLoggedIn';
import AddCardButton from './components/General Components/Add Card Button';
import ResponsiveAppBar from './components/Navbar/Navbar';
import Footer from './components/General Components/Footer';
import Skeleton from '@mui/material/Skeleton';

const themeMode = {
	light: {
		palette: {
			mode: 'light',
		},
	},
	dark: {
		palette: {
			mode: 'dark',
		},
	},
};

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const loggedIn = useLoggedIn();

	useEffect(() => {
		(async () => {
			try {
				await loggedIn();
				setIsLoading(false);
			} catch (err) {
				setError(err);
				setIsLoading(false);
			}
		})();
	}, [loggedIn]);

	const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.isDarkTheme);

	let theme = createTheme(isDarkTheme ? themeMode.dark : themeMode.light);
	theme = responsiveFontSizes(theme);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={true}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					margin: 'auto',
				}}
			>
				<ResponsiveAppBar component='header' />
				<Container
					component='main'
					className='page-main'
					disableGutters
					maxWidth='false'
					sx={{ display: 'flex', flexDirection: 'column', flex: '1', m: 'auto' }}
				>
					{isLoading ? (
						<Box sx={{ width: '100%', p: 2 }}>
							<Skeleton variant='text' />
							<Skeleton variant='rectangular' height={118} />
							<Skeleton variant='rectangular' height={118} />
						</Box>
					) : error ? (
						<Box sx={{ width: '100%', p: 2, textAlign: 'center' }}>
							<Typography variant='h6' color='error'>
								Failed to load data
							</Typography>
							<Button variant='contained' onClick={() => window.location.reload()}>
								Retry
							</Button>
						</Box>
					) : (
						<Router />
					)}
					<AddCardButton />
				</Container>
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
