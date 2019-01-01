import React, {Component} from "react";

import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import ChampionStats from "./ChampionStats"

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

        if (championSearched && this.state.championName) {
            page = <div className="Champions">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="championName" bsSize="large">
                        <ControlLabel>Champion Name</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            autoFocus
                            type="championName"
                            value={this.state.championName}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Search Champion
                    </Button>
                </form>
                <div className="championStats">
                    <ChampionStats champion={this.state.championName}/>
                </div>
            </div>;
        } else {
            page = <div className="Champions">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="championName" bsSize="large">
                        <ControlLabel>Champion Name</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            autoFocus
                            type="championName"
                            value={this.state.championName}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
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
