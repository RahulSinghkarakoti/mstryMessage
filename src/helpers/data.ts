

const output = { 
    overall_sentiment: {
      label: "Positive",
      score: 0.76,
      summary:
        "Most users appreciate the new design and faster performance, with minor complaints about the login process.",
    },
    key_topics_entities: [
      { topic: "UI Design", mentions: 45 },
      { topic: "Performance", mentions: 37 },
      { topic: "Login Issues", mentions: 12 },
      { entity: "Version 2.0", mentions: 28 },
    ],
    emotion_intensity: {
      average_score: 3.8,
      scale: "1 (Low) - 5 (High)",
      dominant_emotions: ["Joy", "Frustration"],
    },
    suggested_actions: [
      "Streamline the login process to reduce user frustration.",
      "Consider adding customization options for the UI.",
      "Monitor server load to maintain fast performance.",
    ],
    trend_over_time: [
      { date: "2025-03-01", positive: 0.64, negative: 0.21 },
      { date: "2025-03-08", positive: 0.7, negative: 0.18 },
      { date: "2025-03-15", positive: 0.76, negative: 0.12 },
    ],
    confidence_clarity: {
      average_confidence_score: 0.87,
      average_clarity_score: 0.79,
      low_clarity_examples: [
        "It’s okay I guess.",
        "Could be better but whatever.",
      ],
    },
};

 const prompt= `You are an intelligent feedback analyzer.

Analyze the following user feedback responses to the question 

Each feedback entry includes a timestamp.

Your task is to return a structured JSON object with the following fields:

overall_sentiment: {
label: one of ["Positive", "Negative", "Neutral", "Mixed"],
score: number from 0 to 1 (where 1 is fully positive),
summary: brief summary of overall user sentiment
}

key_topics_entities: array of {
topic: string,
mentions: number of times the topic appeared
}

emotion_intensity: {
average_score: 1-5 scale,
dominant_emotions: array of emotion labels (e.g., "frustration", "satisfaction")
}

suggested_actions: array of actionable suggestions inferred from feedback

trend_over_time: array of {
date: YYYY-MM-DD,
positive: score (0 to 1),
negative: score (0 to 1)
}

confidence_clarity: {
average_clarity_score: 0-1,
low_clarity_examples: array of vague or unclear feedback snippets
}

Respond in valid JSON format only. Do not include any explanation, just the raw JSON.

Here is the feedback data ->`
 
export {
  output,
  prompt, 
}