import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import AddAuthorForm from "./AddAuthorForm";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";
const authors = [
  {
    name: "S S Kohli",
    imageUrl: "images/authors/kohli.jpg",
    imageSource: "Wikimedia Commans",
    books: ["A Conceptual Encyclopedia of Guru Granth Sahib"],
  },

  {
    name: "Vikram Sheth",
    imageUrl: "images/authors/vikram-sheth.jpg",
    imageSource: "Wikimedia Commans",
    books: ["Arion and the Dolphin"],
  },

  {
    name: "Laxmi-Sehgal",
    imageUrl: "images/authors/lakshmi-sehgal.jpg",
    imageSource: "Wikimedia Commans",
    books: ["A Reveolutionary life"],
  },

  {
    name: "Jawaharlal Nehru",
    imageUrl: "images/authors/jawaharlal-nehru.jpg",
    imageSource: "Wikimedia Commans",
    books: ["An Autobiography"],
  },

  {
    name: "Arun Shourie",
    imageUrl: "images/authors/arun-shourie.jpg",
    imageSource: "Wikimedia Commans",
    books: ["A Secular Agenda"],
  },

  {
    name: "Abul Fazal",
    imageUrl: "images/authors/abul-fazal.jpg",
    imageSource: "Wikimedia Commans",
    books: ["Akbarnama"],
  },
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);

  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: "",
  };
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

function App1() {
  return (
    <App
      {...state}
      onAnswerSelected={onAnswerSelected}
      onContinue={() => {
        state = resetState();
        render();
      }}
    />
  );
}

const WrapperAuthor = withRouter(({ history }) => (
  <AddAuthorForm
    onAddAuthor={(author) => {
      authors.push(author);
      history.push("/");
    }}
  />
));
function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App1} />
        <Route path="/add" component={WrapperAuthor} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
