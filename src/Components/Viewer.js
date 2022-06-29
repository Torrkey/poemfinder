import React from "react";

const Viewer = ({ poem }) => {
    return (
      <>
        {Array.isArray(poem) // Add extra type checking before rendering
          ? (
            poem.map((item) => {
              let author = item.author;
              let title = item.title;
              let lines = item.lines;
              if (author != undefined && title != undefined) {
                return (
                  <>
                    <div className="viewer">
                      <div className="author">{author}</div>
                      <div className="title">{title}</div>
                      <div className="lines">
                        {lines.map((line) => (
                          <div>{line}</div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              }
            })
          )
          : null // or a error message component
        }
      </>
    );
  };

export default Viewer