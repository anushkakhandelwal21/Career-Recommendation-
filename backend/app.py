from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)

CORS(app)

# Load the dataset and the model once when the app starts
data = pd.read_csv("Dataset/mldata.csv")
with open("rfweights.pkl", "rb") as pickleFile:
    rfmodel = pickle.load(pickleFile)

# Obtain the categorical/nominal data
categorical_cols = data[
    [
        "certifications",
        "workshops",
        "Interested subjects",
        "interested career area ",
        "Type of company want to settle in?",
        "Interested Type of Books",
    ]
]

# Assign the datatype and automated assigned code
for i in categorical_cols:
    data[i] = data[i].astype("category")
    data[i] = data[i].cat.codes

# Create the embedding dictionaries
certificates_references = dict(
    zip(categorical_cols["certifications"].unique(), data["certifications"].unique())
)
workshop_references = dict(
    zip(categorical_cols["workshops"].unique(), data["workshops"].unique())
)
subjects_interest_references = dict(
    zip(categorical_cols["Interested subjects"].unique(), data["Interested subjects"].unique())
)
career_interest_references = dict(
    zip(categorical_cols["interested career area "].unique(), data["interested career area "].unique())
)
company_intends_references = dict(
    zip(categorical_cols["Type of company want to settle in?"].unique(), data["Type of company want to settle in?"].unique())
)
book_interest_references = dict(
    zip(categorical_cols["Interested Type of Books"].unique(), data["Interested Type of Books"].unique())
)

def rfprediction(userKnowledge):
    df = pd.DataFrame.from_dict(
        {
            "logical_thinking": [userKnowledge["logical_thinking"]],
            "hackathon_attend": [userKnowledge["hackathon_attend"]],
            "coding_skills": [userKnowledge["coding_skills"]],
            "public_speaking_skills": [userKnowledge["public_speaking_skills"]],
            "self_learning": [userKnowledge["self_learning"]],
            "extra_course": [userKnowledge["extra_course"]],
            "certificate": [userKnowledge["certificate_code"]],
            "workshop": [userKnowledge["workshop_code"]],
            "read_writing_skills": [
                0 if "poor" in userKnowledge["read_writing_skill"] else 1 if "medium" in userKnowledge["read_writing_skill"] else 2
            ],
            "memory_capability": [
                0 if "poor" in userKnowledge["memory_capability"] else 1 if "medium" in userKnowledge["memory_capability"] else 2
            ],
            "subject_interest": [userKnowledge["subject_interest"]],
            "career_interest": [userKnowledge["career_interest"]],
            "company_intend": [userKnowledge["company_intend"]],
            "senior_elder_advise": [userKnowledge["senior_elder_advise"]],
            "book_interest": [userKnowledge["book_interest"]],
            "introvert_extro": [userKnowledge["introvert_extro"]],
            "team_player": [userKnowledge["team_player"]],
            "management_technical": [userKnowledge["management_technical"]],
            "smart_hardworker": [userKnowledge["smart_hardworker"]],
        }
    )

    # Replace string values with numeric codes
    df = df.replace(
        {
            "certificate": certificates_references,
            "workshop": workshop_references,
            "subject_interest": subjects_interest_references,
            "career_interest": career_interest_references,
            "company_intend": company_intends_references,
            "book_interest": book_interest_references,
        }
    )

    # Convert to list and append boolean based conditions
    userdata_list = df.values.tolist()
    if df["management_technical"].values == "Management":
        userdata_list[0].extend([1, 0])
        userdata_list[0].remove("Management")
    elif df["management_technical"].values == "Technical":
        userdata_list[0].extend([0, 1])
        userdata_list[0].remove("Technical")
    else:
        return "Err"

    if df["smart_hardworker"].values == "smart worker":
        userdata_list[0].extend([1, 0])
        userdata_list[0].remove("smart worker")
    elif df["smart_hardworker"].values == "hard worker":
        userdata_list[0].extend([0, 1])
        userdata_list[0].remove("hard worker")
    else:
        return "Err"

    # Make the prediction
    prediction_result_all = rfmodel.predict_proba(userdata_list)

    # Create a list for output
    result_list = [
        {"name": "Applications Developer", "score": float(prediction_result_all[0][0])},
        {"name": "CRM Technical Developer", "score": float(prediction_result_all[0][1])},
        {"name": "Database Developer", "score": float(prediction_result_all[0][2])},
        {"name": "Mobile Applications Developer", "score": float(prediction_result_all[0][3])},
        {"name": "Network Security Engineer", "score": float(prediction_result_all[0][4])},
        {"name": "Software Developer", "score": float(prediction_result_all[0][5])},
        {"name": "Software Engineer", "score": float(prediction_result_all[0][6])},
        {"name": "Software Quality Assurance (QA)/ Testing", "score": float(prediction_result_all[0][7])},
        {"name": "Systems Security Administrator", "score": float(prediction_result_all[0][8])},
        {"name": "Technical Support", "score": float(prediction_result_all[0][9])},
        {"name": "UX Designer", "score": float(prediction_result_all[0][10])},
        {"name": "Web Developer", "score": float(prediction_result_all[0][11])},
    ]

    return result_list

@app.route("/test", methods=["POST"])
def dif():
    response = request.get_json()
    job_recommendations = rfprediction(response)
    return jsonify({"arr": job_recommendations})

if __name__ == "__main__":
    app.run(debug=True)
