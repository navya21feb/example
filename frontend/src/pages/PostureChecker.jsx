import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import '@tensorflow/tfjs-backend-webgl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const PostureChecker = () => {
  const webcamRef = useRef(null);
  const [posture, setPosture] = useState('Detecting...');
  const [feedback, setFeedback] = useState('');
  const [exercises, setExercises] = useState([]);
  const [history, setHistory] = useState([]);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [sittingTime, setSittingTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('postureHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Start sitting timer
    timerRef.current = setInterval(() => {
      setSittingTime(prev => prev + 1);
    }, 60000); // every 1 minute

    return () => clearInterval(timerRef.current);
  }, []);

  const speak = (text) => {
    if (speechEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const saveHistory = (label) => {
    const timestamp = new Date().toLocaleTimeString();
    const updatedHistory = [...history, { label, time: timestamp }];
    setHistory(updatedHistory);
    localStorage.setItem('postureHistory', JSON.stringify(updatedHistory));
  };

  const resetHistory = () => {
    setHistory([]);
    localStorage.removeItem('postureHistory');
  };

  useEffect(() => {
    const loadModelAndDetect = async () => {
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

      const interval = setInterval(() => {
        detectPose(detector);
      }, 3000);

      return () => clearInterval(interval);
    };

    const detectPose = async (detector) => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const poses = await detector.estimatePoses(video);
        if (poses.length > 0) {
          analyzePosture(poses[0]);
        }
      }
    };

    const analyzePosture = (pose) => {
      const leftShoulder = pose.keypoints.find(p => p.name === 'left_shoulder');
      const rightShoulder = pose.keypoints.find(p => p.name === 'right_shoulder');
      const leftHip = pose.keypoints.find(p => p.name === 'left_hip');
      const rightHip = pose.keypoints.find(p => p.name === 'right_hip');

      if (leftShoulder && rightShoulder && leftHip && rightHip) {
        const avgShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
        const avgHipY = (leftHip.y + rightHip.y) / 2;
        const verticalDistance = avgHipY - avgShoulderY;

        if (verticalDistance > 80) {
          const msg = 'You are slouching. Please straighten up!';
          setPosture('Slouching');
          setFeedback(msg);
          setExercises([
            'Shoulder Blade Squeeze',
            'Wall Angels',
            'Chin Tucks',
            'Thoracic Extensions',
            'Cat-Cow Stretch',
          ]);
          speak(msg);
          saveHistory('Slouching');
        } else {
          const msg = 'Great posture! Keep it up.';
          setPosture('Good Posture');
          setFeedback(msg);
          setExercises([
            'Maintain daily stretching',
            'Practice seated posture awareness',
            'Try desk ergonomics exercises',
            'Do upper back strengthening',
            'Use posture reminders',
          ]);
          speak(msg);
          saveHistory('Good Posture');
        }
      }
    };

    tf.ready().then(loadModelAndDetect);
  }, [history, speechEnabled]);

  const chartData = {
    labels: history.map(h => h.time),
    datasets: [
      {
        label: 'Posture Over Time',
        data: history.map(h => h.label === 'Good Posture' ? 1 : 0),
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.3,
        pointRadius: 5,
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        ticks: {
          callback: (value) => value === 1 ? 'Good' : 'Slouching',
        },
        min: 0,
        max: 1,
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🧍‍♀️ Posture Checker with Insights</h1>

      <Webcam
        ref={webcamRef}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      />

      <div className="text-lg mb-2"><strong>Detected Posture:</strong> {posture}</div>
      <div className="mb-2 text-gray-700"><strong>Feedback:</strong> {feedback}</div>

      <div className="mb-4">
        <strong>💪 Exercises to Improve:</strong>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {exercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">📈 Posture Progress</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="flex items-center gap-4 mt-6 mb-4">
        <button
          onClick={resetHistory}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🧹 Reset History
        </button>

        <button
          onClick={() => setSpeechEnabled(prev => !prev)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {speechEnabled ? '🔇 Disable' : '🔊 Enable'} Voice Alerts
        </button>
      </div>

      <div className="text-sm text-gray-600">
        ⏱️ You've been sitting for: <strong>{sittingTime} minute(s)</strong>
      </div>

      <div className="mt-6 text-green-700 font-medium">
        ✅ Thank you for checking your posture with us! You're taking a step toward a healthier lifestyle.
      </div>

      <div className="text-blue-600">
        🌟 Benefits of good posture include reduced back pain, better breathing, and improved focus!
      </div>

      <div className="mt-4 text-gray-600 italic">
        💡 Don’t forget to explore more features on our website like BMI, TDEE, and more Health Calculators!
      </div>
    </div>
  );
};

export default PostureChecker;


