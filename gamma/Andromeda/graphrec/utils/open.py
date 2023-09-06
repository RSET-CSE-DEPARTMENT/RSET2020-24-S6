import pickle
def convertTuple(tup):
    st = ''.join(map(str, tup))
    return st

pickleFile = open("toy_dataset.pickle","rb")
pickleInfo = pickle.load(open("toy_dataset.pickle", "rb"))
f = open("info.txt","w")
f.write(convertTuple(pickleInfo))
