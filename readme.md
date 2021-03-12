
<div style="text-align: center;">
	<img src="http://i.imgur.com/ogUP6GJ.png" alt="Express API StartKit">
    <p>
        Express API StartKit
    </p>
    <br>
</div>

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a5bbca0e074745f4813552055c867b5d)](https://www.codacy.com/gh/borgert-inc/express-api-startkit/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=borgert-inc/express-api-startkit&amp;utm_campaign=Badge_Grade)

---

#### Nodemon
> npm install -g nodemon

#### Install packages
> npm install

#### Copy .ENV
> cp .env-example .env

#### Configure .env
> MONGO_DB=mongodb://localhost:27017/mongo_db

#### Development (With nodemon watch .js)
> npm run dev

> http://localhost:3000

#### Eslint
> npm run eslint

#### Slack
  - Get your legacy token https://api.slack.com/legacy/custom-integrations/legacy-tokens
  - Documentation and methods for slack https://api.slack.com/methods

#### Routes

Register
> POST http://localhost:3000/register

Login
> POST http://localhost:3000/auth/login

Logout
> POST http://localhost:3000/auth/logout

Users
> GET http://localhost:3000/users

> POST http://localhost:3000/users

> PUT http://localhost:3000/users/:id

> GET http://localhost:3000/users/:id

> DELETE http://localhost:3000/users/:id

#### Packages

| Package                   | Description                                                |
| :------------------------- | :---------------------------------------------------------- | 
| bcryptjs                  | Encrypt password  |
| body-parser               | Parser body express    |
| debug                     | For Debug    |
| dotenv-extended           | To work files .env    |
| eslint                    | Code standard    |
| express                   | Framework express    |
| consign                   | For load modules    |
| http-errors               | Controllers http errors     |
| method-override           | Overrise methods in express     |
| moment                    | To work with dates     |
| mongoose                  | ODM for database MongoDB    |
| mongoose-paginate-v2      | Paginate for mongoose    |
| mongoose-validator        | Validator inputs for mongoose    |
| winston                   | Logs generator    |
