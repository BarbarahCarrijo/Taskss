import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class List extends Component {
    async checkTask(task) {
        let form = {'task': {'done': 'true'}}
        await fetch(`http://localhost:3001/tasks/${task.id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    task: {done: true}
                })
            }
        )

        this.props.loadTasks();
    }

    async deleteTask(task) {
        if (window.confirm(`Are you sure you want to delete: "${task.title}"`)) {
            await fetch(`http://localhost:3001/tasks/${task.id}`, {method: 'DELETE'});
            this.props.loadTasks();
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Table responsive>
                            <tbody>
                            {this.props.tasks.map((task, index) => {
                                return <tr key={task.id}>
                                    <td className="col-md-10">{task.title}</td>
                                    <td>
                                        {
                                            task.done === false
                                                ? <a className="check" href="#">
                                                    <FontAwesomeIcon icon={faCheckCircle} onClick={() => this.checkTask(task)} size="lg"/>
                                                </a>
                                                : null
                                        }
                                    </td>
                                    <td>
                                        <a className="delete" href="#" onClick={() => this.deleteTask(task)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </a>
                                    </td>
                                </tr>;
                            })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default List;