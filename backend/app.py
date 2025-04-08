from flask import Flask, request, jsonify
from pydub import AudioSegment
import speech_recognition as sr
import os

app = Flask(__name__)

@app.route("/convert", methods=["POST"])
def convert_audio():
    audio_file = request.files["audio"]
    file_path = f"temp/{audio_file.filename}"
    audio_file.save(file_path)

    wav_path = file_path + ".wav"
    audio = AudioSegment.from_file(file_path)
    audio.export(wav_path, format="wav")

    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_path) as source:
        audio_data = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio_data)
            os.remove(file_path)
            os.remove(wav_path)
            return jsonify({"transcript": text})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)


