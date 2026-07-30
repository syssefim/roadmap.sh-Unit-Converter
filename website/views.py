from flask import Blueprint, render_template

views = Blueprint('views', __name__)

# length
@views.route('/')
@views.route('/length')
def length():
    #return "length"
    return render_template('length.html')


# weight
@views.route('/weight')
def weight():
    return render_template('weight.html')


# temperature
@views.route('/temperature')
def temperature():
    return render_template('temperature.html')