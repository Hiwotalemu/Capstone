from textblob import TextBlob

def analyze_sentiment(text):
   # analysis = TextBlob(text)
    if text is None:
        return 'N/A'  
    analysis = TextBlob(str(text))
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity < 0:
        return 'negative'
    else:
        return 'neutral'
