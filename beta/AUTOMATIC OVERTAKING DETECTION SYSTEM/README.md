## **Automated Overtaking Detection System For Bridges**

This project we have developed an automatic overtaking detection system that helps to
identify people who overtake vehicles in bridges, accurately recording the violators’ details
to the database. The officials upload a camera footage, the program then uses machine
learning and object detection to identify the violators, take the image, understand and
extract the part of the image that shows the number plate of cars. We then use optical
character recognition (OCR) to extract the characters from the region of interest and add
it to the database.
Due to lack of dataset we have chosen an highway input instead of bridges.
## Deployment

To deploy this project run

```bash
  python Log.py
```
## Backend Demo

![Gif](https://github.com/Rahul6111/RSET2020-24-S6/assets/95371610/fec61cf9-e077-4327-84c0-8f49ec8e556c)

## Demonstration
<iframe width="560" height="315" src="https://youtu.be/8ecjzT61FY8" frameborder="0" allowfullscreen></iframe>





