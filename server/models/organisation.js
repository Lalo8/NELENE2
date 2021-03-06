const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CATEGORIES = [ 'startup', 'incubator', 'investmentfund' ];
const STATUSES_ORG = [ 'pending', 'accepted', 'rejected'];
const NEEDS = ['recruitment', 'location', 'seed funding']
const TYPES = ['tech', 'social business']
const organizationSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	contact: {
		type: String, 
		required: true, 
	},
	address: {
		type: String, 
		required: true, 
		
	},
	country: {
		type: String, 
		required: true, 
		
	},
	city: {
		type: String, 
		required: true, 
		
	},
	category: {
		type: String,
		enum: CATEGORIES,
		default: 'startup',
    },
    needs: [{
		type: String,
		enum: NEEDS,
		default: 'recruitment',
	}],
	type: {
		type: String,
		enum: TYPES,
		default: 'social business',
	},
	status: {
		type: String,
		enum: STATUSES_ORG,
		default: 'pending',
	},
	ownerId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	location: { 
			type: { type: String }, 
			coordinates: [Number] 
		},
	img: { 
		type: String
	}
	
});

module.exports = mongoose.model('Organisation', organizationSchema);
