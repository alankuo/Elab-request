import React from 'react';
import { database } from './../../database/database_init';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

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
        this.handleEdit = this.handleEdit.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.onChange = this.onChange.bind(this);
        this.requestsList = this.requestsList.bind(this);
        /*this.handleSubmit = this.handleSubmit.bind(this);
        this.updateQuestionFromDB = this.updateQuestionFromDB.bind(this);*/


    }

    handleEdit(event) {
        this.setState({question: event.target.value});
    }

    onChange(text) {
        // in order to render the updated text,
        // you need to pass it as a prop to contentEditable.
        // This gives you increased flexibility.
        this.setState({answer: text})
    }

    toggleEditing() {
        this.setState({ answer_editing: !this.state.answer_editing });
    }

    /*handleSubmit(event) {
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

    // after finishing the database part, add request as the parameter
    requestsList() {
        /*var question = requests[request].question;
         var answer = requests[request].answer;*/
        if (this.state.answer_editing) {
            return (
                <div className="request">
                    <div className="request-question">
                        <text>Questions got from database</text>
                        <br />
                    </div>

                    <div className="request-answer" style={{borderStyle: 'rounded'}}>

                        <text className="request-list-answer">
                            <input
                                onChange={ this.handleEdit }
                                type="text"
                                className="form-control"
                                defaultValue="Answers"
                            />
                        </text>
                        <Button bsStyle="primary" onClick={this.toggleEditing}>
                            Submit
                        </Button>
                        <Button bsStyle="primary" onClick={this.toggleEditing}>
                            Cancel
                        </Button>
                    </div>
                </div>);
        } else {
            return (
                <div className="request">
                    <div className="request-question">
                        <text>Questions got from database</text>
                        <br />
                    </div>

                    <div className="request-answer" style={{borderStyle: 'rounded'}}>
                        <text onClick={ this.toggleEditing } className="request-list-answer">
                            Answers
                        </text>
                    </div>
                </div>);
        }
    }


    render () {
        var requests = this.requests;





        /*var enableEditing = function(){
            // set your contenteditable field into editing mode.
            this.setState({ answer_editing: true });
        }*/




        // after finishing the database part, add following code to the request-list part
        /*{this.requests.map( ( request ) => {
         return requestsList( request );
         })}*/

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

                <br />

                <div className="request-history">
                    <div className="request-list">
                        {this.requestsList()}
                    </div>
                </div>

            </div>
        );
    }
}


export default ElabRequest;
