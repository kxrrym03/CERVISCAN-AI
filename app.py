from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("Cervical Cancer.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        age = int(request.form["age"])
        pregnancies = int(request.form["num_pregnancies"])
        smokes = int(request.form["smokes"])
        hpv = int(request.form["hpv_positive"])
        partners = int(request.form["sexual_partners"])
        early = int(request.form["early_sexual_activity"])
        stds = int(request.form["stds"])
        bleed = int(request.form["irregular_bleeding"])
        contraceptive = int(request.form["contraceptive_use"])

        score = (
            smokes + hpv + early + stds + bleed + contraceptive +
            (1 if pregnancies > 3 else 0) +
            (1 if partners > 3 else 0)
        )

        if score >= 5:
            risk = "high"
        elif score >= 3:
            risk = "moderate"
        else:
            risk = "low"

        return jsonify({"risk": risk})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
