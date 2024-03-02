import spacy

def extract_keywords(text):
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    
    keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]
    
    return keywords