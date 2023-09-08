function preprocess(layer)
{
    if(layer.scaler==='StandardScaler')
    {
        return {imports:['from sklearn.preprocessing import StandardScaler\n'],code:["scaler = StandardScaler()\nscaler.fit_transform(X)\n"]}
    }
    else
    {
        return {imports:['from sklearn.preprocessing import MinMaxScaler\n'],code:["scaler = MinMaxScaler()\nX_train=scaler.fit_transform(X_train)\nX_test=scaler.fit_transform(X_test)\n"]}
    }
}
export default preprocess;