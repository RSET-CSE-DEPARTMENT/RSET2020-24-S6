function inputs(layer,selectedOption)
{
    if(selectedOption==='option1')
    {
        return {imports:['import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\n'],code:["df=pd.read_csv('"+layer.filename+"')\nX=df.iloc[1:df.shape[0],0:"+layer.iloc+"]\nY=df.iloc[1:df.shape[0],"+layer.iloc+":"+layer.iloc+"+1]\nX=np.array(X)\ny=np.array(Y)\ny.resize(df.shape[0]-1)\nX_train, X_test, Y_train, Y_test = train_test_split( X, y, test_size = "+layer.testsize+", random_state = "+layer.inputrandomstate+") \n"]}
    }
    else if(selectedOption==='option2')
    {
    if(layer.inbuilt==='diabetes_patient')
       // return {imports:['import numpy as np \nfrom sklearn.datasets import load_diabetes\nfrom sklearn.model_selection import train_test_split\n'],code:['X, Y = load_diabetes(return_X_y=True)\nX = X[:,8].reshape(-1,1)\nX_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = 0.3, random_state = 10 ) \n']}
        return {imports:['import numpy as np \nfrom sklearn.datasets import load_diabetes\nfrom sklearn.model_selection import train_test_split\n'],code:["X, Y = load_diabetes(return_X_y=True)\nX_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = "+layer.testsize+", random_state = "+layer.inputrandomstate+") \n"]}
    else if(layer.inbuilt==='breast_cancer_recognition')
        return {imports:['import numpy as np \nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\n'],code:["X, Y = load_breast_cancer(return_X_y=True)\nX_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = "+layer.testsize+", random_state = "+layer.inputrandomstate+") \n"]}
    else if(layer.inbuilt==='iris_plant')
        return {imports:['import numpy as np \nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n'],code:["X, Y = load_iris(return_X_y=True)\nX_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = "+layer.testsize+", random_state = "+layer.inputrandomstate+") \n"]}
    else if(layer.inbuilt==='wine_recognition')
        return {imports:['import numpy as np \nfrom sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\n'],code:["X, Y = load_wine(return_X_y=True)\nX_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = "+layer.testsize+", random_state = "+layer.inputrandomstate+") \n"]}
    else if(layer.inbuilt==='heart_disease')
        return {imports:['import numpy as np \nfrom sklearn.datasets import load_heart\nfrom sklearn.model_selection import train_test_split\n'],code:["X, Y = load_heart(return_X_y=True)\nX_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = "+layer.testsize+", random_state = "+layer.inputrandomstate+") \n"]}
    else if(layer.inbuilt==='hand_written_digits')
        return {imports:['import numpy as np \nfrom sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\n'],code:["X, Y = load_digits(return_X_y=True)\nX_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = "+layer.testsize+", random_state = "+layer.inputrandomstate+") \n"]}
    else return {imports:[],code:[]}
    }
}
export default inputs;