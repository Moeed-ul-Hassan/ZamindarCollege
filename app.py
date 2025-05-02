import os
import logging
from flask import Flask, render_template

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Initialize app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default_secret_key")

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/faculty')
def faculty():
    return render_template('faculty.html')

@app.route('/academics')
def academics():
    return render_template('academics.html')

@app.route('/admissions')
def admissions():
    return render_template('admissions.html')

@app.route('/student-resources')
def student_resources():
    return render_template('student_resources.html')

@app.route('/news-events')
def news_events():
    return render_template('news_events.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
