from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import harperdb

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
DATABASE_USERNAME = os.getenv('DATABASE_USERNAME')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

db = harperdb.HarperDB(
    url=DATABASE_URL,
    username=DATABASE_USERNAME,
    password=DATABASE_PASSWORD)


app = Flask(__name__)
CORS(app)


@app.route('/')
def fetch_all():
    fetch_all = db._sql('SELECT * FROM dev.games')
    print(fetch_all)
    return jsonify(fetch_all)


@app.route('/<int:game_id>')
def fetch_by_id(game_id=None):
    fetch_by_id = db._sql(f'SELECT * FROM dev.games WHERE id = {game_id}')
    print(fetch_by_id)
    return jsonify(fetch_by_id)
