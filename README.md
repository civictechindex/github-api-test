# github-api-test

* A demo that lists the Civic Tech Projects.

* Uses the GitHub APIs to get the repositories and filters them by topics.

## Testing the Demo

* [Access the deployed website](https://hackforla.github.io/github-api-test/)

## Using Postman to view the GitHub API enpoints consumed

### Download Postman

1. Get the Postman API Platform

    * Download Postman Application for your system <https://www.postman.com/downloads/>

2. Import the postman collection 

    ![Import File](https://assets.postman.com/postman-docs/collection-import-file.png)
    * Click on Choose Files and put the github-api-test-postman-collection.json     
    * Edit/Regenerate OR [Create a personal access token for authentication](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
    
    * From the collection, choose GitHub API Authenticate request
    
    * Navigate to autherization tab
    
    ![Basic Authorization](https://assets.postman.com/postman-docs/basic-auth.jpg)
    
      ```
      * username: your-github-username 
      * password: your-personal-access-token
      ```
      
    * Click on the **send** button and see the JSON data response from the server in the lower pane.
    * Follow similar steps for rest of the requests inside the collection imported.
      








