"""
    backend for project
"""

from flask import Flask, jsonify, request, render_template
from bardapi import Bard
from dotenv import load_dotenv
import re
import logging
import os


load_dotenv(".env")
# bard credentials
token = os.getenv("BARD_TOKEN")
bard = Bard(token=token)
# setting the scene
scene = ""
query_template = f"Write me some genre to search for music that would fit right with this scene: {scene} . Generate me 5 of these tags which would fit the scene and give the output in an array"

# starting flask
app = Flask(__name__)


def generate_tags(output):
    """
    Extracts the content from the output of the bard api
    :param output: output of the bard api
    :return: extracted content
    """
    matches = re.findall(r'```(.+?)```', str(output), re.DOTALL)
    if matches:
        extracted_content = matches[0].strip()
        extracted_content = extracted_content.replace(
            "\\n", "")

        # print("CONTENT: " + extracted_content)
        # logging.log("Content")
        return extracted_content
    else:
        return 0


@app.route('/', methods=["GET"])
def home():
    logging.info("Loading home page")
    return render_template('index.html')


@app.route('/generate/', methods=['GET'])
def generate():
    scene = request.args['scene']
    output = bard.get_answer(query_template)
    if output:
        return (
            {'result': generate_tags(output=output)}
        )
    return {
        'output': "null",
    }


if __name__ == '__main__':
    app.run(port=8000, debug=False)
