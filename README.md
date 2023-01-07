# RobotCombatOverlay
Arena and stream display for robot combat events

## To Use
Import `websocket server.json` into Node Red. Deploy to create a websocket server allowing communication between `overlay.html` and `controls.html`. Open `overlay.html` as a browser source in OBS. Use `controls.html` to control it. Running the HTML files as local files *should* work, but if not, I've been running it using the Live Server extension in VS Code

## Notes
This is very much a work in progress. There's enough here that I'm comfortable saying I can have v1 working this weekend. The background image on the overlay is just there so I have something to simulate the effect of putting the overlay over a video of the arena.

## Next
For January event:
* Better styling
* Read robots from an external source (probably the Google Sheet that Kristen is using for check-in)
* Implement timer (hopefully triggered by arena control, otherwise a button to stop and start)
* Add selection for which round of the tournament we're in
* Add robot pictures (hopefully)

## Other goals
* Control overlay from OBS *or* control OBS from control page for overlay
* More convenient setup
* Better communication with arena
