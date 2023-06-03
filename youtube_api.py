from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Set up the YouTube API client
api_key = ""
youtube = build('youtube', 'v3', developerKey=api_key)

# Define the search query
tags = [ "ambient", "chillwave", "downtempo", "electronica", "trip hop"]
query = 'music ' + ' '.join(tags)

# Call the search.list method to retrieve search results
try:
    search_response = youtube.search().list(
        q=query,
        type='video',
        part='id,snippet',
        maxResults=10
    ).execute()

    # Extract the video IDs and titles from the search results
    video_ids = []
    video_titles = []
    for search_result in search_response.get('items', []):
        if search_result['id']['kind'] == 'youtube#video':
            video_ids.append(search_result['id']['videoId'])
            video_titles.append(search_result['snippet']['title'])


    # Get the video links
    video_links = ['https://www.youtube.com/watch?v=' + video_id for video_id in video_ids]

    # Print the video IDs, titles, and links
    print(len(video_ids),'Video IDs:', video_ids, "\n")
    print(len(video_titles),'Video Titles:', video_titles, "\n")
    print(len(video_links),'Video Links:', video_links, "\n")

except HttpError as e:
    print('An error occurred:', e)