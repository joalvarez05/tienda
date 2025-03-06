module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("ADMIN_JWT_SECRET"),
    },
  },
  apiToken: env("STRAPI_API_TOKEN"),
});
