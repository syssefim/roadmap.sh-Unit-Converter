from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secretkeyuwu'


    # home
    @app.route("/")
    @app.route("/home")
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

    
    return app