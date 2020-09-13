# College_feedback_service

## Set up the database

```bash
cd db
```
start mysql in terminal
```bash
mysql -u USERNAME -p
```
```bash
source fb_ddl.sql;

source fb_dml.sql;
```
## Set up the server
```bash
cd fbServer

npm start
```
## Start the client
```bash
cd fbClient

npm run dev
```
