from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

with open("data/processedSmiles.txt", "r") as f:
    proteinList = list(map(lambda a : a.strip(), f.readlines()))
    proteinList.sort(key=lambda x : len(x))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api")
def docs():
    return render_template("docs.html")

@app.route("/api/full")
def full():
    return jsonify(proteinList)

@app.route("/api/<string:endpoint>/<int:num>")
def api(endpoint, num):
    match endpoint:
        case "random":
            return jsonify(random.sample(proteinList, min(num, len(proteinList))))
        case "short":
            return jsonify(proteinList[:num])
        case "long":
            return jsonify(proteinList[-num:])
        case _:
            return "INVALID ENPOINT", 404