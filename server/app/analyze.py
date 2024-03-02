from textblob import TextBlob

def analyze_sentiment(text):
   # analysis = TextBlob(text)
    if text is None:
        return 'N/A'  # or handle it in a way that makes sense for your application
    analysis = TextBlob(str(text))
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity < 0:
        return 'negative'
    else:
        return 'neutral'
