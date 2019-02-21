# Secret-Santa
A simple secet santa app. The digital version of picking names out of a hat.


## The Functionality

This is a simple web app that will allow a user to register/login and create different groups to be used in Secret santa, or any other reason to randomly and secret assign people to one another.

### Public/Private
Each group can be made public or private. A private group can only be edited by the admin. 

Both public and private groups will be visible to anyone with the ID and both will show the names assigned to people in the groups. However to protect email addresses of users the emails in both public and private groups will be hidden.

Public groups will allow unregistered people to make changes to groups. 

Private groups will only be editable by the group admin.


### Nots
Every person in a group can be assigned a bunch of "Nots", other people in the group that they shouldn't be assigned.
Most groups won't require many Nots


## The Front End

The front end of the site is built in ReactJS and using MaterialUI to handle parts of the interface.

The aim is to make simple stand alone components that can be reused in other projects if needed. 

This will require building the app with a data layer seperate to the "dumb" components.

App -> Component data layer -> Component Renderer

This will mean that each component will require two files instead of one, but that the "dumb" render layer will be the majority of the component and can be reused in different projects simply by firing data to it, and made to look different depending on that data.


## The Python



The server side logic for the app is in two parts:

### 1. API 

A simple rest server used for all the account and data management. This includes the user log in/registration, the creation of groups by registered users and the allocation of unique IDs to these groups.

**--NOT DONE--**
 
Part of the planned python implementation is adding unique ids for the groups. This will be unique ids that will make public groups accessible through the URL. eg www.domain/12e333egwp where 12e333egwp is unique to a group.
This will make sending groups easier, simply passing a url into a whatsapp or fb group and letting everyone add their own emails to the group. 

**--NOT DONE--**

### 2. The Hat Sorter
The second part of the server logic is the actual hat sort function.
This is done in two ways. Depending on whether or not the group admin has added other people into _"not"_ fields.

- If the group contains the _"not"_ field the sorting is done from largest number of nots _N_ to the smallest _n_. This way the most likely problem selections will be handled first when there are the most options for choosing.
- If the _"not"_ field doesn't get filled out then the random selection is much easier. The simpler wqay to randomly sort people into pairs is just by randomising the list and assigning people the next person in the list and the last person the first. This way guarantees everyone is found a pair and it's the simplest pairing method.


Another aspect of the second part is the use of google account to send the emails from, simply creating a MIMEText message with sender/recipient/body and sending it through the account was fine. 


## The Database
The database model for secret santa is very simple. 

- A relational database (most likely MySQL) with just 3 Tables:

    **Groups**
        The set of groups created by different users. Creating a group sets the user as the admin of that group. This allows the user to see the group in full detail and set the group between private and public. The admin can also add people to a group.  
        
    **Users**
        A table containing all the users that access the site (via login). This keeps track of login details and uuids for quick temporary login
        
    **People**
        These are the people within groups. Much simpler than the users as they themselves don't log in and are just a name and email.
 
