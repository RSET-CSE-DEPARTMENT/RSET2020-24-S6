def blur(image):
    import re

    import PIL
    import cv2
    import easyocr
    import numpy
    import numpy as np
    from PIL import Image

    import page2
    from ESRGAN import test

    def thick_font(image):
        import numpy as np
        image = cv2.bitwise_not(image)
        kernel = np.ones((2, 2), np.uint8)
        image = cv2.dilate(image, kernel, iterations=1)
        image = cv2.bitwise_not(image)
        return (image)

    def thin_font(image):
        import numpy as np
        image = cv2.bitwise_not(image)
        kernel = np.ones((2, 2), np.uint8)
        image = cv2.erode(image, kernel, iterations=1)
        image = cv2.bitwise_not(image)
        return (image)

    def noise_removal(image):
        image = numpy.asarray(image)
        # image0=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
        # thresh, im_bw = cv2.threshold(image0,200,255,cv2.THRESH_BINARY)
        kernel = np.ones((1, 1), np.uint8)
        image = cv2.dilate(image, kernel, iterations=1)
        kernel = np.ones((1, 1), np.uint8)
        image = cv2.erode(image, kernel, iterations=1)
        image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
        image = cv2.medianBlur(image, 3)
        return (image)


    sharpened = test.enhance(image)
    sharpened = test.enhance(sharpened)
    # cv2.imshow('return', sharpened)
    gray_img = cv2.cvtColor(sharpened, cv2.COLOR_BGR2GRAY)
    gray_img = noise_removal(gray_img)
    im_bw = thick_font(gray_img)
    # im_bw=thick_font(im_bw)
    sharpened = PIL.Image.fromarray(np.uint8(gray_img))
    # BW= sharpened.convert('1',dither=Image.NONE)
    # BW= BW.convert('1',dither=Image.NONE)
    BW = noise_removal(im_bw)
    # BW=noise_removal(BW)
    BW = PIL.Image.fromarray(np.uint8(BW))
    BW.save("BW_image.jpg")
    image = cv2.imread(r'BW_image.jpg')
    # cv2.imshow('1', image)
    # cv2.waitKey(0)

    reader1 = easyocr.Reader(['th'], gpu=False)
    ocr_result1 = reader1.readtext(image)
    reader2 = easyocr.Reader(['en'], gpu=False)
    ocr_result2 = reader2.readtext(image)
    print(ocr_result1)
    print(ocr_result2)
    print(len(ocr_result2))
    msg = "None"
    if (len(ocr_result2)) > 0:
        eng1 = ((ocr_result2[0])[1]).replace(" ", "")
        thi = ((ocr_result1[0])[1]).replace(" ", "")
        msg = ""
        if len(ocr_result2) > 2:
            for i in ocr_result1:
                pattern = '\d{2}-\d{4}'
                if re.match(pattern, i[1]):
                    print(i[1])
                    return(i[1])
        else:
            l = None
            j = len(eng1) - 4
            if len(eng1) > len(thi):
                l = len(eng1)
            else:
                l = len(thi)
            print(len((ocr_result1[0])[1]))
            print(j)
            if l > 6:
                for i in range(l):
                    if i == 0:
                        if eng1[i].isnumeric():
                            msg = msg + eng1[i]
                        else:
                            msg = msg + thi[i]
                    elif i > 2:
                        msg = msg + eng1[j]
                        j = j + 1
                    else:
                        msg = msg + thi[i]
            else:
                msg = thi

    print(msg)
    return msg