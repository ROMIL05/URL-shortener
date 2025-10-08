import React from 'react';
import { Button } from 'primereact/button';
import { CheckCircle2, Copy } from 'lucide-react';

const ShortUrlResult = ({ url, onCopy }) => {
	if (!url) return null;

	return (
		<div className="mt-10 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-green-700 font-medium flex items-center gap-2 break-words overflow-x-auto scrollbar-hide"
			>
				<CheckCircle2 size={18} />
				{url}
			</a>
			<Button
				icon={<Copy size={16} />}
				onClick={onCopy}
				className="bg-transparent border border-none text-primary"
				tooltip="Copy"
			/>
		</div>
	);
};

export default ShortUrlResult;
