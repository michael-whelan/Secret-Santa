# Secret-Santa
A simple secet santa app. The digital version of picking names out of a hat.

## The Front End

Built in ReactJS

## The Python
**NOT DONE**

The server side logic for the app is in two parts. A simple rest server used for all the account and data management. This includes the user log in/registration, the creation of groups by registered users and the allocation of unique IDs to these groups. 

**NOT DONE**

The second part of the server logic is the actual hat sort function.
This is done in two ways. Depending on whether or not the group admin has added other people into _"not"_ fields.

- If the group contains the _"not"_ field the sorting is done from largest number of nots _N_ to the smallest _n_. This way the most likely problem selections will be handled first when there are the most options for choosing.
- If the _"not"_ field doesn't get filled out then the random selection is much easier. The simpler wqay to randomly sort people into pairs is just by randomising the list and assigning people the next person in the list and the last person the first. This way guarantees everyone is found a pair and it's the simplest pairing method.


Another aspect of the second part is the use of google account to send the emails from, simply creating a MIMEText message with sender/recipient/body and sending it through the account was fine. 


## The Database
 
