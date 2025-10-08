import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const UrlShortenerForm = ({ onShorten }) => {
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: { originalUrl: '' },
		validationSchema: Yup.object({
			originalUrl: Yup.string()
				.url('Please enter a valid URL (must start with http or https)')
				.required('URL is required'),
		}),
	});

	const baseInputClass =
		'w-full p-2 rounded border border-gray-300 transition-all focus:ring-2 focus:ring-primary hover:border-primary';
	const btnClass =
		'bg-primary text-white text-lg px-5 py-2 rounded hover:primary-hover font-semibold';

	return (
		<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
					type="submit"
					label={loading ? 'Generating...' : 'Generate Short URL'}
					icon="pi pi-link"
					loading={loading}
					className={`${btnClass}`}
				/>
				<Button
					type="submit"
					label={loading ? 'Generating...' : 'Generate Original URL'}
					icon="pi pi-link"
					loading={loading}
					className={`${btnClass}`}
				/>
			</div>
		</form>
	);
};

export default UrlShortenerForm;
