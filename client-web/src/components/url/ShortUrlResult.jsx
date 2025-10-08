import React from 'react';
import { Button } from 'primereact/button';
import { CheckCircle2, Copy } from 'lucide-react';

const ShortUrlResult = ({ shortUrl, onCopy }) => {
	if (!shortUrl) return null;

	return (
		<div className="mt-10 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
			<a
				href={shortUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="text-green-700 font-medium flex items-center gap-2"
			>
				<CheckCircle2 size={18} />
				{shortUrl}
			</a>
			<Button
				icon={<Copy size={16} />}
				onClick={onCopy}
				className="p-button-text p-button-sm"
				tooltip="Copy"
			/>
		</div>
	);
};

export default ShortUrlResult;
