# Week 2: 3D Interactive Personal Portfolio

A responsive personal portfolio built with plain HTML, CSS and JavaScript, using layered parallax and 3D card effects.

**Live demo:** https://internlytic-frontend-phase1.vercel.app

## Features

- **Sections:** Home, About, Skills, Projects and Contact
- **Parallax depth:** background shapes in the hero move at different speeds while scrolling
- **3D card tilt:** cards respond to mouse movement using CSS 3D transforms
- **Reveal animations:** sections fade in as they scroll into view
- **Validated contact form:** checks name, email format and message length
- **Responsive layout:** works on phones, tablets and desktops, with no horizontal overflow
- **Accessibility:** form labels, readable contrast, and reduced-motion support

## Tech Stack

HTML5, CSS3 (Grid, Flexbox, 3D transforms, custom properties), vanilla JavaScript (IntersectionObserver, requestAnimationFrame)

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/minahil607/internlytic-frontend-phase1.git
   ```
2. Open the `week-2-portfolio` folder.
3. Open `index.html` in your browser, or use the VS Code **Live Server** extension.

No installation or build step is needed.

## Design Notes

- **Concept:** floating layered shapes behind the hero text, plus tilting cards for skills and projects.
- **Performance:** scroll effects use `requestAnimationFrame`, there are no heavy libraries, and no continuous animation loop runs.
- **Reduced motion:** if a visitor's system has reduced motion enabled, parallax and tilt are switched off and content shows immediately.
- **Touch devices:** tilt is mouse-only. All content and navigation work without hover.
- **Privacy:** no phone number or home address is published on the site.

## Known Limitations

- The contact form validates input but does not send messages. It is a front-end demo that could be connected to a service such as Formspree.
- Tilt effects do not apply on touch screens.

## Author

Minahil Ashraf | [GitHub](https://github.com/minahil607)