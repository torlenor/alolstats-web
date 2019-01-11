import React, {Component} from "react";

import ChampionStats from "./ChampionStats"

import MyInput from "./AutoComplete"

import "./Champions.css";

export default class Champions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            championName: "",
            championSearched: false
        };
    }

    handleChange = () => {
        this.setState({championSearched: false});
    }

    handleSubmit = (item) => {
        this.setState({championSearched: true, championName: item.id});
    }

    render() {
        const championSearched = this.state.championSearched;

        let newPage

        if (championSearched && this.state.championName) {
            newPage = <div className="Champions">
                <b>Champion Name</b>
                <div className="searchButton">
                    <MyInput onSubmit={this.handleSubmit} onChange={this.handleChange}/>
                </div>
                <div className="championStats">
                    <ChampionStats champion={this.state.championName}/>
                </div>
            </div>;
        } else {
            newPage = <div className="Champions">
                <b>Champion Name</b>
                <div className="searchButton">
                    <MyInput onSubmit={this.handleSubmit} onChange={this.handleChange}/>
                </div>
            </div>;
        }

        return (
            <div>
                {newPage}
            </div>
        );
    }
}
