module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    }
  }
process.env = Object.assign(process.env, {
  VITE_CLOUDINARY_CLOUD_NAME: "dmvy2o9vv"
})
//process.env.VITE_CLOUDINARY_CLOUD_NAME