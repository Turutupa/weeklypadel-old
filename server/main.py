from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__,
            static_folder="../client/build",
            template_folder='../client/build')


@app.route('/')
def index():
    return render_template('index.html', token='Hello flask+react')


if __name__ == "__main__":
    app.run(debug=True)