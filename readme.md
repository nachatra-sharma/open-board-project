# Online Drawing Board

An interactive online drawing board application built using HTML, CSS, and JavaScript with Socket.io for real-time collaboration. Users can draw, erase, and share their artwork in real time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Real-time drawing collaboration using Socket.io
- Multiple colors and stroke widths
- Eraser tool to remove strokes
- Undo and redo functionality
- Download your artwork as an image

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Real-time Communication:** Socket.io
- **Template Engine:** EJS (Embedded JavaScript templates)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nachatra-sharma/open-board-project
   cd <your-repo-name>
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3000/

## Usage

1. On the home page, you'll see the drawing canvas along with tools for selecting colors, pencil width, and eraser width.

2. Click the pencil icon to reveal the pencil tool and choose your preferred color and stroke width.

3. To draw, click and drag your mouse or finger on the canvas.

4. Use the eraser icon to remove strokes. Adjust the eraser width if needed.

5. You can undo or redo your actions using the corresponding buttons.

6. To save your artwork, click the download icon to download your drawing as an image file.
