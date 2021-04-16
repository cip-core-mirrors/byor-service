# BYOR Service

Backend server that loads data from multiple services

## Prerequisites

1. NodeJS and NPM
2. [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts) credentials. If you do not have one, please follow [this tutorial](https://medium.com/@a.marenkov/how-to-get-credentials-for-google-sheets-456b7e88c430)

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/cip-core-mirrors/byor-service.git
   
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Provide these information in environment variables :

   | Name | Description | Default value |
   |---|---|:-:|
   |`GOOGLE_CLIENT_EMAIL`|Email of the Google account used||
   |`GOOGLE_PRIVATE_KEY`|Private key of the Google account used||
   |`PORT`|Port the server listens to|3000|

## Start server

```sh
npm run start
```

The server will be launched and will listen at port 3000 by default (see http://localhost:3000)

Please note that the server can only access to Spreadsheets that it has access to (ie. shared access or public)
