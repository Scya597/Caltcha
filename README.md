
# Caltcha &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## 0. Table of Contents  
- [Setup Mongodb](#1-setup-mongodb)
- [Development and Production](#2-development-and-production)


## 1. Setup Mongodb

### 1.1 To install mongodb

```
brew install mongo
```

### 1.2 Initial config of mongodb

Create database directory

```
sudo mkdir -p /data/db
```

Find your username

```
whoami
```

Taking ownership to /data/db

```
// assume your username is John
sudo chown -Rv John /data/db
```

### 1.3 To run the database

```
mongod
```

If you don't want to run mongod everytime you need, the following command will automatically start your database while the computer is running:

```
brew services start mongo
```

## 2. Development and Production


### 2.1 To install packages

```
npm install
```

### 2.2 To develop the project

```
npm run dev
```

### 2.3 Build production bundle and run the server

```
npm run build
npm start
```
