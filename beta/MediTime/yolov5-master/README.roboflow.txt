
Pill Detection - v3 augmented-train-from-scratch
==============================

This dataset was exported via roboflow.ai on August 20, 2021 at 8:24 PM GMT

It includes 1083 images.
Pills are annotated in YOLO v5 PyTorch format.

The following pre-processing was applied to each image:
* Auto-orientation of pixel data (with EXIF-orientation stripping)
* Resize to 416x416 (Stretch)

The following augmentation was applied to create 3 versions of each source image:
* Equal probability of one of the following 90-degree rotations: none, clockwise, counter-clockwise, upside-down
* Randomly crop between 0 and 77 percent of the image
* Random rotation of between -45 and +45 degrees
* Random shear of between -15° to +15° horizontally and -15° to +15° vertically
* Random brigthness adjustment of between -33 and +33 percent
* Random exposure adjustment of between -25 and +25 percent
* Random Gaussian blur of between 0 and 3 pixels
* Salt and pepper noise was applied to 5 percent of pixels

The following transformations were applied to the bounding boxes of each image:
* Random brigthness adjustment of between -25 and +25 percent


