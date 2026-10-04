# EspireTech

A static website made with HTML, CSS, and JavaScript. There is no install step and no build step. Open `index.html` in a browser, or publish this folder with GitHub Pages.

## Publish on GitHub Pages

1. Create a new repository on GitHub.
2. Upload these files to the **root** of the repository. `index.html` should sit next to the `css`, `js`, and `images` folders, not inside another folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose your default branch (usually `main`) and the folder **`/ (root)`**, then save.
6. After a minute, GitHub shows the site address:
   - User or organization site: `https://YOUR-USERNAME.github.io/`
   - Project site: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

The empty `.nojekyll` file tells GitHub to serve the site as plain files.

## Change the contact email

The contact address is `lakshay@espiretech.in`. Search the project for that address if you need to change it. It is used in the contact section and in the form.

The form opens the visitor’s email app with the message filled in. GitHub Pages cannot send email on its own, so the form does not use a server.

## Edit the site

- Copy, services, and projects: `index.html`
- Colors and layout: `css/styles.css`
- Menu, project filters, and the contact form: `js/main.js`
