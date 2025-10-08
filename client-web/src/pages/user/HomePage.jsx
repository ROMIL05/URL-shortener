import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Link2 } from 'lucide-react';
import UrlShortenerForm from '../../components/url/UrlShortenerForm';
import ShortUrlResult from '../../components/url/ShortUrlResult';

const HomePage = () => {
	const toast = useRef(null);
	const [url, setUrl] = useState('');

	const handleShorten = (url, error) => {
		if (url) {
			setUrl(url);
			toast.current.show({
				severity: 'success',
				summary: 'URL generated',
				detail: 'URL generated successfully!',
				life: 3000,
			});
		} else {
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: error,
				life: 3000,
			});
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		toast.current.show({
			severity: 'info',
			summary: 'Copied!',
			detail: 'URL copied to clipboard',
			life: 2000,
		});
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-50">
			<Toast ref={toast} />
			<div className="shadow-lg rounded w-full sm:w-[600px] p-7 space-y-10 border border-gray-200 bg-gradient-to-br from-blue-30 via-white to-gray-100">
				<div className="flex items-center gap-2 text-primary">
					<Link2 size={24} />
					<span className="font-semibold text-lg">URL Shortener</span>
				</div>
				<UrlShortenerForm onShorten={handleShorten} />
				<ShortUrlResult url={url} onCopy={handleCopy} />
			</div>
		</div>
	);
};

export default HomePage;
