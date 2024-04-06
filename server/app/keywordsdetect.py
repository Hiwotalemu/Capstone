from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter

def extract_keywords(text, domain_texts=None):
    all_texts = [text]
    if domain_texts:
        all_texts.extend(domain_texts)

    combined_text = ' '.join(all_texts)

    tokens = word_tokenize(combined_text)

    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word.lower() for word in tokens if word.isalnum() and word.lower() not in stop_words]

    word_freq = Counter(filtered_tokens)

    top_words = word_freq.most_common(10)

    # Return both the word and its frequency
    return [(keyword[0], keyword[1]) for keyword in top_words]


# Example usage

# print(extract_keywords(text))


# Example usage:
# keywords = extract_keywords(content)
# print(keywords)

# import spacy
# from collections import Counter
# #takes in a 
# def extract_keywords(file_path):
#     # Read the content of the file
#     with open(file_path, 'r') as file:
#         text = file.read()

#     # Load spaCy model
#     nlp = spacy.load('en_core_web_sm')

#     # Process the text with spaCy
#     doc = nlp(text)

#     # Define bias words to filter out
#     bias_words = {'I', 'me', 'myself', 'my', 'mine', 'we', 'us', 'our', 'ours', 'unfair'}

#     # Extract keywords
#     keywords = [token.text for token in doc if token.is_alpha and not token.is_stop and token.text.lower() not in bias_words]
#     print("Keywords:", keywords)  
#     # Count the frequency of each keyword
#    # keyword_counts = Counter(keywords)

   
#     #sorted_keywords = sorted(keyword_counts.items(), key=lambda x: x[1], reverse=True)

#    # return sorted_keywords[:10]  # Return top 10 most frequently used words
