from flask import Flask, render_template

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secretkeyuwu'


    # length
    @app.route('/')
    @app.route('/length')
    def length():
        #return "length"
        return render_template('length.html')


    # weight
    @app.route('/weight')
    def weight():
        return render_template('weight.html')


    # temperature
    @app.route('/temperature')
    def temperature():
        return render_template('temperature.html')

    
    return app