# from textblob import TextBlob

def analyze_sentiment(text):
   # analysis = TextBlob(text)
    if text is None:
        return 'N/A'  
    analysis = 0
    if analysis > 0:
        return 'positive'
    elif analysis < 0:
        return 'negative'
    else:
        return 'neutral'
