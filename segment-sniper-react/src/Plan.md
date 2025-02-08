implement roles / permissions around features

- add ability to refresh whole garage (look at last ~6 mos. of Strava activities and rebuild bikes)

- add ability to send reminder after event (date passed / mileage exceeded)
  - have a serverless function operate on a timer to inspect the mileage/dates
  - need to find way to mark reminders as being sent
  - need to be able to reset reminder?
