import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { fetchPost } from '../../utils/fetch.utils';

const UrlShortenerForm = ({ onShorten }) => {
	const [shortLoading, setShortLoading] = useState(false);
	const [longLoading, setLongLoading] = useState(false);

	const handleGenerateShortUrl = async (originalUrl) => {
		const errors = await formik.validateForm();
		if (errors.originalUrl) {
			formik.setTouched({ originalUrl: true });
			return;
		}

		setShortLoading(true);
		try {
			const data = await fetchPost({
				pathName: 'url/generate-shorten',
				body: JSON.stringify({ originalUrl }),
			});

			if (data.shortUrl) {
				onShorten(data.shortUrl);
				formik.resetForm();
			} else {
				onShorten(null, data.message || 'Something went wrong');
			}
		} catch (error) {
			onShorten(null, 'Server connection failed');
			console.error(error);
		} finally {
			setShortLoading(false);
		}
	};

	const handleGenerateOriginalUrl = async (shortUrl) => {
		const errors = await formik.validateForm();
		if (errors.originalUrl) {
			formik.setTouched({ originalUrl: true });
			return;
		}

		setLongLoading(true);
		try {
			const data = await fetchPost({
				pathName: 'url/generate-original',
				body: JSON.stringify({ shortUrl }),
			});

			if (data.originalUrl) {
				onShorten(data.originalUrl);
				formik.resetForm();
			} else {
				onShorten(null, data.message || 'Something went wrong');
			}
		} catch (error) {
			onShorten(null, 'Server connection failed');
			console.error(error);
		} finally {
			setLongLoading(false);
		}
	};

	const formik = useFormik({
		initialValues: { originalUrl: '' },
		validationSchema: Yup.object({
			originalUrl: Yup.string().url('Please enter a valid URL').required('URL is required'),
		}),
		onSubmit: (values, { resetForm }) => {
			resetForm();
		},
	});

	const baseInputClass =
		'w-full p-2 rounded border border-gray-300 transition-all focus:ring-2 focus:ring-primary hover:border-primary';
	const btnClass =
		'bg-primary text-white text-lg px-5 py-2 rounded hover:primary-hover font-semibold';

	return (
		<form className="flex flex-col gap-4">
			<div className="flex flex-col gap-2 mb-5">
				<label htmlFor="originalUrl" className="font-medium">
					Enter Your URL
				</label>
				<span className="p-input-icon-left w-full">
					<InputText
						id="originalUrl"
						name="originalUrl"
						value={formik.values.originalUrl}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className={`w-full placeholder:text-gray-400 placeholder:text-lg text-lg ${baseInputClass}  ${
							formik.touched.originalUrl && formik.errors.originalUrl
								? 'p-invalid'
								: ''
						}`}
						placeholder="https://example.com/very-long-URL-link"
					/>
				</span>
				{formik.touched.originalUrl && formik.errors.originalUrl && (
					<small className="p-error text-sm">{formik.errors.originalUrl}</small>
				)}
			</div>

			<div className="flex justify-between gap-10">
				<Button
					type="button"
					label={shortLoading ? 'Generating...' : 'Generate Short URL'}
					icon="pi pi-link"
					loading={shortLoading}
					className={btnClass}
					onClick={() => handleGenerateShortUrl(formik.values.originalUrl)}
				/>
				<Button
					type="button"
					label={longLoading ? 'Generating...' : 'Generate Original URL'}
					icon="pi pi-link"
					loading={longLoading}
					className={btnClass}
					onClick={() => handleGenerateOriginalUrl(formik.values.originalUrl)}
				/>
			</div>
		</form>
	);
};

export default UrlShortenerForm;
