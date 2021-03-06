import React from 'react';
import IO from "../../../../controllers/IO";
import ParticipantsStore from "../../../../stores/ParticipantsStore";
import './ParticipantList.css';
import {observer} from 'mobx-react';
import MyInfo from "../../../../stores/MyInfo";

@observer
export class ParticipantList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        this.props.events.on("save", (cb: () => void) => {
            IO.changeName(this.state.inputValue).then(cb);
        });
    }

    componentWillUnmount(): void {
        this.props.events.removeAllListeners("save");
    }


    render() {
        return (
            <div className={"settings-view"}>
                <h2 className={"modal--title"}>Participant List</h2>
                <div className={"participant-list"}>
                    {
                        ParticipantsStore
                            .getLiving()
                            .slice(2)
                            .map(participant => {
                                return (
                                    <div key={participant.id} className={"participant"}>
                                        <span data-private={""} className={"participant--name"}>{participant.name}</span>
                                        {MyInfo.info?.isHost
                                        && !participant.isHost ?
                                            <span onClick={() => IO.kick(participant)}
                                                  className={"participant--kick-button"}>Kick</span>
                                            : null
                                        }
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        );
    }
}
