import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";

function Hero({ author }) {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by {author.name}</p>
      </div>
    </div>
  );
}

function Turn({ author, books, highlight, onAnswerSelected }) {
  function HighlightToBgColor(highlight) {
    const mapping = {
      none: "",
      correct: "green",
      wrong: "red",
    };
    return mapping[highlight];
  }
  return (
    <div
      className="row turn"
      style={{ backgroundColor: HighlightToBgColor(highlight) }}
    >
      <div className="col-4 offset-1">
        <img src={author.imageUrl} alt="Author" className="authorImage" />
      </div>

      <div className="col-6">
        {books.map((title) => (
          <Book title={title} key={title} onClick={onAnswerSelected} />
        ))}
      </div>
    </div>
  );
}

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      {show ? (
        <div className="col-11">
          <button
            className="btn btn-primary btn-lg float-right"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Footer() {
  return (
    <div className="row" id="footer">
      <div className="col-12">
        <p>
          These all images are belongs to{" "}
          <a href="https://www.gkduniya.com/authors-books">That link</a> go here
          to check details
        </p>
      </div>
    </div>
  );
}

function Book({ title, onClick }) {
  return (
    <div
      className="answer"
      onClick={() => {
        onClick(title);
      }}
    >
      <h4>{title}</h4>
    </div>
  );
}
function App({ turnData, highlight, onAnswerSelected, onContinue }) {
  return (
    <div className="container-fluid">
      <Hero {...turnData} />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue show={highlight === "correct"} onContinue={onContinue} />
      <p>
        <Link to="/add">Add an author</Link>
      </p>
      <Footer />
    </div>
  );
}

export default App;
