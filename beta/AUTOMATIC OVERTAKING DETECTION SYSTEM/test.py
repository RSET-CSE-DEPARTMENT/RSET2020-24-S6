import os.path as osp
import glob
import cv2
import numpy as np
import torch
from ESRGAN import RRDBNet_arch as arch

def enhance(img):
    model_path = 'ESRGAN/models/RRDB_ESRGAN_x4.pth'  # models/RRDB_ESRGAN_x4.pth OR models/RRDB_PSNR_x4.pth
    device = torch.device('cuda')  # if you want to run on CPU, change 'cuda' -> cpu
    # device = torch.device('cpu')

    test_img_folder = 'LR/*'

    model = arch.RRDBNet(3, 3, 64, 23, gc=32)
    model.load_state_dict(torch.load(model_path), strict=True)
    model.eval()
    model = model.to(device)

    print('Model path {:s}. \nTesting...'.format(model_path))
    # base = osp.splitext(osp.basename(img))[0]
    img = img * 1.0 / 255
    img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
    img_LR = img.unsqueeze(0)
    img_LR = img_LR.to(device)

    with torch.no_grad():
        output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()
    output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
    output = (output * 255.0).round()
    # cv2.imwrite('ESRGAN/results/{:s}_rlt.png'.format(base), output)
    cv2.imwrite('ESRGAN/results/o_rlt.png', output)
    output=cv2.imread('ESRGAN/results/o_rlt.png')
    return output