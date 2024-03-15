import spacy

def extract_keywords(text):
    if text is None:
        raise ValueError("Input text is None. Cannot process.")
    
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    baiswords = ['I', 'me', 'myself', 'my', 'mine', 'we', 'us', 'our', 'ours', 'unfair']
   #keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]
    keywords = [token.text for token in doc if token.is_alpha and not token.is_stop and token.text.lower() in baiswords]
    
    return keywords