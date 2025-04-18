# Clayton Headley

For your consideration. I completed as much of the assignment as I could, there seems to be an issue with video playback in chromium.

I used a Page Object Model to hold the page data and linked that into the E2E tests. The tests can be executed via the E2E command from the project root.

I used PNPM as the package manager so the lock file reflects that.

Server is setup with the create, update, and delete endpoints. I was hitting up against the 4 hour mark but my next steps were as follows:

- Update the datastore to act as more of a database by moving to a hash table.
- Writing the controller into a full object
- Fleshing out the unit tests for the API
- Documentation

Since no primary key was given I used the username as a unique ID for keeping users unique.
User is already setup as an object so adding more fields should be straightforward, moving the flat data into a hashmap would speed up the index time, so would moving to a relational DB.