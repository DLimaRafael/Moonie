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
- [x] Exporting and Importing Tasks
- [x] Custom Icon

_And that's all it needs!_

\*Tauri has limitations for the default formats it can bundle, so I'll be researching and studying how this can be done. Flatpak would be the ultimate solution for app distribution in all Linux platforms.

## Known Issues & Limitations

Currently, as Moonie uses Local Storage to store all your data, it is limited to around 5mb, which is plenty considering it only stores text. Since this is a minimal software, I don't think more than that is necessary for day-to-day planning, however, I might update the codebase in the future to acommodate larger amounts of data

I'm also aware of bugs regarding drag and drop, which is finnicky by itself, will do a major refactor of some code so it works as intended.

## External Tools Used

[Flowbite Icons](https://flowbite.com/icons/)
