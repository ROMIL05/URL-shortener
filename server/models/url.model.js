const mongoose = required('mongoose');

const urlSchema = new mongoose.Schema(
	{
		originalUrl: {
			type: String,
			required: true,
		},
		shortUrl: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const urlmodel = mongoose.model('urls', urlSchema);
export default urlmodel;
