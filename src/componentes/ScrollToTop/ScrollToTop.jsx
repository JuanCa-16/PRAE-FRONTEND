import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		const loginContent = document.querySelector('.completo');
		if (loginContent) {
			loginContent.scrollTo(0, 0);
		}

		const mainContent = document.querySelector('.main-content');
		if (mainContent) {
			mainContent.scrollTo(0, 0);
		}

		window.scrollTo({ top: 0, behavior: 'instant' });

		const body = document.body;
        if (body) {
            body.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
	}, [pathname]);

	return null;
};

export default ScrollToTop;
