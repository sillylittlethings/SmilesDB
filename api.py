from flask import Flask, render_template, jsonify
import random
import json

app = Flask(__name__)

with open("data/smilesData.txt", "r") as f:
    molList = list(map(json.loads, f.readlines()))
    smilesList = list(map(lambda x : x["SMILES"], molList))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api")
def docs():
    return render_template("docs.html")

@app.route("/api/smiles/full")
def smiles_full():
    return jsonify(smilesList)

@app.route("/api/smiles/<string:endpoint>/<int:num>")
def smiles_api(endpoint, num):
    match endpoint:
        case "random":
            return jsonify(random.sample(smilesList, min(num, len(smilesList))))
        case "short":
            return jsonify(smilesList[:num])
        case "long":
            return jsonify(smilesList[-num:])
        case _:
            return "INVALID ENPOINT", 404

@app.route("/api/full")
def full():
    return jsonify(molList)

@app.route("/api/<string:endpoint>/<int:num>")
def api(endpoint, num):
    match endpoint:
        case "random":
            return jsonify(random.sample(molList, min(num, len(smilesList))))
        case "short":
            return jsonify(molList[:num])
        case "long":
            return jsonify(molList[-num:])
        case _:
            return "INVALID ENPOINT", 404