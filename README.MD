# Journal App
<div>
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="ReactJs" src="https://img.shields.io/badge/ReactJs-45b8d8?style=for-the-badge&logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-43853d?style=for-the-badge&logo=Vite&logoColor=white" />
  <img alt="Jest" src="https://img.shields.io/badge/-Jest-15c213?style=for-the-badge&logo=jest&logoColor=white" />
  <img alt="Firebase" src="https://img.shields.io/badge/-Firebase-b0b518?style=for-the-badge&logo=firebase&logoColor=white" />
  <img alt="Firebase" src="https://img.shields.io/badge/-MUI-165fcc?style=for-the-badge&logo=MUI&logoColor=white" />
</div>
  
Vite web application to search gifts.

Demo app: https://antonio152.github.io/journal-app/

## Installation

1 - Use ```git clone url``` to clone the project into your own repository

2 - Use ```npm i``` to install the packages

3 - Use ```npm run dev``` to run the app

## Directory

```js
src/
// Api functions
|--api/
   |--loadNotes.ts
//Validate the session of the user
|--auth/
   |--hooks/
    |--...
// Configuration of firebase
|--firebase/
    |--config.ts
    |--providers.ts
   |--...
// Functions to upload and delete images from cloudinary
|--helpers/
    |--fileUpload.ts
// Main app design
|--journal/
   |--Components/
    |--...
// Routes
|--router/
   |--AppRouter.ts
//Redux configuration
|--store/
    |--store.ts
//MUI Theme
|--theme/
    |--index.ts
//UI checking auth
|--componets
    |--CheckingAuth.ts
```


## Contributing
Want to contribute? Great!
Pull requests are allowed ;)

## License
[MIT](https://choosealicense.com/licenses/mit/)