## Technical requirements

- Use 18 LTS version of Node.js

## Usage
#### Install project
```
git clone {repository_url}
npm install
```
Create `.env` file with content from `.env.example`

#### Lunch project in development mode
```
npm run satat:dev
```

#### Lunch project in production mode
```
npm run satat:prod
```

#### Lunch test
```
npm run test
```

## Implementation details
- **GET** `api/users` is used to get all persons
- **GET** `api/users/{userId}` is used to get user
- **POST** `api/users` is used to create record about new user and store it in database
- **PUT** `api/users/{userId}` is used to update existing user
- **DELETE** `api/users/{userId}` is used to delete existing user from database
