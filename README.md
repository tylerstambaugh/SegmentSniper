# Sanders Rules

Segment Sniper
=======

Description
------
The Segment Sniper app is a companion application for [Strava](https://www.strava.com) users built using .Net 7 and React. Its primary function is to use the Strava API and aggregate segment data for an athlete allowing them to target specific segments from their past activities in which they are near the KOM or near the top 10 leaderboard. It is being developed with bicycle riding as the primary activity. It requires the authenticated Strava user to be a a 'Premium' Strava subscriber as the Strava API endpoints for the segment details requires the subscription. 

#### Use Cases Being Coded:
1. Show me all segments for an activity ID in which a Strava User is a specific time from the KOM or Leaderboard

   1. Example: For Activity xyz, get a list of all segments that a Strava Athlete is 30 seconds (configurable) from the KOM or Leaderboard.
   2. Example: For Activity xyz, get a list of all segments that a Strava Athlete is 5% (configurable) from the KOM or Leaderboard.
2. Get a list of all segments from all activities for a time range that meet the above criteria.

   1. Example: Get a list of all segments from all activities between 4/1/2022 and 5/1/2022 that a Strava Athlete is 30 seconds (configurable) from the KOM or Leaderboard.
   2. Example: Get a list of all segments from all activities between 4/1/2022 and 5/1/2022 that a Strava Athlete is 10% (configurable) from the KOM or Leaderboard.

3. Star all segments returned from one of the lists above for a Strava Athlete. This is useful for athletes that have GPS devices with "Live Segments" so they can automatically be notified when approaching a segment in which they are 5% or 30 seconds from the KOM or Leaderboard. 

#### A user of the app must authorize the app in order for the app to receive and use a token to communicate with the Strava API for the Strava Athlete. The tokens are short lived, expire and must be refreshed every 2 weeks or app re-authorization is required. Detailed instructions for obtaining a token are listed below.

_Information about the [Stava API](https://developers.strava.com/)_


Table of Contents
------

Project Structure
------


How to install and run the project
------

How to use the app
------

