import requests
from bs4 import BeautifulSoup

def scrape_webpage(url):
    try:
       
        response = requests.get(url)
        response.raise_for_status()  

        soup = BeautifulSoup(response.text, 'html.parser')

    
        headlines = [headline.text for headline in soup.find_all('h1')]
        content = soup.find('div', class_='article-content').text

        return headlines, content

    except requests.exceptions.RequestException as e:
        print(f"Error during HTTP request: {e}")
        return None, None
