Running the backend for this application will also require setting up a postgres database (this can be achieved using something like pgAdmin4). Once you have a database set up you can run the commands in the Postgresql_script.sql file in the resources folder. Finally, make sure that the spring.datasource.url, username, and password match your postres configuration. If using pgAdmin4, the default port is 5432, and you will need to replace postgres in jdbc:postgresql://localhost:5432/postgres with whatever your database name is. Similarly, the username and password will need to match your configuration.

Once you have the database set up, you can run locally by:
running build.bat script to build the application
running runLocal.bat to run start the application

This application runs locally on port 8081 - this can be adjusted in the local-application.properites file in the app-config directory.