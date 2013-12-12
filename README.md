## Stash Groups Chrome Plugin ##

A simple plugin that allows the user to save a "group" of approvers for a pull request and recall them at a future point.  The UI is presented on the create pull request screen.

### Preview ###

![screenshot](https://github.com/tstone/stash-groups-extension/raw/master/doc/ss.png)

### Installation ###

- Clone the git repo
- Drag the src.crx file in the /dist directory onto the Chrome extensions window.  It will prompt you to install.

### Building Locally ###

- Open Chrome
- Open the Extensions tab
- Check "Developer Mode"
- Click "Pack Extension" and select the /src folder

### Usage ###

- Start a new pull request
- Add some reviewers
- Click the "gear" icon to save them
- They're now saved.  If you refresh the page they will automatically be added for you.

### TODO ###

- Tests
- Allow reviewers to be removed by clicking "x"
- Support the "Edit Pull Request" dialog
- Support more than 1 group
- Allow a default branch to be saved as well
