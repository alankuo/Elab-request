import React from 'react';
import { database } from './../../database/database_init';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import Spinner from 'react-spinkit';

/**
ElabRequest - to be displayed on the side
*/
const NAME = 'elaboration_id_'
var num = 0
class ElabRequest extends React.Component {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            question: 'Please write your question here...',
            answer: '',
            endorsed: false,
            resolved: true,
            q_userName: '',
            a_username: '',
            testing: '',
            question_editing: false,
            answer_editing: false,
        };

        var that = this;
        database.ref('elab-request').once('value').then(function(snapshot) {
            that.requests = snapshot.val();
        });

        // Bind all functions so they can refer to "this" correctly
        /*this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateQuestionFromDB = this.updateQuestionFromDB.bind(this);*/


    }

    /*handleEdit(event) {
        this.setState({question: event.target.value});
    }

    handleSubmit(event) {
        alert('The question has been submitted: ');
        event.preventDefault();
        var newPostKey = database.ref().child('elab-request').push().key;
        var updates = {};
        updates['/elab-request/' + this.state.id] = this.state.question;
        updates['/elab-request/' + this.state.id] = this.state.answer;
        updates['/elab-request/' + this.state.id] = this.state.endorsed;
        updates['/elab-request/' + this.state.id] = this.state.resolved;
        updates['/elab-request/' + this.state.id] = this.state.q_userName;
        updates['/elab-request/' + this.state.id] = this.state.a_userName;
        this.setState({
                id: 'elaboration_id_' + (++num)
        });
        database.ref().update(updates);
    }

    updateQuestionFromDB() {
        var that = this;    // Maintain current "this" in Firebase callback

        // Fetch value from db and set currentTime
        database.ref('/elab-request/' + that.state.id).once('value').then(function(snapshot) {
            that.setState({
                testing: 'fetched question from db: ' + snapshot.val()
            });
        });
    }*/

    render () {
        var requests = this.requests;

        var requestsList = function (request) {
            var question = requests[request].question;
            var answer = requests[request].answer;
            return (
                <div className="request" key={request}>
                    <div>
                        

                    </div>
                </div>
            )
        }

        return (
            <div className="container">

                <div className="request-title"
                     style={{
                         textAlign: 'center',
                         margin: '0 auto',
                         width: '560px',
                     }} >

                    <h1> Lecture_Slide </h1>
                </div>

                <div className="request-new">
                    <h2> New Elaboration Request </h2>
                    <form onSubmit={this.handleSubmit}>
                        <textarea value={this.state.question} onChange={this.handleEdit}
                            style={{width: '700px', height: '100px'}}/> <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>


                <div className="request-history">
                    <ul className="request-list">
                        {this.requests.map(requestsList)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ElabRequest;
