from flask import Flask, send_from_directory, jsonify, request
from server.data_preparation import preprocess
from server.modeling import model


app = Flask(
    __name__,
    static_folder="../../movies-performance-predictor/build/client",
    static_url_path="/",
)


@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify({"message": "Hello from Flask API! This is for test!!!!"})


@app.route("/api/submit", methods=["POST"])
def post_data():
    data = request.json
    Title = data.get("title")
    description = data.get("description")
    filming_location = data.get("filming_location")
    countries = data.get("countries", [])
    Duration = data.get("duration")
    MPA = data.get("mpaRating")
    release_date = data.get("releaseDate")
    year = int(release_date[:4])
    genres = data.get("genres", [])
    Languages = data.get("languages", [])
    countries = data.get("countries", [])
    budget = data.get("budget", 0)
    stars = data.get("stars", [])
    writers = data.get("writers", [])
    director = data.get("director")
    production_companies = data.get("productionCompanies", [])

    preprocessed_data = preprocess(
        Duration=Duration,
        MPA=MPA,
        release_period=release_date,
        year=year,
        genres=genres,
        countries_origin=countries,
        budget=budget,
        stars=stars,
        writers=writers,
        director=director,
        production_company=production_companies,
    )

    print(preprocessed_data)
    print(preprocessed_data.columns)
    print(len(preprocessed_data.columns))

    output_data = model(preprocessed_data, year)
    return jsonify({"received": output_data})


# Serve React App
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
