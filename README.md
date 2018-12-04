# IssueTracker

An Issue Tracking app that demonstrates basic Angular project architecture and concepts.

## Setup

`$ git clone git@git.corp.odfl.com:refarch-uiux/angular.git`

`$ cd angular`

`$ npm install`

`$ npm install concurrency -g`

`$ npm run dev`

This will create a directory called `angular` inside the current folder.

It will also install the dependencies, and install `concurrency` as a global dependency. Concurrecy is used in the start scripts to run multiple commands without the need of having several terminal windows open.

The `npm run dev` command will run all of the scripts necessary to get your app up and running on `localhost:4200` with a JSON server and authentication server.

## Project Structure

Inside the angular directory, the basic project structure is as follows:

```
angular
├── .gitignore
├── db.json
├── package.json
├── README.md
├── server.js
├── users.json
├── e2e
├── node_modules
└── src
    ├── app
    │   ├── app-routing
    │   ├── components
    │   ├── datasource
    │   ├── http-interceptors
    │   ├── models
    │   ├── services
    │   └── shared
    ├── assets
    └── environments
```

In general, the main coding of an application will be done within the `/src/app` folder. There are no hard and fast rules for subdirectories within the `app` folder, but the above is a good example of a logical grouping of folders and files.

### /src/app breakdown

Below are explanations of how the app folder is structured and what's going on within the code.

- [App-routing](#app-routing)
- [Components](#components)
- [Datasource](#datasource)
- [Http-interceptors](#http-interceptors)
- [Models](#models)
- [Services](#services)
- [Shared](#shared)

#### App-routing

The routes for an application are defined within the app-routing module. These correspond to "pages" within your application. For example, the `/` route could corrrespond to the homepage of your application, while the `/login` route will navigate you to your login page. The routes themselves are tied to components which will handle the rendering and logic of the pages. You can also use your Auth Guards to determine if a route is protected or public.

#### Components

Components handle the HTML, data-binding, and logic (think JSF Backing Bean) of the app's View layer. Components should encapsulate specific application functions into logical chunks. For example, a Login component would contain the HTML form for inputting a username and password, as well as the backing code to take the input and pass it onto a service to handle the actual logging in.

In this application, the Login and Signup components were grouped under the `auth` folder, because logically they share similar roles. This is not a required convention, but demonstrates how components can be organized together for the benefit of developers.

A component should not be considered a "page" in the sense of a traditional web application. In a Single Page Application (SPA), a page can be composed of a single component or of many components. Care should be taken to identify places where specific pieces of functionality can be split into separate components, which are only concered with their own rendering and logic. Components can communicate with each other via services if necessary. This design will result in less coupling and allow for greater code re-use in the future.

#### Datasource

The datasource is one of the simplest parts of the application. It should only be concered with returning an [Observable](https://angular.io/guide/rx-library) representation of your data. Most often, this will be in the form of HTTP request to your REST service.

We have provided examples of both a `REST` datasource and a `static` datasource. This demonstrates the benefit of using a `repository` pattern, where the Service layer calls a Datasource layer to make a request -- in contrast to the Angular.io examples where the Service layer makes HTTP requests directly. Although the initial setup is slightly greater, this extra layer allows you to easily swap the datasource your service calls without any major changes.

#### Http-interceptors

Http Interceptors allow you to intercept HTTP requests and apply some logic to the request. They are a useful feature but may not be required by every application.

Interceptors serve two functions in this application:

- The `auth.interceptor` attaches a JWT auth token to the header of every request (if the user is authenticated and the token exists).
- The `caching.interceptor` intercepts requests made to the `/projects` route and checks the `Caching Service`. If valid cached data exists it will return that data, eliminating a request to the REST service. If there is no cached data or it is expired, it will call the REST service and update the cache. This could be a useful feature in instances where data doesn't change often (e.g. zip codes or service center codes) and saves you from making repeated, costly database requests to get the same information.

#### Models

Models serve a similar role to domain entities in JSF. They simply define the objects that your app will be creating, reading, updating or deleting.

#### Services

Services are the glue between your View and your backend. In general your component will call a service, which will call a datasource. The service subscribes to the result of the datasource, and then communicates those results back to the component.

What happens after the service subscribes to the datasource is up to you. If you are getting a list of data, then your service will return the data to the component. However if you are deleting an object and there is no data returned, then the service can simply communicate that the operation succeeded or failed, and the component can determine what to do next (such as re-rendering or navigating to another page altogether).

In our services, we wrapped our datasource requests inside of Promises. Because an HTTP request is an asyncronous operation, putting our service calls inside a Promise allows us to wait until the results are fully returned before resolving them to our component. If you tried returning the results directly, there is a chance your data will not be ready -- meaning null or undefined errors in your component. This prevented a side effect we saw where the service was making multiple requests to the datasource. More on [PROMISES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Services can also be used for communicating between multiple components. An example of this is between the main `/search` page and the the `add-issue-dialog.component`. Because there is no routing between these two components, there was no simple way to tell the search page to display the newest issues. The solution was to set up an observable stream in the service that the search page could subscribe to. When a new issue was created the modal could tell the service, which would then tell the subscribed search page. The search page could then grab the latest results and re-render. More on [Component Interaction](https://angular.io/guide/component-interaction).

#### Shared

The shared folder is a catch-all for code that might be needed anywhere within the application.

In our case, we created a `material.module` to bring in all of the [Angular Material](https://material.angular.io/) components that could be used throughout the app. This allowed for a single import to make all the components available without lots of extra, messy import statements all over the place.

This is just one example of what could go in a shared folder -- your app may not make use of Angular Material. However the concept of bringing multiple related imports into a single, re-usable module could prove useful.

## JSON server

The `json-server` dependency provides a fake REST API. This is ideal for quickly mocking a back-end when prototyping a new Angular app.

All that is needed is a `db.json` file. More info can be found [HERE](https://github.com/typicode/json-server).

## Authentication server

Authentication in this app is mainly for demonstration purposes. The `server.js` acts as a local authentication server that will be replaced in the future with a real service. However the concepts of Auth Guards, protected routes, and http-interceptors (for adding a JWT to a request header) are still relevant.

## Development server

Run `npm run dev` for a dev server. This will start the JSON server, authentication server, and serve the application. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Note that code scaffolding will automatically setup a test file for you. You simply need to add your `describe` blocks and put your unit tests within. There is no reason not to add some basic unit tests -- in the long run this can help you catch bugs faster when you are refactoring!

There are basic examples of working tests within the app. Mocks and spies are useful concepts to learn, as you want to limit your test scope as much as possible to the behavior of the class under test. You don't want your test to worry about external dependencies, services, or datasources that the class under test may rely on.

More info on the [Jasmine](https://jasmine.github.io/2.0/introduction.html) testing framework.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
