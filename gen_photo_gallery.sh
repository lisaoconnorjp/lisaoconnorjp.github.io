#!/bin/bash

# Define the path to the image directory
IMAGE_DIR="repo/images/photo_gallery/"
OUTPUT_FILE="gallery_images.txt"

# Start with an empty output file
> "$OUTPUT_FILE"

# Iterate over each image file in the directory
for file in "$IMAGE_DIR"*; do
    # Ensure we are processing only files (not directories)
    if [[ -f "$file" ]]; then
        # Get the base filename without the path
        filename=$(basename "$file")

        # Remove the file extension (.jpg or .JPG) to use in the alt attribute
        alt_text="${filename%.*}"

        # Append the formatted HTML string to the output file
        echo "          <img" >> "$OUTPUT_FILE"
        echo "            src=\"${IMAGE_DIR}${filename}\"" >> "$OUTPUT_FILE"
        echo "            class=\"corners clickable-image\"" >> "$OUTPUT_FILE"
        echo "            alt=\"${alt_text}\"" >> "$OUTPUT_FILE"
        echo "            onclick=\"openPopup('${IMAGE_DIR}${filename}', this.alt)\"" >> "$OUTPUT_FILE"
        echo "          />" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi
done

echo "HTML snippets generated in $OUTPUT_FILE"
