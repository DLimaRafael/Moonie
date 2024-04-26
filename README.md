# Moonie

Small App for Task Tracking without any of the extra bells and whistles.

## TO-DO

- [1/2] Tauri integration for desktop app (Windows and Linux)
  - [x] msi, deb, appImage
  - [ ] flatpak\*
- [x] Sub Tasks
- [1/2] Tagging and Searching
  - [1/2] Tagging
    - [ ] Turning the tag dialog into a popover (+ Auto Positioning)
    - [x] Editing and Deleting Tags
  - [x] Searching
    - [x] Filter by Text
    - [x] Filter by Tags
- [ ] Exporting and Importing Tasks
- [ ] Customization
  - Interface Scale
  - Themes
- [ ] Custom Icon

_And that's all it needs!_

\*Tauri has limitations for the default formats it can bundle, so I'll be researching and studying how this can be done. Flatpak would be the ultimate solution for app distribution in all Linux platforms.

## Known Issues & Limitations

Currently, as Moonie uses Local Storage to store all your data, it is limited to around 5mb, I intend to work on this, possibly by transitioning to SQLite or something similar in the future. Either way, this will be worked on when importing and exporting data is implemented.

## External Tools Used

[Flowbite Icons](https://flowbite.com/icons/)
