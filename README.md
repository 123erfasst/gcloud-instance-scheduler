# gcloud-instance-scheduler

This is an App Engine in Node.js, that will start and stop your Compute Engine instances automatically.

## Usage

1. Download and unzip the latest [release](https://github.com/123erfasst/gcloud-instance-scheduler/releases)

2. Run `npm i` to install the dependencies.

3. Configure the Scheduling in `cron.yaml`. You can find more information about scheduling an App Engine [here](https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml).

    The configuration may look like this:
    ```yaml
    cron:
      - description: daily start job
        url: /start/instance1-zone:instance1-name|instance2-zone:instance2-name
        schedule: every mon,tue,wed,thu,fri 07:00
      - description: daily stop job
        url: /stop/instance1-zone:instance1-name|instance2-zone:instance2-name
        schedule: every mon,tue,wed,thu,fri 18:00
    ```

4. Deploy your App Engine. You can find more information about deploying your App Engine [here](https://cloud.google.com/appengine/docs/flexible/nodejs/quickstart)