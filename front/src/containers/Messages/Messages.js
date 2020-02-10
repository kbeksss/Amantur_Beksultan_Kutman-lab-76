import React, {Component, Fragment} from 'react';
import moment from "moment";
import {connect} from "react-redux";
import {fetchMessages, getMessagesByDate, postMessage} from "../../store/actions/messagesActions";
import './Messages.css';


class Messages extends Component{
    state = {
        author: '',
        message: '',
    };
    interval = null;
    getMessages = async () => {
        await this.props.fetchMessages();
    };
    getUpdatedMessages = () => {
        this.interval = setInterval(() => {
            const [lastMessage] = this.props.messages.slice(0,1);
            try {
                this.props.fetchNewMessages(lastMessage.datetime);
            } catch (e) {
                alert(this.props.error.data.error + '.\n Error code: ' + this.props.error.status);
            }
        }, 1000);
    };
    componentDidMount () {
        this.getMessages().catch(e => console.error(e));
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        clearInterval(this.interval);
        this.getUpdatedMessages();

    };
    sendMessage = async () => {
        await this.props.postMessage(this.state);
        if(this.props.error){
            alert(this.props.error.data.error + '.\n Error code: ' + this.props.error.status);
        } else{
            this.setState({author: '', message: ''});
        }
    };
    changeInput = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.value});
    };
    render() {
        return (
            <Fragment>
                <div className='container'>
                    <div className='messages'>
                        {this.props.messages.map(message => (
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
                    <div className='container'>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="author" className="col-form-label">Author</label>
                            <div className="col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    value={this.state.author}
                                    name='author'
                                    onChange={this.changeInput}
                                />
                            </div>
                            <label htmlFor="message" className="col-form-label">Message</label>
                            <div className="col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="message"
                                    value={this.state.message}
                                    name='message'
                                    onChange={this.changeInput}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={this.sendMessage}
                            >Send</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    error: state.error,
});
const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessages()),
    postMessage: (message) => dispatch(postMessage(message)),
    fetchNewMessages: datetime => dispatch(getMessagesByDate(datetime)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
