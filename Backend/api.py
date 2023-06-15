"""
    backend for project
"""
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from bardapi import Bard
from dotenv import load_dotenv
import re
import logging
import os

load_dotenv(".env")

# credentials
yt_token = os.getenv("YOUTUBE_KEY")
token = os.getenv("BARD_TOKEN")
youtube = build('youtube', 'v3', developerKey=yt_token)
bard = Bard(token=token)
# setting the scene
scene = ""
query_template = f"Write me some genre to search for music that would fit right with this scene: {scene} . Generate me 5 of these tags which would fit the scene and give the output in an array"
# query_template = f"Write me a list of 5 genre to search for music that would fit right with this scene: {scene}, generate 5 of these tags in an array, see what type of music movies and tv shows use for this kind of scene and use that information to generate the tags."


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
        extracted_content = matches[0].strip()
        extracted_content = extracted_content.replace(
            "\\n", "")

        extracted_content = extracted_content[2:-2].split('", "')
        return extracted_content
    else:
        return (

        )


def get_youtube_results(tags):

    listt = []
    tag = tags[0].split()

    for t in tag:
        print("t", t)
        q = str(t) + "music"
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
                    # print(search_result['snippet']['title'])
                    listt.append({

                        "video_id": search_result['id']['videoId'],
                        "video_title": search_result['snippet']['title'],
                        "video_link": 'https://www.youtube.com/watch?v=' + search_result['id']['videoId']
                    })
        except HttpError as e:
            return {
                e,

            }
    return listt


@app.route('/', methods=["GET"])
def home():
    logging.info("Loading home page")
    return render_template('index.html')


@app.route('/generate/', methods=['GET'])
def generate():
    scene = request.args['scene']
    output = bard.get_answer(query_template)
    if output:
        print("getting bard output")
        tags = generate_tags(output=output)
        print(tags)
        if tags:
            print("tags: ", tags)
            return jsonify(

                get_youtube_results(tags=tags)
            )
        else:
            return {
                'output': "null",
            }
    return {
        'output': "null",
    }


@app.route('/test', methods=["GET"])
def test():
    return [
        {
            "video_id": "aRmUkGqWuCY",
            "video_link": "https://www.youtube.com/watch?v=aRmUkGqWuCY",
            "video_title": "🤔 Thoughtful &amp; Ambient (Royalty Free Music) - &quot;ESCAPE&quot; by Onycs 🇫🇷"
        },
        {
            "video_id": "H4BAEf5V-Yc",
            "video_link": "https://www.youtube.com/watch?v=H4BAEf5V-Yc",
            "video_title": "💤 Relaxing Ambient Instrumental Music (For Videos) - &quot;Ethereal&quot; by Punch Deck"
        },
        {
            "video_id": "CLeZyIID9Bo",
            "video_link": "https://www.youtube.com/watch?v=CLeZyIID9Bo",
            "video_title": "Chill Lofi Mix [chill lo-fi hip hop beats]"
        },
        {
            "video_id": "i-_1Os7hVDw",
            "video_link": "https://www.youtube.com/watch?v=i-_1Os7hVDw",
            "video_title": "Lofi Chilled Beats - 12 Hours of DMCA Free and Copyright Free Music for Twitch Streamers (2021)"
        },
        {
            "video_id": "iAguE62acA8",
            "video_link": "https://www.youtube.com/watch?v=iAguE62acA8",
            "video_title": "Dark Techno / EBM / Industrial Bass Mix &#39;TITAN&#39; [Copyright Free]"
        },
        {
            "video_id": "0mAzlQwIPQI",
            "video_link": "https://www.youtube.com/watch?v=0mAzlQwIPQI",
            "video_title": "2 HOURS Dark Techno / Cyberpunk / Industrial Bass Mix &#39;UNSCARED&#39; [Copyright Free]"
        },
        {
            "video_id": "LlqSYztIc08",
            "video_link": "https://www.youtube.com/watch?v=LlqSYztIc08",
            "video_title": "[FREE] Indie x Bedroom Pop x Dream Pop Type Beat - &quot;sentimental&quot;"
        },
        {
            "video_id": "8Mgkvofs3PE",
            "video_link": "https://www.youtube.com/watch?v=8Mgkvofs3PE",
            "video_title": "🌼 Indie &amp; Alternative (Royalty Free Music) - &quot;VOICE MEMOS&quot; by Zack Medlin 🇺🇸"
        },
        {
            "video_id": "pLcw3dK1yU0",
            "video_link": "https://www.youtube.com/watch?v=pLcw3dK1yU0",
            "video_title": "Lofi Hiphop Mix 2022 | Lofi beats to study | No Copyright Lofi Hip Hop 2022"
        },
        {
            "video_id": "BEXL80LS0-I",
            "video_link": "https://www.youtube.com/watch?v=BEXL80LS0-I",
            "video_title": "BlockBuster 🎥 No Copyright Lofi Hip Hop &amp; Chillhop Mix 2022 | Chill lofi beats to study / relax to"
        }
    ]


if __name__ == '__main__':
    app.run(port=8000, debug=False)
