# ClickyGame App
Clicky Game app with Java Spring Boot, MongoDB and React JS


## Site Url
* https://clickygame.rbhojakapp.com/

## How to?
* Hit the website above. Create a new user, login with the created user and start playing. 
* Download the code, go to ui folder and run `npm run build` to create js bundles and then run gradlew bootRun to test locally.
* The app listens on port 5000. Try localhost:5000 to run locally.

## Implementation Details  
* It uses Java Spring Boot version 2.1.3.RELEASE
* Basic Authentication is used for api auth.
* It uses MongoDB as data store which is hosted on an AWS EC2 instance.
* Connect to MongoDB directly using Compass. 
* The front end is developed in React version 16.8.6
* The website is hosted as AWS Elastic Beanstalk. 
* It uses gradle for building Java and npm for React.

## MongoDB
* Database name: `Clickygame`
* Collections: 
  * `image` 
  * `user`

## Api Endpoints

| Endpoint  | Status | Request Payload | Type | Verb | Response 
| ------------- | ------------- | ------------- |------------- | ------------- | ------------- |
| /create  | 201 | $Ref: `Request Payload`: Create  | REST | POST | String UserId
| /login | 200 | $Ref: `Request Payload`: Login Request | REST | POST | $Ref: `Response Payload`: Login
| /api/user/topscorers/{number} | 200  |  | REST | GET | $Ref: `Response Payload`: User[]
| /api/user/{userId}/topscore/{number} | 200  |  | REST | PUT | $Ref: `Response Payload`: User
| /api/user/{userId}/topscore/{number} | 200  |  | REST | PUT | $Ref: `Response Payload`: User
| /api/user/logout | 401  |  | REST | POST | 
| /api/image | 200  |  | REST | GET | $Ref: `Response Payload`: Image


## Response Payload 
`Content type: application/json`

### Create

| Name | Type | Description
| ------------- | ------------- | ------------- |
| Name  | String | Required name of the user |
| Email  | String  | Required email of the user |
| Password  | String  | Required password of the user |

### Login Request

| Name | Type | Description
| ------------- | ------------- | ------------- |
| Email  | String | Required email of the user used when the user was created |
| Password  | String  | Required password of the user used when the user was created |

### Login
  
| Name | Type | Description
| ------------- | ------------- | ------------- |
| Token  | String | App Token of the user |
| UserId  | String  | UserId: Unique identifier of the user |
  
  
### User
  
| Name | Type | Description
| ------------- | ------------- | ------------- |
| Id  | String | Id: Unique identifier of the user |
| Name  | String  | Name of the user - name used when the user was created |
| Email  | String  | Email of the user - email used when the user was created |
| Username  | String  | Internal username of the user |
| Roles  | String[]  | All roles user is assigned to |
| TopScore  | Integer  | Top Score of the current user |
  
### Image
  
| Name | Type | Description
| ------------- | ------------- | ------------- |
| Id  | String | Id: Unique identifier of the image |
| ImageUrl  | String  | Public Url of the image |
  
  
## Future Updates
* Throttle down the create requests coming from the same Ip address or use SSO OpenID connect because app is not safe against **Denial-of-service attack (DDoS).**
* Unit testing. Because it's necessary.
* Encrypt config values.
     
