import React from 'react'
import ReactAutocomplete from 'react-autocomplete';
import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/champions`;

class MyInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            championsListFetched: false,
            championsList: [],
            suggestions: []
        }
    }

    componentDidMount() {
        this.input.focus()
      }

    getInfo = () => {
        if (this.state.championsListFetched === false || this.state.championsList.length === 0) {
        axios
            .get(`${API}`)
            .then(({data}) => {
                this.setState({
                    championsList: Object.values(data)
                })
            })
        }
    }

    showItem = (item, query) => {
        if (item !== undefined && query !== undefined) {
            let name = item.name
            let id = item.id
            if (name !== undefined && id !== undefined && query !== undefined) {
                return (name.toLowerCase().includes(query.toLowerCase()) || id.toLowerCase().includes(query.toLowerCase()));
            } else {
                return false
            }
        } else {
            return false
        }
    }

    onChange = (event, value) => {
        this.setState({
            value: value
        }, () => {
            if (this.state.value && this.state.value.length > 1) {
                if (this.state.value.length % 2 === 0) {
                    this.getInfo()
                }
            }
        })
        this.props.onChange(value)
      };

    onSelect = (value, item) => {
        this.setState({
            value: value
        }, () => {
            this.props.onSubmit(item)
        })
    }

    render() {
        return (<ReactAutocomplete
            ref={el => this.input = el}
            items={this.state.championsList}
            shouldItemRender={this.showItem}
            getItemValue={item => item.name}
            renderItem={(item, highlighted) => <div
            key={item.id}
            style={{
            backgroundColor: highlighted
                ? '#eee'
                : 'transparent'
        }}>
            {item.name}
        </div>}
            value={this.state.value}
            onChange={this.onChange}
            onSelect={this.onSelect}/>)
    }
}

export default MyInput;