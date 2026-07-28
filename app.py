from flask import Flask

app = Flask(__name__)

# home
@app.route("/")
def home():
    return "home"


# length
@app.route("/length")
def length():
    return "length"


# weight
@app.route("/weight")
def weight():
    return "weight"


# temperature
@app.route("/temperature")
def temperature():
    return "temperature"


if __name__ == "__main__":
    app.run()