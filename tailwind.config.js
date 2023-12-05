/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/layouts/main.handlebars",
            "./views/dashboard.handlebars",
            "./views/partials/login.handlebars",
            "./views/partials/register.handlebars",
            "./views/partials/incomeTable.handlebars",
            "./views/partials/filterForm.handlebars",
            "./views/homepage.handlebars"
          ],
  theme: {
    extend: {},
  },
  plugins: [],
}

