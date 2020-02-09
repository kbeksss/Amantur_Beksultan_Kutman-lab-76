import React, {Fragment, useEffect, useState} from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import {fetchMessages, postMessage, updateMessages} from "../../store/actions/messagesActions";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardText,
    Container, Form, Input, InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";


const INITIAL_FORM = {
    author: '',
    message: ''
};
const Messages = props => {
    const [modal, toggleModal] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const changeInput = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    const sendMessage = async () => {
        if(form.author && form.message){
            await props.postMessage(form);
            toggleModal(false);
        } else{
            alert('Please enter your name or message');
        }
    };
    const updateAllMessages = async () => {
        if(props.messages.length){
            const lastDatetime = props.messages.slice(0, 1)[0].datetime;
            props.updateMessages(lastDatetime);
        }
    };
    useEffect(() => {
        props.fetchMessages();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        updateAllMessages().catch(e => console.error(e));
    });
    console.log(props.messages);
    return (
        <Fragment>
            <Container className='mt-5'>
                <Button color='primary' onClick={() => toggleModal(true)}>Send new message</Button>
                {props.messages.map(mess => (
                    <Card className='my-3' key={mess.id}>
                        <CardHeader>{mess.author}</CardHeader>
                        <CardBody>
                            <CardText>{mess.message}</CardText>
                        </CardBody>
                        <CardFooter>{moment(mess.datetime).format('MMMM Do YYYY, h:mm:ss a')}</CardFooter>
                    </Card>
                ))}
            </Container>
            <Modal isOpen={modal} toggle={() => toggleModal(!modal)}>
                <ModalHeader toggle={() => toggleModal(!modal)}>Modal title</ModalHeader>
                <ModalBody>
                    <Form>
                        <InputGroup className='mb-2'>
                            <Input value={form.author} name='author' onChange={changeInput} placeholder='Your name'/>
                        </InputGroup>
                        <InputGroup>
                            <Input value={form.message} name='message' onChange={changeInput} placeholder='Your message'/>
                        </InputGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={sendMessage}>Send Message</Button>{' '}
                    <Button color="secondary" onClick={() => toggleModal(!modal)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Fragment>

    );
};

const mapStateToProps = state => ({
    messages: state.messages,
});
const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessages()),
    postMessage: (message) => dispatch(postMessage(message)),
    updateMessages: datetime => dispatch(updateMessages(datetime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
