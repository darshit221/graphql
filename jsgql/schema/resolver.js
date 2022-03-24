const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      //context provide the qucik acces like req varriable,data,etc
      console.log(context);
      return UserList;
    },
    user: (parent, args, context, info) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },
  },
  User: {
    faviouratemovies: (parent) => {
      //prent provideprevios graph value of parent like query->user->faviouratemovie
      //so here parent return user value u can see in console
      console.log("favMovieParent :", parent);
      return _.filter(MovieList, (movie) => movie.yearOfPublish >= 2000);
    },
  },

  Mutation: {
    CreateUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    UpdateUser: (parent, args) => {
      const { id, newusername } = args.input;
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newusername;
        }
        updatedUser = user;
      });
      return updatedUser;
    },
    DeleteUser: (parent, args) => {
      const id = args.input;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
