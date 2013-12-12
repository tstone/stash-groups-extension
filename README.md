## Stash Groups Chrome Plugin ##

A simple plugin that allows the user to save a "group" of approvers for a pull request and recall them at a future point.  The UI is presented on the create pull request screen.

Current implementation is extremely simple but functional.  Pull requests welcome.

### Installation ###

- Clone the git repo
- Drag the stash.crx file in the /dist directory onto the Chrome extensions window.  It will prompt you to install.

### Building Locall ###

- Open Chrome
- Open the Extensions tab
- Check "Developer Mode"
- Click "Pack Extension" and select the /src folder

### TODO ###

- Tests
- Improve the UI with CSS/layout
- Support the "Edit Pull Request" dialog
- Support more than 1 group
