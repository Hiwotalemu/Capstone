from collections import Counter
from keywordsdetect import extract_keywords

# Assuming extract_keywords() function returns a list of keywords from the content
# def extract_frequent_keywords(domain_links):
#     all_keywords = []

#     for domain, links in domain_links.items():
#         for link in links:
#             # Assuming you have a function to scrape content from a link
#             content = scrape_content_from_link(link)
#             if content:
#                 keywords = extract_keywords(content)
#                 all_keywords.extend(keywords)

#     # Count the frequency of each keyword
#     keyword_counter = Counter(all_keywords)

#     # Select the top 10 most frequent keywords
#     frequent_keywords = keyword_counter.most_common(10)

#     return frequent_keywords

# # Example function to scrape content from a link
# def scrape_content_from_link(link):
#     # Implement your scraping logic here
#     return ""

# # Example route to extract frequent keywords from domain links
# @app.route('/extract_frequent_keywords')
# def extract_frequent_keywords_route():
#     # Assuming domain_links is populated in the /upload route
#     frequent_keywords = extract_frequent_keywords(domain_links)
#     return jsonify(frequent_keywords)
