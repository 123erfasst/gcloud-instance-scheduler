const cloud = require('google-cloud');

const handler = (req, res, method) => {
    const gce = cloud.compute();

    if(!req.header('X-Appengine-Cron')) {
        return res.status(400).json({
            type: 'Unauthorized',
            message: 'Only cron jobs have access'
        });
    }

    const {instances} = req.params;
    if(!instances) {
        return res.status(400).json({
            type: 'InstanceNotDefined',
            message: 'Please define at least one instance'
        });
    }

    Promise.all(
        instances.split('|').map(
            name => gce
                .zone(name.split(':')[0])
                .vm(name.split(':')[1])[method]()))
        .then(() => {
            res.status(200).send('Successfully stopped').end();
        });
};

module.exports = handler;