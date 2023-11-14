I Want It Data Way Frontend
---
Ensure API is running on port 8080.

After cloning from GitHub, run `npm install` to install packages.

RUNNING ON MAC:
---
Set the enivronment variable for the API_BASE_URL:

`export API_BASE_URL=http://localhost:8080/api`

Run `npm start` to start frontend application.


RUNNING ON WINDOWS:
---
Set the environment variable for the API_BASE_URL:

`New-Item -Path Env:API_BASE_URL -Value http://localhost:8080/api`

Run `npm run start-win` to start frontend application.

If `npm run start-win` does not work, run each of these commands separately:

```
npx tsc
copy -R views dist
copy -R public dist
copy -R images dist
node dist/app.js
```

Once the frontend is running, open `http://localhost:3000` in your browser.

RUNNING UNIT TESTS
---
Run `npm test`.