# Homagix frontend

Food shopping isn't fun. Especially if you have children and need or want to cook every day and those children aren't very interested in experimenting with new dishes. So, sonner or later, you will do the same few dishes again and again. I don't like this.

Sometimes, we _find_ some new dishes which are accepted by the children. I want to remember these. Unless then, I want to use all known dishes in a way that variety is maximized.

To do this in a more digital way, we created this repository to remember dishes, get more variety as well as simplify food shopping by having a list of ingredients which are needed for the dishes.

## Program parts

This is the frontend part of Homagix. It is most likely that you want to clone [the server part](https://github.com/homagix/homagix-server) as well.

## Adding recipes

Dishes are stored in [the server](https://github.com/homagix/homagix-server). Either you use the one we run on <https://homagix-server.justso.de> and get the dishes we like, or you run your own server and can store your own. Have a look at the repo, to learn how.

## Install and run

    git clone https://github.com/homagix/homagix-frontend.git
    npm install --production
    npm build
    npm start
    open http://localhost:3000/

### development version

If you want to install a development version, use the following npm commands after cloning instead:

    npm install
    npm run dev

## Use pre-installed version on GitHub Pages

You can also use the [frontend in Github Pages](https://homagix.github.io/homagix-frontend/). However, you will still need a server backend where dishes are stored. By default, a sample server <https://homagix-server.justso.de> is used. To configure an own server, open the dev console in your browser and enter

    localStorage.setItem("basePath", "https://my-homagix-server.com:8200")

Replace the URL in this command by the one valid for your server (which would be on your local machine in this example).

## Use mock server

You can also run a server mock by setting the environment variable `VITE_MOCK_SERVER=true` in `.env.local` and restart `npm run dev`.
