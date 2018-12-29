import React, { Component } from "react";

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import "./Champions.css";

export default class Champions extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        championName: "",
        championSearched: false
      };
    }
  
    validateForm() {
      return this.state.championName.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value,
        championSearched: false
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      this.setState({championSearched: true, championName: this.state.championName});
    }
  
    render() {
        const championSearched = this.state.championSearched;

        let page;
    
        if (championSearched) {
        page = <div className="Champions">
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="championName" bsSize="large">
            <ControlLabel>Summoner Name</ControlLabel>
            <FormControl
            autoComplete="off"
                autoFocus
                type="championName"
                value={this.state.championName}
                onChange={this.handleChange}
            />
            </FormGroup>
            <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            >
            Search Summoner
            </Button>
        </form>
            <div >
                    <img
                    className="championStats"
                    alt=''
                    style={{width: 1024}}
                    src={`http://localhost:8000/v1/stats/plots/champion/byname?name=${this.state.championName}&gameversion=8.24`} />
                </div>
            </div>;
    } else {
        page = <div className="Champions">
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="championName" bsSize="large">
            <ControlLabel>Summoner Name</ControlLabel>
            <FormControl
            autoComplete="off"
                autoFocus
                type="championName"
                value={this.state.championName}
                onChange={this.handleChange}
            />
            </FormGroup>
            <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            >
            Search Champion
            </Button>
        </form>
        </div>;
    }

      return (
          <div>
       {page}
       </div>
      );
    }
  }
