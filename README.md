# invoice-app

Web Application to create and manage the invoice, as well as scheduling the invoice creation for the future date. **NOTE**: This app still work on progress, not ready for use yet.

## How to run for the first time?

1. Make sure `mongod` instance is running, create a database with any name and the collection will be `clients`.
1. Edit the `mongoUrl` value in `api/config.js`, replace the end of the url with the database you just created.
1. Run `npm i` on root as well as on the `client` folder (will create some script later to simplify this)
1. Then run `npm start`, this will open the app on the browser (http://localhost:3000)
