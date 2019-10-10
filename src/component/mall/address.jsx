import React, {Component, Fragment} from 'react';
import {CellBody, CellHeader, Label, Form, FormCell, Input} from "react-weui";
import {CityPicker} from 'react-pickers';
import '../../assets/css/picker.scss';
import city3 from 'react-pickers/example/lib/city-data-3';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCity3Picker: false,
            city3: city3,
            city_value:'北京市 北京市 东城区'
        }
    }

    showCity3Picker = (e) => {
        e.preventDefault();
        this.setState({showCity3Picker: true})
    };

    hide = () => {
        this.setState({showCity3Picker: false})
    };

    cl3 = () => {
        this.setState({showCity3Picker: false})
    };

    getData3 = (ret) => {
        this.setState(()=>({city_value:`${ret[0].text} ${ret[1].text} ${ret[2].text}`}));
        let province = ret[0].text;
        let city = ret[1].text;
        let area = ret[2].text;
        const { handleChange } = this.props;
        handleChange(province, 'province');
        handleChange(city, 'city');
        handleChange(area, 'area');
        // console.log(ret);
        console.log("你选择的城市是:" + (ret[0] || {}).text + " " + (ret[1] || {}).text + " " + (ret[2] || {}).text);
    };

    render() {
        return (
            <Fragment>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>选择地址</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text"
                                   value={this.state.city_value}
                                   onClick={(e) => {
                                       this.showCity3Picker(e)
                                   }}
                                   placeholder="选择地址"
                                   readOnly={true}
                            />
                        </CellBody>
                    </FormCell>
                </Form>
                <CityPicker visible={this.state.showCity3Picker} layer='3' setData={this.state.city3}
                            getData={this.getData3} confirm={this.hide} cancel={this.hide}/>
            </Fragment>
        );
    }
}

export default Address;