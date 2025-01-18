#Drop the idea of having back-end as the cost of running the website and the issue linking python with js. front-end server issues
from flask import Flask, request, jsonify, render_template
from flask import request, abort

app = Flask(__name__)

questions = [
    {"question": "You discover a magical artifact hidden deep in a forest. What do you do?",
     "answers": {
         "A": ["Scholarly Monk", "Runesmith"],
         "B": ["Chivalrous Knight", "Grove Guardian"],
         "C": ["Dragon Speaker", "Beast Warden"],
         "D": ["Battle Mage", "Young Ambitious Prince"]
     }},
    {"question": "In the midst of a storm, a village seeks your help. How do you respond?",
     "answers": {
         "A": ["Storm Caller", "Earth Singer"],
         "B": ["Chivalrous Knight", "Wise Queen"],
         "C": ["Mystical Hermit", "Shadow Knight"],
         "D": ["Beast Warden", "Dragon Speaker"]
     }},
    {"question": "What motivates your actions the most?",
     "answers": {
         "A": ["Chivalrous Knight", "Grove Guardian"],
         "B": ["Scholarly Monk", "Runesmith"],
         "C": ["Dragon Speaker", "Wise Queen"],
         "D": ["Young Ambitious Prince", "Battle Mage"]
     }},
    {"question": "You are offered an opportunity to train with a legendary mentor. What kind of teacher do you choose?",
     "answers": {
         "A": ["Runesmith", "Moon Blade"],
         "B": ["Mystical Hermit", "Grove Guardian"],
         "C": ["Chivalrous Knight", "Shadow Knight"],
         "D": ["Scholarly Monk", "Divine Oracle"]
     }},
    {"question": "How do you approach a conflict between rival factions?",
     "answers": {
         "A": ["Wise Queen", "Divine Oracle"],
         "B": ["Chivalrous Knight", "Battle Mage"],
         "C": ["Shadow Knight", "Mystical Hermit"],
         "D": ["Dragon Speaker", "Storm Caller"]
     }},
    {"question": "What environment do you feel most at home in?",
     "answers": {
         "A": ["Scholarly Monk", "Runesmith"],
         "B": ["Grove Guardian", "Beast Warden"],
         "C": ["Wise Queen", "Chivalrous Knight"],
         "D": ["Dragon Speaker", "Storm Caller"]
     }},
    {"question": "You come across a magical beast in distress. How do you handle the situation?",
     "answers": {
         "A": ["Hedge Witch", "Earth Singer"],
         "B": ["Dragon Speaker", "Beast Warden"],
         "C": ["Chivalrous Knight", "Moon Blade"],
         "D": ["Scholarly Monk", "Mystical Hermit"]
     }},
    {"question": "If you could master one type of power, what would it be?",
     "answers": {
         "A": ["Storm Caller", "Earth Singer"],
         "B": ["Divine Oracle", "Scholarly Monk"],
         "C": ["Battle Mage", "Moon Blade"],
         "D": ["Hedge Witch", "Runesmith"]
     }},
    {"question": "What role do you naturally take in a group?",
     "answers": {
         "A": ["Chivalrous Knight", "Wise Queen"],
         "B": ["Scholarly Monk", "Divine Oracle"],
         "C": ["Beast Warden", "Dragon Speaker"],
         "D": ["Runesmith", "Hedge Witch"]
     }},
    {"question": "If given the chance, how would you leave your mark on the world?",
     "answers": {
         "A": ["Wise Queen", "Chivalrous Knight"],
         "B": ["Scholarly Monk", "Runesmith"],
         "C": ["Dragon Speaker", "Beast Warden"],
         "D": ["Battle Mage", "Moon Blade"]
     }}
]
roles = ["Scholarly Monk", "Runesmith", "Chivalrous Knight", "Grove Guardian",
         "Dragon Speaker", "Beast Warden", "Battle Mage", "Young Ambitious Prince", 
         "Storm Caller", "Earth Singer", "Wise Queen", "Mystical Hermit", "Moon Blade", 
         "Shadow Knight", "Divine Oracle", "Hedge Witch"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json  # {'answers': ['A', 'B', ...]}
    if not data or 'answers' not in data:
        return jsonify({"error": "Invalid input."}), 400

    answers = data['answers']
    if len(answers) != len(questions):
        return jsonify({"error": "Incomplete answers."}), 400

    # Reset scores for each submission
    scores = {role: 0 for role in roles}

    # Map answers to scores
    for i, answer in enumerate(answers):
        if answer in questions[i]["answers"]:
            for role in questions[i]["answers"][answer]:
                scores[role] += 1

    # Determine primary and secondary roles
    sorted_roles = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    primary_role = sorted_roles[0][0]
    secondary_role = sorted_roles[1][0]

    return jsonify({
        "primary_role": primary_role,
        "secondary_role": secondary_role,
        "scores": scores
    })

@app.before_request
def limit_remote_access():
    allowed_ips = ['127.0.0.1', 'localhost']  # Add your machine's public IP if needed
    if request.remote_addr not in allowed_ips:
        abort(403)  # Deny access

if __name__ == "__main__":
    app.run(debug=True)

