import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      toShow: false,
      rowIndex: -1,
      url: "",
      trailer: {},
      trailerIndex: -1
    };
  }
  componentDidMount() {
    axios
      .get(`https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs`)
      .then(res => {
        this.setState({
          data: Object.values(res.data[1])
        });
      })
      .catch(err => {
        console.log(err, "err");
      });
  }

  onClickTrailer = (trailer, index, trailerIndex) => {
    this.setState({
      toShow:
        index === this.state.rowIndex &&
        trailerIndex === this.state.trailerIndex
          ? !this.state.toShow
          : true,
      rowIndex: index,
      url: trailer.TrailerURL,
      trailer: trailer,
      trailerIndex: trailerIndex
    });
  };

  viewChange = () => {
    let arr = this.state.data;
    var size;
    if (window.innerWidth < 700) {
      size = 1;
    } else if (window.innerWidth > 700 && window.innerWidth < 900) {
      size = 2;
    } else {
      size = 5;
    }

    let newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  };

  closeTrailer = () => {
    this.setState({
      toShow: false,
      rowIndex: -1,
      url: "",
      trailer: {},
      trailerIndex: -1
    });
  };

  getTrailerList() {
    const { trailer } = this.state;
    let dataSet = this.viewChange();
    let id =
      this.state.url !== "" ? this.state.url.split("v=")[1].split("&")[0] : "";
    let newurl = `https://www.youtube.com/embed/${id}?autoplay=1`;

    return dataSet.map((row, index) => [
      <div key={index}>
        <div className="row">
          {this.state.toShow && this.state.rowIndex === index ? (
            <div key={index + 3} className="infoContainer">
              <div
                className="info"
                style={{ height: window.innerWidth < 700 ? 500 : 350 }}
              >
                <div className="iframe">
                  <iframe
                    className="video"
                    title="trailer"
                    width={window.innerWidth < 700 ? 350 : 650}
                    height="350"
                    src={newurl}
                  />
                </div>
                <div
                  className="eventInfo"
                  style={{ width: window.innerWidth < 700 ? 360 : 420 }}
                >
                  <i
                    className="fa fa-close close"
                    style={{
                      right: window.innerWidth < 700 ? 8 : 110,
                      padding: window.innerWidth < 700 ? 11 : 5
                    }}
                    onClick={() => this.closeTrailer()}
                  />
                  <p className="eventName">{trailer.EventName}</p>
                  <p className="eventLanguage">{trailer.EventLanguage}</p>
                  <div style={{ textAlign: "left" }}>
                    <div className="eventGenre">{trailer.EventGenre}</div>
                    <div className="eventGenre">{trailer.EventDimension}</div>
                    {trailer.EventCensor !== "" ? (
                      <div className="eventGenre">{trailer.EventCensor}</div>
                    ) : null}
                  </div>

                  <div style={{ textAlign: "left" }}>
                    <div style={{ display: "inline" }}>
                      <i className="fa fa-thumbs-up upIcon " />
                      <p className="wtsPerc">{trailer.wtsPerc} % </p>
                    </div>
                    <div style={{ display: "inline", marginLeft: "10px" }}>
                      <i className="fa fa-film upIcon" />
                      <p className="wtsPerc">{trailer.ShowDate}</p>
                    </div>
                  </div>
                  <p className="wtsCount">{trailer.wtsCount} Votes </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="row" key={index}>
            {row.map((trailer, indexx) => (
              <div
                style={{ marginLeft: "22px" }}
                key={indexx}
                className="col-lg-2 col-md-2 col-sm-12"
              >
                <div
                  className="card"
                  style={{ width: window.innerWidth < 700 ? 300 : 180 }}
                  onClick={() => this.onClickTrailer(trailer, index, indexx)}
                >
                  <div className="date_container">
                    <div className="date">{trailer.ShowDate.split(" ")[0]}</div>
                    <div className="date">{trailer.ShowDate.split(" ")[1].slice(0,-1)}</div>
                  </div>
                  <i className="fa fa-play-circle-o videoicon" />
                  <div style={{ display: "inline-block" }}>
                    <i
                      className="fa fa-thumbs-up percent  "
                      style={{ fontSize: 12, color: "green", right: "30px" }}
                    />
                    <p className="percent">{trailer.wtsPerc} % </p>
                  </div>
                  <p className="votes">{trailer.wtsCount} Votes </p>
                </div>
                <p className="name">{trailer.EventName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ]);
  }

  render() {
    return (
      <div className="app container">
        <div className="row">
          <p className="heading">Movie Trailers</p>
          <div className="coming">COMING SOON</div>
        </div>
        <div className="content">{this.getTrailerList()}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
