import React, {Fragment, useEffect, useState} from 'react';
import moment from "moment";
import {connect} from "react-redux";
import {fetchMessages, postMessage} from "../../store/actions/messagesActions";
import './Messages.css';


const INITIAL_FORM = {
    author: '',
    message: ''
};
const Messages = props => {
    const [form, setForm] = useState(INITIAL_FORM);
    const changeInput = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    const sendMessage = async () => {
        if(form.author && form.message){
            await props.postMessage(form);
        } else{
            alert('Please enter your name or message');
        }
    };
    useEffect(() => {
        props.fetchMessages();
        // eslint-disable-next-line
    });
    return (
        <Fragment>
            <div className='container'>
                <div className='messages'>
                    {props.messages.reverse().map(message => (
                        <div className="card" style={{margin: '10px 0'}} key={message.id}>
                            <div className="card-body">
                                <div className='row' style={{padding: '0 10px'}}>
                                    <b style={{marginRight: '7px'}} className='text-monospace'>{message.author} :</b>
                                    {message.message}
                                    <span className='text-muted ml-auto'>
                                        {moment(message.datetime).format('MMMM Do YYYY, h:mm:ss a')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed-bottom border-top footer">
                <div className='container footer'>
                    <div className="form-group row justify-content-center">
                        <label htmlFor="author" className="col-form-label">Author</label>
                        <div className="col-4">
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                value={form.author}
                                name='author'
                                onChange={changeInput}
                            />
                        </div>
                        <label htmlFor="message" className="col-form-label">Message</label>
                        <div className="col-4">
                            <input
                                type="text"
                                className="form-control"
                                id="message"
                                value={form.message}
                                name='message'
                                onChange={changeInput}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={sendMessage}
                        >Sent</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    messages: state.messages,
});
const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessages()),
    postMessage: (message) => dispatch(postMessage(message))
});
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
