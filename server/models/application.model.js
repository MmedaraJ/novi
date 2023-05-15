const mongoose = require('mongoose');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const ApplicationSchema = new mongoose.Schema({
    user_id: { 
        type: String,
        required: [
            true,
            "User is required"
        ],
        trim: true,
    },
    job_id: {
        type: String,
        required: [
            true,
            "Job is required"
        ],
        trim: true
    }
}, { timestamps: true });

ApplicationSchema.post('save', function() {
    const application = this.toObject();
    application.doc_id = application._id.toString();
    delete application._id;

    client.index({
      index: 'applications',
      body: application,
    }, (err) => {
      if (err) console.log(err);
    });
});
  
ApplicationSchema.post('remove', function(doc) {
    client.delete({
        index: 'applications',
        id: doc._id.toString(),
    }, (err) => {
        if (err) console.log(err);
    });
});
  
module.exports.Application = mongoose.model('Application', ApplicationSchema);