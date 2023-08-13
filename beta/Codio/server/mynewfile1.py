import numpy as np 
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn import cluster
import joblib
X, Y = load_iris(return_X_y=True)
X_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = 30, random_state = None) 
scaler = StandardScaler()
scaler.fit_transform(X)
model=cluster.KMeans(n_clusters=5,init='k-means++',n_init=3,max_iter=4,random_state=5 )
model.fit(X_train,Y_train)
joblib.dump(model,'output.pkl')
