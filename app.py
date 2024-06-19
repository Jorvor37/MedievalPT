from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

questions = [
    {"question": "I see myself as someone who is reserved.", "dimension": "extraversion", "reverse": True},
    {"question": "I see myself as someone who is generally trusting.", "dimension": "agreeableness", "reverse": False},
    # Add more questions here
]

scores = {"extraversion": 0, "agreeableness": 0}

def update_score(answer, question):
    if question["reverse"]:
        answer = 2 - answer  # If reverse, Agree becomes 0 and Disagree becomes 1
    scores[question["dimension"]] += answer

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    answers = data['answers']
    for i, answer in enumerate(answers):
        update_score(answer, questions[i])
    return jsonify(scores)

if __name__ == "__main__":
    app.run(debug=True)
