# Cron Job

We utilize a simple Python script to algorithmically select a League of Legends champion each day. The selected champion is stored in our database where each client obtains the daily champion for users to guess.

### Algorithm

[Weighted Random](https://dev.to/jacktt/understanding-the-weighted-random-algorithm-581p)

## Setting the Crontab

Run `./set-crontab.sh` to automatically write the Job to your local crontab. **_warning: this will overwrite your existing Jobs!_**

If you wish to set the job manually: `CRON_LINE="0 0 * * * cd <LOCAL PATH TO LOLDLE-BOT> && <LOCAL PATH TO DOCKER> compose run --rm cronjob >> <LOCAL PATH TO LOLDLE-BOT/CRONJOB>/cronjob.log 2>&1"`

Alternatively, you can manually run `docker compose run --rm cronjob` which will start the cronjob service container, execute the Python script, then destroy the container.
