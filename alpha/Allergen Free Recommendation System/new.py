from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def rate_recipes():
    if request.method == 'POST':
        ratings = request.get_json()
        for i in ratings.keys():
            print(ratings[i])
        return "Ratings received"
    return render_template('new.html')

if __name__ == '__main__':
    app.run(debug=True, port=5050)

