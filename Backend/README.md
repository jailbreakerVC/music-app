# Music Recommendation App Backend

This is a backend for a Music recommendation App, which recommends music to use for a particular scene.
Returns a list of 10 objects (results)

## API Reference

#### Get readme

```http
  GET /
```

renders a HTML page which serves as a readme for the API.

#### Get results

```http
  GET /generate/?scene={scene}
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `scene`   | `string` | **Required**. scene description |

returns an array of objects

```
        {
            "video_id": "",
            "video_link": "",
            "video_title": ""
        }
```

#### Get test result

```http
  GET /test
```

returns a test response without making any API calls, for testing / prototyping frontend.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`YOUTUBE_KEY`
| from YouTube data API.

`BARD_TOKEN` |
Session: Application → Cookies → Copy the value of \_\_Secure-1PSID cookie.

## Run Locally

Clone the project

```bash
  git clone https://github.com/jailbreakerVC/music-app
```

Go to the project directory

```bash
  cd music-app/backend
```

Install dependencies

```bash
  poetry install
```

Start virtual env

```bash
  poetry shell
```

Start the server

```bash
  nodemon api.py
```
