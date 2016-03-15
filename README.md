# ForceServer and SOQLExplorer - 

ForceServer is a simple development server aimed at providing a simple and integrated developer experience when building applications that use Salesforce OAuth and REST services. ForceServer provides two main features:

- **A Proxy Server** to avoid cross-domain policy issues when invoking Salesforce REST services. (The Chatter API supports CORS, but other APIs don’t yet)
- **A Local Web Server** to (1) serve the OAuth callback URL defined in your Connected App, and (2) serve the whole app during development and avoid cross-domain policy issues when loading files (for example, templates) from the local file system.
- **ForceJS provides a simple Javascript library to use in your webpages.

This fork does a couple of things
- **Combined ForceServer and SOQLExplorer - into a single package to make it easier to deploy to Heroku
- **The home page in SOQLExplorer - display recent changes to Contacts and Cases. It refreshes every 60 seconds.
- **The "developer" tab shows the OAuth Token and allows you to 
- **This can be installed on localhost or on Heroku. If you are installing on Heroku, you'll need to create a new connected app and update js/app.js.

Code Highlights:

1. The website/application above uses the <a href="">ForceJS</a> library. ForceJS and ForceServer are built to work closely together and provide an integrated developer experience.
1. ForceJS uses a default connected app: No need to create a connected app to start development. You should however create your own connected app for production use.
1. ForceServer automatically serves the OAuth callback URL: No need to create a callback HTML page during development.


## Run the Server

To finish this doc.....

Navigate to the directory and type:

```
node server.js
``` 
    
This command will start the server on port 8200, and automatically load your app (http://localhost:8200) in a browser window. You'll see the Salesforce login window, and the list of contacts will appear after you log in.

You can change the port number using this command.

```
node server.js --port 8200
```

## Deploying to Heroku 

The ForceServer is CORS-enabled. Instead of running it locally as a development server, you can deploy it to Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Before you can use the app, you need to make two changes.

### Setup a Salesforce Connected App
1. Create a new Connected App. [Instructions.](https://help.salesforce.com/apex/HTViewHelpDoc?id=connected_app_create.htm&language=en_US)
2. Enable OAuth Settings.
3. After saving, Set the CIt will not work 
To use the Proxy Server deployed to Heroku, call the force.init() function before force.login() and specify your Proxy URL. For example, if the Heroku app you just created is **myproxy**:

```
force.init({
    proxyURL: 'https://myproxy.herokuapp.com'
});
```

