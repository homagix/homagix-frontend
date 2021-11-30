# Homagix frontend

Food shopping isn't fun. Especially if you have children and need or want to cook every day and those children aren't very interested in experimenting with new dishes. So, sonner or later, you will do the same few dishes again and again. I don't like this.

Sometimes, we _find_ some new dishes which are accepted by the children. I want to remember these. Unless then, I want to use all known dishes in a way that variety is maximized.

To do this in a more digital way, we created this repository to remember dishes, get more variety as well as simplify food shopping by having a list of ingredients which are needed for the dishes.

## Program parts

This is the frontend part of Homagix. It is most likely that you want to clone [the server part](https://github.com/jschirrmacher/homagix-server) as well.

## Adding recipes

Dishes are stored in [the server](https://github.com/jschirrmacher/homagix-server/README.md#Adding).

## Install and run

    git clone https://github.com/jschirrmacher/homagix-frontend.git
    npm install --production
    npm build
    npm start
    open http://localhost:3000/

### developmen version

If you want to install a development version, use the following npm commands after cloning instead:

    npm install
    npm run dev
