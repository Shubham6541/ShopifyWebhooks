# Shopify/webhooks

The complete project is hosted on heroku. Url for the website is  https://myshopifystore6541.herokuapp.com/

# Change Config
.env file contains the URI for mongodbconnection and the port number to host the server

## App on local host
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


Add shopify webhooks for local host
Add this link https://myshopifystore6541.herokuapp.com/order/create to shopify store for event order/create.	


## Deployment on heroku

### Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. 


1. git add .

2. git commit -m "committed msg"

3. heroku login
    Enter your Heroku credentials.
    ...
4. heroku create

5. git push heroku master

6. Click on the link provided to open the app

Add shopify webhooks deployed apps
Add this link (baseurl + /order/create) to shopify store for event order/create.
