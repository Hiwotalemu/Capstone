# Capstone
Analysis of the coverage of crisis events by news agencies provides important information for historians, activists, and the general public. Detecting bias in news coverage is a direct benefit. Thus, there is a need for an automated tool that, given a set of crisis events and a dataset of webpages about these events, can extract the set of news media outlets that reported about these events and how frequently, the types of events covered by each media outlet, and how each news media outlet links to other outlets, if any. Bias detection and sentiment analysis can then be applied to each media outlet to discover hidden patterns. 



The web application we have designed will allow users to provide a collection of URLs or HTML files for webpages reporting on a crisis event. The program will provide a thorough analysis of the provided collection, detecting bias in news coverage as well as linkage between different domains. The results of this analysis will then be returned to the user, offering insights into their provided collection of news articles in a way that is accurate, informative, and easy to understand. 




The front end design of the application will follow the typical guidelines and best practices for web application user interface design. Providing useful functionality is merely one component of delivering a successful and desirable application. The product will only be valued and have staying power if it has a convenient and worthwhile user experience. To that end, the application must abide by the following requirements for front end design: 






For the backend, we decided to use Python and Flask for the processing and analysis. Flask is a lightweight micro-framework in Python that is used for web development. We decided to use this because for starters, it is extremely simple and easy to use, which was essential for us given that it is a Python tool that our backend team did not have much familiarity with. It also requires a very minimal core, with the ability to add any extensions that we needed as we went.  

<img width="605" alt="Screenshot 2024-06-26 at 6 22 15 PM" src="https://github.com/Hiwotalemu/Capstone/assets/107221711/a34957ff-f491-4e3c-a33d-a15debdafa9a">
<img width="418" alt="Screenshot 2024-06-26 at 6 22 36 PM" src="https://github.com/Hiwotalemu/Capstone/assets/107221711/46a97fa0-4874-4966-85ab-cd6689fc4075">

<img width="344" alt="Screenshot 2024-06-26 at 6 22 48 PM" src="https://github.com/Hiwotalemu/Capstone/assets/107221711/61c288ab-a0d3-4dc9-a010-b1e302068d0d">





The Python and Flask components of our application serve two purposes. The first is to act as a middleman between the frontend and the database. This is done by handling the routing and API use between the frontend when sending the information that has yet to be analyzed in the backend and sending the analysis to the frontend to display to the user. Also, after processing of the files provided by the user is completed, the backend sends the results to the database to be readily available to use for purposes such as displaying a user’s submission history. 

The backend’s second purpose is to handle all the analysis and processing. This includes taking the .html files that the user inputs, processing them by extracting meaningful text from the HTML and analyzing it for the most frequently used keywords that are used across the different articles, and determining the linkage from the provided pages to different domains. This is the main functionality provided to users, determining the reliability of the articles and domains they are getting their information from. Doing this analysis is quite easy in Python because it has libraries such as BeautifulSoup which allow you to process .html files and URLs in an effective manner.  

<img width="592" alt="Screenshot 2024-06-26 at 6 23 07 PM" src="https://github.com/Hiwotalemu/Capstone/assets/107221711/e952de84-6aef-4a1d-9397-af0bf4e8af32">




