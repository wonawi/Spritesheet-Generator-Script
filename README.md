# Spritesheet Generator for Adobe Photoshop

A script for Adobe Photoshop that creates spritesheets from visible layers or groups in your document.

## Overview

This script allows you to quickly generate spritesheets for game development, animation, or web projects. It takes the visible layers or groups in your current Photoshop document and arranges them into a grid-based spritesheet.

## Installation

1. Download the `SpriteSheet Generator.jsx` file
2. Place it in your Photoshop Scripts folder:
   - Windows: `C:\Program Files\Adobe\Adobe Photoshop [version]\Presets\Scripts\`
   - macOS: `/Applications/Adobe Photoshop [version]/Presets/Scripts/`
3. Restart Photoshop
4. The script will be available under File > Scripts > SpriteSheet Generator

## Usage

1. Open a Photoshop document containing the frames you want to include in your spritesheet
2. Make sure the layers or groups you want to include are visible (hidden layers will be ignored)
3. Run the script from File > Scripts > SpriteSheet Generator
4. Configure your settings in the dialog
5. Click either "Generate Spritesheet" or "Save PNG" depending on your needs

## Features

### Generation Options

- **Layers to Frames**: Each visible layer becomes a frame in the spritesheet
- **Layers & Groups to Frames**: Both visible layers and groups become frames
- **Groups to Rows of Frames**: Each group becomes a row in the spritesheet, with its layers as frames

### Layout Control

- **Columns**: Specify how many columns your spritesheet should have
  - The preview updates automatically as you type
  - Changes take effect immediately without needing to click a button

### Output Options

- **Generate Spritesheet**: Creates a new Photoshop document with the spritesheet
- **Save PNG**: Generates the spritesheet and immediately saves it as a PNG file to a location you choose
- **Cancel**: Closes the dialog without making any changes

## Preview

The preview panel shows you information about the spritesheet that will be generated:
- Total number of frames
- Layout dimensions (columns × rows)
- Total pixel dimensions
- Frame size

## Notes

- The script automatically adds guides to the generated spritesheet to help with slicing
- The original document remains unchanged
- The script uses the current document's dimensions for each frame in the spritesheet
- Only visible layers are included in the spritesheet
