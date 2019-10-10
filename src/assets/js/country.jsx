import React, { Component } from 'react';
import { FormCell, CellHeader, Label, CellBody, Select } from 'react-weui';

export default class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: [],
            countryItem: ['86'],
        }
    }

    componentDidMount() {
        const { getCountryCode } = this.props;
        getCountryCode(this.state.countryItem[0]);
        fetch('../country.json').then(res => {
            if (res.ok) {
                res.json().then(res => {
                    let countryArr = [];
                    res.forEach((item, index) => {
                        let countryObj = { label: '', value: '', key: '' };
                        countryObj.label = item.tel + item.name + item.en;
                        countryObj.value = item.tel;
                        countryObj.key = index;
                        countryArr.push(countryObj);
                    });
                    this.setState({ country: countryArr });
                })
            }
        })
    }

    countryChange = (e) => {
        const { getCountryCode } = this.props;
        getCountryCode(e.target.value);
    };

    render() {
        return (
            <div>
                <FormCell select selectPos="after">
                    <CellHeader>
                        <Label>国家</Label>
                    </CellHeader>
                    <CellBody>
                        <Select data={this.state.country} onChange={this.countryChange} />
                    </CellBody>
                </FormCell>
            </div>
        )
    }
}
