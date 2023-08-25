"""
    backend for project
"""
import os
import re
import json
from dotenv import load_dotenv
import time
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from bardapi import Bard

# load_dotenv(".env")

# yt_token = os.getenv("YOUTUBE_KEY")
# token = os.getenv("BARD_TOKEN")
# youtube = build('youtube', 'v3', developerKey=yt_token)
# bard = Bard(token=token)


scene = ""


with open('testData.json') as f:
    data = json.load(f)

# starting flask
app = Flask(__name__)
CORS(app)


def generate_tags(output):
    """
    Extracts the content from the output of the bard api
    :param output: output of the bard api
    :return: extracted content
    """
    matches = re.findall(r'```(.+?)```', str(output), re.DOTALL)
    if matches:
        extracted_content = matches[0].strip().replace("\\n", "")
        extracted_content = extracted_content[2:-2].split('", "')
        return extracted_content
    else:
        return []


def get_youtube_results(tags):

    listt = []
    tag = tags[0].split()

    for t in tag:
        print("t", t)
        term = t.replace("'", "").replace('"', '').replace(",", "")
        q = f"{term} music for youtube videos"
        print("searching for: ", q)
        try:
            search_response = youtube.search().list(
                q=q,
                type='video',
                part='id,snippet',
                maxResults=2
            ).execute()
            for search_result in search_response.get('items', []):
                if search_result['id']['kind'] == 'youtube#video':
                    listt.append({

                        "video_id": search_result['id']['videoId'],
                        "video_title": search_result['snippet']['title'],
                        "video_link": 'https://www.youtube.com/watch?v=' + search_result['id']['videoId']
                    })
        except HttpError as e:
            return {
                'error': str(e)

            }
    return listt


@app.route('/', methods=["GET"])
def home():
    return render_template('index.html')


@app.route('/generate/', methods=['GET'])
def generate():
    scene = request.args.get('scene')
    query_template = f"Write me some genre to search for music that would fit right with this scene: '{scene}' . Generate me 5 of these tags which would fit the scene and give the output in an array"
    print("QTquery_template", query_template)
    output = bard.get_answer(query_template)
    if output:
        print("getting bard output")
        tags = generate_tags(output=output)
        # print(tags)

        if tags:
            # print("tags:", tags)
            return jsonify(get_youtube_results(tags=tags))
    elif output == None:
        return jsonify({'output': "null"})

    return jsonify({'output': "null"})


@app.route('/test', methods=["GET"])
def test():
    time.sleep(3)
    return data


if __name__ == '__main__':
    app.run(port=8000, debug=False)
