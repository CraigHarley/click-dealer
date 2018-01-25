import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Progress,
    Container,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Alert
} from 'reactstrap';
import {SyntheticEvent} from 'react';
import CardSection from './CardSection';
import {Elements, StripeProvider} from 'react-stripe-elements';
import './stripe.css';
import axios from 'axios';

const sections = [{
    name:          'inventory',
    progressValue: 0
}, {
    name:          'cart',
    progressValue: 50
}, {
    name:          'confirm',
    progressValue: 100
}];


class App extends React.Component<any, any> {
    state = {
        section: sections[0],
        form:    {
            firstName: '',
            lastName:  '',
            email:     '',
            mobile:    ''
        }
    };

    gotStripeFiles = false;

    renderSection     = () => {

        if (this.state.section.name === 'inventory') {
            return (
                <Card>
                    <CardImg top width="100%" src="https://images.clickdealer.co.uk/vehicles/1216/1216569/full/14743450.jpg" alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>BMW 3 SERIES</CardTitle>
                        <CardSubtitle>2.0 318D M SPORT 4D 141 BHP - £100 deposit</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button onClick={this.onClickReserve} color="primary">Add to basket</Button>
                    </CardBody>
                </Card>
            );
        } else if (this.state.section.name === 'cart') {

            return (
                <Elements>
                    <Card style={{marginTop: '10px'}}>
                        <div style={{padding: '10px'}}>
                            <FormGroup>
                                <Label for="first-name">First Name</Label>
                                <Input type="text" name="first-name" id="first-name" placeholder="Your First Name" onChange={this.onChangeFirstName}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="last-name">Last Name</Label>
                                <Input type="text" name="last-name" id="last-name" placeholder="Your Last Name" onChange={this.onChangeLastName}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Your Email" onChange={this.onChangeEmail}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="mobile">Mobile Number</Label>
                                <Input type="tel" name="mobile" id="mobile" placeholder="Your Mobile Number" onChange={this.onChangeMobile}/>
                            </FormGroup>
                            <div style={{width: '250px'}}>
                                <CardSection/>
                            </div>
                            <Button onClick={this.onClickSubmit}>Submit</Button>
                        </div>
                    </Card>
                </Elements>

            );

        } else if (this.state.section.name === 'confirm') {
            return (
                <div style={{marginTop: '10px'}}>
                    <Alert color="success">
                        Your car has been reserved!
                    </Alert>
                </div>
            );
        }
    };
    onChangeFirstName = (e: SyntheticEvent<HTMLInputElement>) =>
        this.setState({form: {...this.state.form, firstName: e.currentTarget.value}});
    onChangeLastName  = (e: SyntheticEvent<HTMLInputElement>) =>
        this.setState({form: {...this.state.form, lastName: e.currentTarget.value}});
    onChangeEmail     = (e: SyntheticEvent<HTMLInputElement>) =>
        this.setState({form: {...this.state.form, email: e.currentTarget.value}});
    onChangeMobile    = (e: SyntheticEvent<HTMLInputElement>) =>
        this.setState({form: {...this.state.form, mobile: e.currentTarget.value}});

    onClickReserve = () => this.setState({section: sections[1]});

    onClickSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
        const {firstName, lastName, email, mobile} = this.state.form;

        axios.post('http://localhost:3000/api/reserve', {
            firstName,
            lastName,
            email,
            mobile
        }).then(function (response) {

            console.log(response);
            this.setState({section: sections[2]})

        }).catch((error) => console.log(error));

        e.preventDefault();
    };

    render(): JSX.Element {

        return (
            <Container>
                <Progress value={this.state.section.progressValue}/>
                <Row>
                    <Col>{this.renderSection()}</Col>
                </Row>
            </Container>
        );
    }

}


ReactDOM.render(
    <StripeProvider apiKey="pk_test_12345">
        <App/>
    </StripeProvider>,
    document.getElementById('root') as HTMLElement
);
