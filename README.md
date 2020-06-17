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
Every person in a group can be assigned a bunch of _"Nots"_, other people in the group that they shouldn't be assigned.
Most groups won't require many Nots


## The Front End

The front end of the site is built in ReactJS and using ~~MaterialUI~~ (bootstrap) to handle parts of the interface.

The aim with this project is to get to grips with some of the new trends in React, functional componants, [hooks](https://reactjs.org/docs/hooks-intro.html), and using [react router](https://reacttraining.com/react-router/web/example/basic) to create unique urls to allow sharing of content better.

This will require building the app with a data layer seperate to the "dumb" components.

App -> Component data layer(container) -> Component Renderer(Component)

### Connecting to RESTful service:

I'm using the [axios](https://github.com/axios/axios) library to connect to my simple python API. It's a standard in React devlopment and comes with excellent documentation. 

```javascript
export const loadGroupList = () => {
  return function (dispatch) {
    dispatch(loadGroups());//simple action 
      return axios
        .get(endpoint + "getgroups")//the actual getter connection
        .then(({ data }) => {
          dispatch(renderGroupList(data));//what to do once the get returns (status: 200)
        })
        .catch((error) => dispatch(loadGroupsError(error)));//some simple error handling for the client
    };
};

```

## The Backend

https://github.com/michael-whelan/secret-santa-backend
